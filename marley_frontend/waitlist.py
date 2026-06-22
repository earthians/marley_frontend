import json
from datetime import datetime

import frappe
from frappe.query_builder import DocType
from frappe.query_builder.functions import Sum
from frappe.utils import (
	flt,
	fmt_money,
	format_date,
	format_time,
	get_datetime,
	get_time,
	getdate,
	now_datetime,
	time_diff_in_hours,
)

from erpnext import get_default_company, get_default_currency
from erpnext.accounts.party import get_party_account
from erpnext.setup.utils import get_exchange_rate
from erpnext.stock.get_item_details import get_item_price

from healthcare.healthcare.doctype.fee_validity.fee_validity import check_fee_validity, get_fee_validity
from healthcare.healthcare.doctype.healthcare_settings.healthcare_settings import (
	get_income_account,
	get_receivable_account,
)
from healthcare.healthcare.doctype.patient_appointment.patient_appointment import update_status
from healthcare.healthcare.utils import (
	get_appointment_billing_item_and_rate,
	get_appointments_to_invoice,
	get_clinical_procedures_to_invoice,
	get_drugs_to_invoice,
	get_encounters_to_invoice,
	get_healthcare_services_to_invoice,
	get_inpatient_services_to_invoice,
	get_observations_to_invoice,
	get_practitioner_billing_details,
)

from marley_frontend.api import check_and_insert_token

undefined_conditions = ["null", "", "undefined", "false", False, "[]", []]


@frappe.whitelist(allow_guest=True)
def get_masters():
	practitioners = []
	departments = []

	practitioners = frappe.db.get_all(
		"Healthcare Practitioner",
		fields=["practitioner_name as label", "name as value", "image"],
		order_by="name ASC",
	)
	default_image = "/src/assets/UserIcon.svg"
	for i in practitioners:
		i["image"] = i.get("image") or default_image

	departments = frappe.db.get_all("Medical Department", fields=["name as label", "name as value"])

	employee_options = frappe.db.get_all(
		"Employee", filters={"status": "Active"}, fields=["employee_name as label", "name as value"]
	)

	source_options = [{"label": "", "value": ""}]
	field_meta = frappe.get_meta("Patient").get_field("custom_source")
	for item in field_meta.options.strip().splitlines():
		source_options.append({"label": item.strip(), "value": item.strip()})

	return {
		"practitioners": practitioners,
		"departments": departments,
		"employee_options": employee_options,
		"source_options": source_options,
	}


@frappe.whitelist(allow_guest=True)
def get_practitioners(department=None):
	department = None if department in ["undefined", "", "null"] else department
	practitioners = []
	filters = {}
	if department:
		filters = {"department": department}
	practitioners = frappe.db.get_all(
		"Healthcare Practitioner",
		filters=filters,
		fields=["practitioner_name as label", "name as value", "image"],
	)

	return {"practitioners": practitioners}


@frappe.whitelist(allow_guest=True)
def get_patients():
	patients = []
	default_image = "/src/assets/UserIcon.svg"
	for name in frappe.db.get_all(
		"Patient",
		fields=["name", "patient_name", "image", "mobile"],
		order_by="name ASC",
	):
		patients.append(
			{
				"label": f"{name.patient_name}, {name.mobile or ''}",
				"value": name.name,
				"image": name.image or default_image,
			}
		)
	return {"patients": patients}


@frappe.whitelist(allow_guest=True)
def get_appointment_types(practitioner=None, new_patient=False):
	practitioner = None if practitioner in ["undefined", "", "null"] else practitioner
	filters = {}

	appointment_types = frappe.db.get_all(
		"Appointment Type",
		filters=filters,
		fields=["name as label", "name as value"],
	)

	return appointment_types


# Api for slots getting
@frappe.whitelist(allow_guest=True)
def get_slots_in_dialog(practitioner, date):
	date = getdate() if date in ["undefined", "", "null"] else getdate(date)
	practitioner = None if practitioner in ["undefined", "", "null"] else practitioner

	if not practitioner:
		return

	current_date = getdate()
	if date < current_date:
		return {"status": "error", "message": "Cannot fetch slots for past dates."}

	practitioner_doc = frappe.get_doc("Healthcare Practitioner", practitioner)
	curr_bookings = frappe.db.get_all(
		"Patient Appointment",
		filters={"practitioner": practitioner_doc.name, "appointment_date": date},
		pluck="appointment_time",
	)
	booked_slots = [(datetime.min + booked_slot).time() for booked_slot in curr_bookings]

	available_slots = full_slots = []
	weekday = date.strftime("%A")

	for schedule_entry in practitioner_doc.practitioner_schedules:
		practitioner_schedule = frappe.get_doc("Practitioner Schedule", schedule_entry.schedule)

		if practitioner_schedule and not practitioner_schedule.disabled:
			available_slots = []
			for time_slot in practitioner_schedule.time_slots:
				if weekday == time_slot.day:
					time = datetime.min + time_slot.from_time
					current_time = get_time(get_datetime())
					time = time.time()
					if date == current_date:
						if time not in booked_slots and time > current_time:
							available_slots.append(time.strftime("%H:%M"))
					else:
						if time not in booked_slots:
							available_slots.append(time.strftime("%H:%M"))
		full_slots.extend(available_slots)

	if len(full_slots) == 0:
		return None
	else:
		full_slots = list(sorted(full_slots))

		return {"status": "success", "slots": full_slots}


@frappe.whitelist(allow_guest=True)
def get_appointments(
	practitioner=None,
	appointment_date=None,
	appointment_type=None,
	search_by=None,
	patient=None,
	department=None,
	mobile=None,
	sort_by=None,
):
	practitioner = None if practitioner in undefined_conditions else practitioner
	pract_list = []
	if practitioner and isinstance(practitioner, str):
		practitioner = json.loads(practitioner)
		for i in practitioner:
			pract_list.append(i.get("value"))

	appointment_type = None if appointment_type in undefined_conditions else appointment_type
	appointment = None if search_by in undefined_conditions else search_by
	department = None if department in undefined_conditions else department
	patient = None if patient in undefined_conditions else patient
	appointment_date = getdate() if appointment_date in undefined_conditions else getdate(appointment_date)
	mobile = None if mobile in undefined_conditions else mobile
	sort_by = "Appointment Time" if sort_by in undefined_conditions else sort_by

	filters = {}
	if pract_list and len(pract_list):
		filters["practitioner"] = ["in", pract_list]
	if appointment_date:
		filters["appointment_date"] = appointment_date
	if appointment_type:
		filters["appointment_type"] = appointment_type
	if appointment:
		filters["name"] = appointment
	if department:
		filters["department"] = department
	if patient:
		filters["patient"] = patient
	if mobile:
		patients = frappe.db.get_all("Patient", filters={"mobile": ["like", f"%{mobile}%"]}, pluck="name")
		filters["patient"] = ["in", patients]

	appointment_data = frappe.db.get_all(
		"Patient Appointment",
		filters=filters,
		fields=["*"],
		order_by="appointment_time ASC",
		as_list=False,
	)
	update_appointment(appointment_data, sort_by)
	data = {}
	for i in appointment_data:
		i["paid"] = True if i.invoiced else False
		data.setdefault(i["status"], []).append(i)
	data["All"] = appointment_data

	return data


def update_appointment(appointment_data, sort_by="Appointment Time"):
	for item in appointment_data:
		item["booked_time"] = format_time(item.appointment_time, "h.mm a").lower()
		patient_doc = frappe.get_doc("Patient", item.patient)
		currency = patient_doc.default_currency
		if not currency:
			currency = get_default_currency()

		item["patient_token_number"] = None
		if item.service_unit:
			item["service_unit_name"] = frappe.db.get_value(
				"Healthcare Service Unit",
				item.service_unit,
				"healthcare_service_unit_name",
			)
		if item.patient_token:
			if frappe.db.exists("Patient Token", item.patient_token):
				patient_token_number, status = frappe.db.get_value(
					"Patient Token", item.patient_token, ["token_number", "status"]
				)
				item["patient_token_number"] = patient_token_number
				item["token_status"] = status

		item["is_today"] = True if getdate() == getdate(item.appointment_date) else False
		item["mobile"] = str(
			patient_doc.get("mobile")
			if patient_doc.get("mobile")
			else patient_doc.get("phone")
			if patient_doc.get("phone")
			else "-"
		)
		item["age"] = str(patient_doc.get("custom_age") if patient_doc.get("custom_age") else "")
		item["visit_date"] = (
			format_date(getdate(patient_doc.get("custom_last_visit_date")), "dd-mm-yyyy")
			if patient_doc.get("custom_last_visit_date")
			else None
		)
		has_encounter = frappe.db.exists(
			"Patient Encounter",
			{"appointment": item.get("name"), "docstatus": ["!=", 2]},
		)
		item["has_encounter"] = False if has_encounter else True
		item["encounter"] = has_encounter
		item["has_token"] = False if item.patient_token else True
		item["patient_id"] = patient_doc.get("name")
		item["appointment_type"] = item.appointment_type if hasattr(item, "appointment_type") else None

		if item.status == "Closed":
			encounter = frappe.db.exists("Patient Encounter", {"appointment": item.name, "docstatus": 1})
			item["consulted"] = True if encounter else False
			item["status"] = "Consulted"
		if item.patient_token:
			get_current_token_status(item)

		item["statusClass"] = get_status_class(item.status)
		item["image"] = patient_doc.image or ""
		item["practitioner_image"] = (
			frappe.db.get_value("Healthcare Practitioner", item.practitioner, "image") or ""
		)

		# get unallocated advance amount
		total_unallocated_advance_amt = get_total_unallocated_advance_amount(patient_doc.customer)
		total_advance_amount = get_total_advance_amount(patient_doc.customer)
		item["advance_amount"] = total_advance_amount
		item["advance_amount_with_currency"] = fmt_money(item["advance_amount"], None, currency)

		# get total_outstanding_amount
		total_outstanding_amount, invoiced_due_data = get_total_outstanding_amount(item.patient)
		item["invoiced_due_with_currency"] = fmt_money(total_outstanding_amount, None, currency)
		item["invoiced_due"] = total_outstanding_amount
		item["invoiced_due_data"] = invoiced_due_data

		# get balance amount
		balance_amount, booked_due_data = get_all_out_standing_amount(
			item.patient, total_unallocated_advance_amt, item.get("name")
		)
		item["balance_with_currency"] = fmt_money(balance_amount, None, currency)
		item["balance"] = balance_amount

	if sort_by == "Checkin Time":
		appointment_data.sort(
			key=lambda x: (x.get("checkin") if x.get("checkin") is not None else datetime.max,)
		)


def get_total_unallocated_advance_amount(customer=None):
	PE = DocType("Payment Entry")

	advance_balance = (
		frappe.qb.from_(PE)
		.select(Sum(PE.unallocated_amount).as_("unallocated_amount"))
		.where(PE.party == customer)
		.where(PE.docstatus == 1)
		.where(PE.custom_reference_appointment.isnull())
	).run(as_dict=True)

	total_unallocated_advance_amt = 0
	if advance_balance and len(advance_balance) and advance_balance[0].get("unallocated_amount"):
		total_unallocated_advance_amt = advance_balance[0].get("unallocated_amount")

	return total_unallocated_advance_amt


@frappe.whitelist()
def get_total_advance_amount(customer=None):
	PE = DocType("Payment Entry")

	advance_balance = (
		frappe.qb.from_(PE)
		.select(Sum(PE.unallocated_amount).as_("unallocated_amount"))
		.where(PE.party == customer)
		.where(PE.docstatus == 1)
	).run(as_dict=True)

	total_unallocated_advance_amt = 0
	if advance_balance and len(advance_balance) and advance_balance[0].get("unallocated_amount"):
		total_unallocated_advance_amt = advance_balance[0].get("unallocated_amount")

	return total_unallocated_advance_amt


def get_total_outstanding_amount(patient=None, date=None):
	if not date:
		date = getdate()

	invoices = frappe.db.get_all(
		"Sales Invoice",
		filters={"patient": patient, "docstatus": 1},
		# fields=["sum(outstanding_amount) as outstanding_amount"],
		fields=["name", "grand_total", "outstanding_amount", "posting_date"],
	)

	due_data = []
	total_outstanding_amount = 0
	if invoices and len(invoices):
		for inv in invoices:
			if inv.get("outstanding_amount"):
				total_outstanding_amount += inv.get("outstanding_amount")
				due_data.append(
					{
						"idx": str(len(due_data) + 1),
						"service": inv.get("name"),
						"payable_amount": str(inv.get("grand_total")),
						"paid_amount": str(inv.get("grand_total") - inv.get("outstanding_amount")),
						"balance_amount": str(inv.get("outstanding_amount")),
						"posting_date": format_date(getdate(inv.get("posting_date")), "dd-mm-yyyy"),
					}
				)

	return total_outstanding_amount, due_data


def get_all_out_standing_amount(patient=None, total_unallocated_advance_amt=0, appointment=None):
	if not patient:
		return
	outstanding_amount = 0
	total_amount_to_pay = 0
	due_data = []
	registration_and_consultation_payments = get_payments(appointment)
	reg_balance_pay = registration_and_consultation_payments.get(
		"registration_fee"
	) - registration_and_consultation_payments.get("registration_paid_amount")
	consultation_balance_pay = registration_and_consultation_payments.get(
		"consultation_charge"
	) - registration_and_consultation_payments.get("consultation_paid_amount")

	if reg_balance_pay:
		due_data.append(
			{
				"idx": str(len(due_data) + 1),
				"service": "Registration Charge",
				"reference_type": "Patient",
				"reference_name": patient,
				"payable_amount": str(registration_and_consultation_payments.get("registration_fee")),
				"paid_amount": str(registration_and_consultation_payments.get("registration_paid_amount")),
				"balance_amount": str(reg_balance_pay),
				"posting_date": format_date(
					getdate(registration_and_consultation_payments.get("registration_pay_date")), "dd-mm-yyyy"
				),
			}
		)

	if consultation_balance_pay:
		due_data.append(
			{
				"idx": str(len(due_data) + 1),
				"service": registration_and_consultation_payments.get("consultation_item"),
				"reference_type": "Patient Appointment",
				"reference_name": appointment,
				"payable_amount": str(registration_and_consultation_payments.get("consultation_charge")),
				"paid_amount": str(registration_and_consultation_payments.get("consultation_paid_amount")),
				"balance_amount": str(consultation_balance_pay),
				"posting_date": format_date(
					getdate(registration_and_consultation_payments.get("consultation_pay_date")), "dd-mm-yyyy"
				),
			}
		)

	if registration_and_consultation_payments.get("balance_to_pay"):
		total_amount_to_pay += registration_and_consultation_payments.get("balance_to_pay")

	company = get_default_company(frappe.session.user)
	customer_price_list = frappe.db.get_value("Patient", patient, "default_price_list")
	patient = frappe.get_doc("Patient", patient)
	items_to_invoice = []
	if patient:
		items_to_invoice += get_clinical_procedures_to_invoice(patient, company)
		# items_to_invoice += get_inpatient_services_to_invoice(patient, company)
		# items_to_invoice += get_booked_therapy_sessions_to_invoice(patient, company)
		items_to_invoice += get_observations_to_invoice(patient, company)
		# items_to_invoice += get_booked_room_rent(patient, company)

	for item in items_to_invoice:
		payable_amount, paid_amount, balance_amount = 0, 0, 0
		posting_date = item.get("posting_date")
		if item.get("reference_type") in ["Therapy Type", "Cost Counselling"]:
			total_amount_to_pay += flt(
				item.get("payable_amount")
				if item.get("reference_type") == "Room"
				else item.get("balance_pay")
			)
			payable_amount, paid_amount, balance_amount = (
				item.get("payable_amount"),
				item.get("paid_amount"),
				item.get("balance_pay"),
			)
			posting_date = frappe.db.get_value(
				"Cost Counselling",
				item.get("cost_counselling") if item.get("cost_counselling") else item.get("reference_name"),
				"posting_date",
			)
		elif item.get("rate"):
			total_amount_to_pay += flt(item.get("rate"), 3) * flt(
				item.get("qty") if item.get("qty") else 1, 3
			)
			payable_amount = flt(item.get("rate"), 3) * flt(item.get("qty") if item.get("qty") else 1, 3)
			balance_amount = flt(payable_amount, 3) - flt(paid_amount, 3)
		else:
			if item.get("service"):
				price_list_rate = frappe.db.get_value(
					"Item Price",
					{
						"selling": 1,
						"item_code": item.get("service"),
						"price_list": customer_price_list,
					},
					"price_list_rate",
				)
				if price_list_rate:
					total_amount_to_pay += flt(price_list_rate, 3) * flt(
						item.get("qty") if item.get("qty") else 1, 3
					)
					payable_amount = flt(price_list_rate, 3) * flt(
						item.get("qty") if item.get("qty") else 1, 3
					)
					balance_amount = flt(payable_amount, 3) - flt(paid_amount, 3)

		if item.get("reference_type") == "Observation":
			posting_date = frappe.db.get_value("Observation", item.get("reference_name"), "posting_date")
		elif item.get("reference_type") in ["Inpatient Occupancy", "Inpatient Record Item"]:
			ip = frappe.db.get_value(item.get("reference_type"), item.get("reference_name"), "parent")
			posting_date = frappe.db.get_value("Inpatient Record", ip, "admitted_datetime")
		elif item.get("reference_type") == "Clinical Procedure":
			posting_date = frappe.db.get_value("Clinical Procedure", item.get("reference_name"), "start_date")

		if balance_amount:
			due_data.append(
				{
					"idx": str(len(due_data) + 1),
					"service": item.get("service"),
					"reference_type": item.get("reference_type"),
					"reference_name": item.get("reference_name"),
					"payable_amount": str(flt(payable_amount, 3)),
					"paid_amount": str(flt(paid_amount, 3)),
					"balance_amount": str(flt(balance_amount, 3)),
					"posting_date": format_date(getdate(posting_date), "dd-mm-yyyy") if posting_date else "",
				}
			)

	# encounters = frappe.db.get_all(
	# 	"Patient Encounter", {"patient": patient, "docstatus": 1}, pluck="name"
	# )
	# if encounters and len(encounters):
	# 	for enc in encounters:
	# 		prescriptions = get_drugs_to_invoice(enc, None)

	# 		if prescriptions and len(prescriptions):
	# 			for i in prescriptions:
	# 				if i.get("drug_code") and i.get("quantity"):
	# 					price_list_rate = frappe.db.get_value(
	# 						"Item Price",
	# 						{
	# 							"selling": 1,
	# 							"item_code": i.get("drug_code"),
	# 							"price_list": customer_price_list,
	# 						},
	# 						"price_list_rate",
	# 					)
	# 					if price_list_rate:
	# 						total_amount_to_pay += flt(price_list_rate) * flt(
	# 							i.get("quantity")
	# 						)

	outstanding_amount = flt(total_amount_to_pay, 3) - total_unallocated_advance_amt

	return flt(outstanding_amount, 3), due_data


def get_booked_room_rent(patient, company):
	if not patient:
		return

	items_to_invoice = []
	room_details = frappe.db.sql(
		f"""
		select
			ccl.cost_counselling,
			ccl.room_type,
			ccl.room,
			ccl.estimated_rent as payable_amount,
			SUM(ccl.total_paid_amount) as paid_amount,
			(COALESCE(ccl.estimated_rent, 0) - COALESCE(SUM(ccl.total_paid_amount), 0)) as balance_pay
		from
			`tabCost Counselling Log` as ccl
		where
			ccl.is_cancelled=0 and
			ccl.use_room_rent=1 and
			ccl.patient={frappe.db.escape(patient.name)} and
			ccl.company={frappe.db.escape(company)}
		group by
			ccl.cost_counselling
	""",
		as_dict=True,
	)

	for i in room_details:
		if i.room and i.payable_amount > 0:
			items_to_invoice.append(
				{
					"service": frappe.db.get_value(
						"Healthcare Service Unit", i.room, "healthcare_service_unit_name"
					),
					"reference_type": "Cost Counselling",
					"reference_name": i.cost_counselling,
					"payable_amount": i.payable_amount,
					"paid_amount": i.paid_amount,
					"balance_pay": i.balance_pay,
					"cost_counselling": i.cost_counselling,
				}
			)

	return items_to_invoice


def get_booked_therapy_sessions_to_invoice(patient, company):
	if not patient:
		return

	items_to_invoice = []
	sessions_details = frappe.db.sql(
		f"""
		select
			tp.name as therapy_plan,
			tpd.custom_booked_sessions as booked_sessions,
			tpd.therapy_type,
			cci.paid_amount,
			cci.payable_amount,
			cci.balance_pay,
			cci.item_code,
			cci.cost_counselling
		from
			`tabTherapy Plan` as tp left join
			`tabTherapy Plan Detail` as tpd on tp.name=tpd.parent left join
			(
				select
					cci.plan_item_ref as plan_item_ref,
					cci.item_code,
					ccl.cost_counselling,
					SUM(cci.booked_sessions) as booked_sessions,
					SUM(cci.paid_amount) as paid_amount,
					SUM(cci.amount_with_discount) as payable_amount,
					(COALESCE(SUM(cci.amount_with_discount), 0) - COALESCE(SUM(cci.paid_amount), 0)) as balance_pay
				from
					`tabCost Counselling Item` as cci left join
					`tabCost Counselling Log` as ccl on ccl.name=cci.parent
				where
					ccl.is_cancelled=0 and
					ccl.patient={frappe.db.escape(patient.name)} and
					ccl.company={frappe.db.escape(company)}
				group by
					cci.plan_item_ref
			) as cci on tpd.name=cci.plan_item_ref
		where
			tp.status!='Cancelled' and
			tpd.sessions_completed<tpd.custom_booked_sessions and
			tp.patient={frappe.db.escape(patient.name)} and
			tp.company={frappe.db.escape(company)}
		group by
			tp.name, tpd.therapy_type
	""",
		as_dict=True,
	)

	for i in sessions_details:
		items_to_invoice.append(
			{
				"reference_type": "Therapy Type",
				"reference_name": i.therapy_type,
				"service": i.item_code,
				"qty": i.booked_sessions,
				"payable_amount": i.payable_amount,
				"paid_amount": i.paid_amount,
				"balance_pay": i.balance_pay,
				"cost_counselling": i.cost_counselling,
			}
		)

	return items_to_invoice


def get_status_class(status):
	status_dict = {
		"Scheduled": "! text-yellow-600",
		"Open": "! text-orange-600",
		"Expired": "! text-surface-gray-8",
		"Cancelled": "! text-red-600",
		"Consulted": "! text-green-500",
		"Checked In": "! text-blue-600",
		"Attending": "! text-purple-600",
		"Checked Out": "! text-orange-600",
		"Confirmed": "! text-green-500",
		"No Show": "! text-red-600",
	}

	return status_dict.get(status) if status_dict.get(status) else "! text-black-700"


def get_current_token_status(item):
	if item.patient_token:
		token_doc = frappe.get_doc("Patient Token", item.patient_token)
		if (
			token_doc.status != "Expired"
			and token_doc.patient_journey_stops
			and len(token_doc.patient_journey_stops)
		):
			last_row = token_doc.patient_journey_stops[-1]
			service_unit_name = frappe.db.get_value(
				"Healthcare Service Unit",
				last_row.service_unit,
				"healthcare_service_unit_name",
			)
			if last_row.exit_time:
				item["status"] = "Checked Out"
				item["token_su"] = last_row.service_unit
				item["token_su_name"] = service_unit_name
			elif last_row.entry_time and not last_row.exit_time:
				item["status"] = "Attending"
				item["token_su"] = last_row.service_unit
				item["token_su_name"] = service_unit_name
			elif last_row.check_in_time and not last_row.entry_time and not last_row.exit_time:
				item["status"] = "Checked In"
				item["token_su"] = last_row.service_unit
				item["token_su_name"] = service_unit_name
			else:
				item["status"] = "Confirmed"
			if last_row.check_in_time:
				item["checkin"] = last_row.check_in_time
				item["checkin_time"] = format_time(last_row.check_in_time, "h.mm a").lower()


# reschedule patient appointment
@frappe.whitelist(allow_guest=True)
def reschedule_appointment_booking(appointment_id, appointment_date, new_slot, reschedule_reason=None):
	updated_booking = frappe.get_doc("Patient Appointment", appointment_id)
	updated_booking.appointment_date = appointment_date
	updated_booking.appointment_time = new_slot
	updated_booking.custom_reschedule_reason = reschedule_reason
	updated_booking.save(ignore_permissions=True)


# Patient Registration
@frappe.whitelist(allow_guest=True)
def patient_registration(
	first_name=None,
	last_name=None,
	gender=None,
	mobile=None,
	email=None,
	dob=None,
	marital_status=None,
	addressLine1=None,
	addressLine2=None,
	city=None,
	state=None,
	zip=None,
	source=None,
	employee=None,
	file=None,
):
	first_name = None if first_name in undefined_conditions else first_name
	last_name = None if last_name in undefined_conditions else last_name
	gender = None if gender in undefined_conditions else gender
	mobile = None if mobile in undefined_conditions else mobile
	email = None if email in undefined_conditions else email
	dob = None if dob in undefined_conditions else getdate(dob)
	marital_status = None if marital_status in undefined_conditions else marital_status
	addressLine1 = None if addressLine1 in undefined_conditions else addressLine1
	addressLine2 = None if addressLine2 in undefined_conditions else addressLine2
	city = None if city in undefined_conditions else city
	state = None if state in undefined_conditions else state
	zip = None if zip in undefined_conditions else zip
	source = None if source in undefined_conditions else source
	employee = None if employee in undefined_conditions else employee
	file = None if file in undefined_conditions else file

	new_patient = frappe.new_doc("Patient")
	new_patient.first_name = first_name
	new_patient.last_name = last_name
	new_patient.sex = gender
	new_patient.email = email
	new_patient.mobile = mobile
	new_patient.dob = dob
	new_patient.marital_status = marital_status
	new_patient.address_line1 = addressLine1
	new_patient.address_line2 = addressLine2
	new_patient.city = city
	new_patient.state = state
	new_patient.zip_code = zip
	new_patient.custom_source = source
	new_patient.custom_employee = employee if source == "Employee" else None
	new_patient.image = file

	new_patient.save(ignore_permissions=True)

	return {
		"status": "success",
		"label": new_patient.patient_name,
		"value": new_patient.name,
		"image": new_patient.image,
	}


# vital signs
@frappe.whitelist(allow_guest=True)
def create_vitalsigns():
	appointment = frappe.form_dict.get("appointment")
	patient = frappe.db.get_value("Patient Appointment", appointment, "patient")

	existing_vital = frappe.db.exists("Vital Signs", {"patient": patient, "appointment": appointment})
	department = frappe.db.get_value("Patient Appointment", appointment, "department")
	vitals_service_unit = frappe.db.get_value("Medical Department", department, "service_unit")

	if check_already_attending(vitals_service_unit, frappe.form_dict.get("patient_token")):
		return {"status": "Error", "message": "Another patient is currently attending!"}
	if existing_vital:
		docstatus = frappe.db.get_value("Vital Signs", existing_vital, "docstatus")
		if docstatus == 1:
			return {
				"status": "Error",
				"message": "Cannot update Vital Signs. The document is already submitted.",
			}
		new_vital = frappe.get_doc("Vital Signs", existing_vital)
		new_vital.weight = frappe.form_dict.get("weight")
		new_vital.pulse = frappe.form_dict.get("pulse")
		new_vital.height = frappe.form_dict.get("height")
		new_vital.respiratory_rate = frappe.form_dict.get("respiratory_rate")
		new_vital.temperature = frappe.form_dict.get("temperature")
		new_vital.vital_signs_note = frappe.form_dict.get("notes")
		new_vital.bp_diastolic = frappe.form_dict.get("bp_diastolic")
		new_vital.bp_systolic = frappe.form_dict.get("bp_systolic")
		new_vital.save(ignore_permissions=True)
	else:
		active_token = frappe.db.exists(
			"Patient Token",
			{"patient": patient, "status": "Checked In", "reference_dn": appointment},
		)
		if active_token:
			patient_token = frappe.get_doc("Patient Token", active_token)
			journey_stop = next(
				(
					stop
					for stop in patient_token.patient_journey_stops
					if stop.get("status") == "Checked In" and stop.get("service_unit") == vitals_service_unit
				),
				None,
			)

			if not journey_stop:
				return {
					"status": "Error",
					"message": f"Not Checked In to {vitals_service_unit}, please Check In and try again",
				}

			frappe.db.set_value(
				journey_stop.doctype,
				journey_stop.name,
				{
					"status": "In Progress",
					"entry_time": now_datetime(),
					"user": frappe.session.user,
					"time_in_queue": time_diff_in_hours(journey_stop.entry_time, journey_stop.check_in_time),
				},
			)

			frappe.db.set_value("Patient Token", patient_token.next, "head", 1)
			frappe.db.set_value(patient_token.doctype, patient_token.name, "head", 0)
		else:
			return {"status": "Error", "message": "Please Check-in before attending"}

		new_vital = frappe.new_doc("Vital Signs")
		new_vital.patient = patient
		new_vital.appointment = appointment
		new_vital.weight = frappe.form_dict.get("weight")
		new_vital.pulse = frappe.form_dict.get("pulse")
		new_vital.height = frappe.form_dict.get("height")
		new_vital.respiratory_rate = frappe.form_dict.get("respiratory_rate")
		new_vital.temperature = frappe.form_dict.get("temperature")
		new_vital.vital_signs_note = frappe.form_dict.get("notes")
		new_vital.bp_diastolic = frappe.form_dict.get("bp_diastolic")
		new_vital.bp_systolic = frappe.form_dict.get("bp_systolic")
		new_vital.save(ignore_permissions=True)

	if new_vital.name:
		frappe.db.commit()
		frappe.publish_realtime("update_tokens")
		return {"status": "Success", "id": new_vital.name}
	else:
		return {"status": "Error", "message": "Vitals not created or updated"}


def check_already_attending(service_unit, patient_token=None):
	check = False
	cond = ""
	if patient_token:
		cond = f" and pt.name!={frappe.db.escape(patient_token)}"
	exists = frappe.db.sql(
		f"""
		select pjs.name
		from
			`tabPatient Token` as pt left join
			`tabPatient Journey Stop` as pjs on pt.name=pjs.parent
		where
			pt.status in ('Active', 'Checked In') and
			pjs.service_unit={frappe.db.escape(service_unit)} and
			pjs.status='In Progress' {cond}
	""",
		as_dict=True,
	)
	if exists and len(exists):
		check = True

	return check


# Submit vital signs
@frappe.whitelist(allow_guest=True)
def submit_vitalsigns():
	appointment = frappe.form_dict.get("appointment")
	if not appointment:
		return {"status": "Error", "message": "Appointment is required."}

	patient = frappe.db.get_value("Patient Appointment", appointment, "patient")
	if not patient:
		return {"status": "Error", "message": "Invalid appointment. Patient not found."}

	# Check if Vital Signs already exist
	existing_vital = frappe.db.exists(
		"Vital Signs",
		{"patient": patient, "appointment": appointment, "docstatus": ["!=", 2]},
	)
	if existing_vital:
		docstatus = frappe.db.get_value("Vital Signs", existing_vital, "docstatus")
		if docstatus == 1:
			return {"status": "Error", "message": "The document is already submitted."}

		vital_doc = frappe.get_doc("Vital Signs", existing_vital)
	else:
		vital_doc = frappe.new_doc("Vital Signs")
		vital_doc.patient = patient
		vital_doc.appointment = appointment
		vital_doc.weight = frappe.form_dict.get("weight")
		vital_doc.pulse = frappe.form_dict.get("pulse")
		vital_doc.height = frappe.form_dict.get("height")
		vital_doc.respiratory_rate = frappe.form_dict.get("respiratory_rate")
		vital_doc.temperature = frappe.form_dict.get("temperature")
		vital_doc.vital_signs_note = frappe.form_dict.get("notes")
		vital_doc.bp_diastolic = frappe.form_dict.get("bp_diastolic")
		vital_doc.bp_systolic = frappe.form_dict.get("bp_systolic")


		vital_doc.insert(ignore_permissions=True)

	vital_doc.submit()
	frappe.publish_realtime("update_tokens")
	frappe.db.commit()

	# Handle Patient Token without creating a new one
	patient_token = frappe.db.get_value("Patient Appointment", appointment, "patient_token")

	if patient_token:
		token_doc = frappe.get_doc("Patient Token", patient_token)

		if token_doc.status not in ["Expired", "Checked Out"] and token_doc.patient_journey_stops:
			last_row = token_doc.patient_journey_stops[-1]
			current_time = frappe.utils.now()

			if not last_row.entry_time:
				last_row.entry_time = current_time

			if not last_row.exit_time:
				last_row.exit_time = current_time

			# Ensure status is updated to "Checked Out" if required
			if last_row.status != "Checked Out":
				last_row.status = "Checked Out"

			if token_doc.status == "Checked In":
				token_doc.status = "Active"

			token_doc.save(ignore_permissions=True)
			frappe.db.commit()

		return {
			"status": "Success",
			"message": "Vital Signs submitted successfully, and Patient Token updated.",
		}

	return {"status": "Error", "message": "Invalid Patient Token or already expired."}


@frappe.whitelist()
def get_vitals(appointment):
	if not appointment:
		return

	vital = frappe.db.exists("Vital Signs", {"appointment": appointment, "docstatus": ["!=", 2]})

	if vital:
		return frappe.get_doc("Vital Signs", vital)

	return {"is_new": True}


# consultation Payment entry
@frappe.whitelist(allow_guest=True)
def create_payment_entry(
	reference_appointment=None,
	mode_of_payment=None,
	amount=0,
	registration_fee=0,
	consultation_amount=0,
	reference_date=None,
	reference_no=None,
):
	if not reference_date:
		reference_date = getdate()

	if isinstance(amount, str):
		amount = flt(amount)

	if not amount:
		return {"status": "error", "message": "Payable amount cannot be zero"}

	if isinstance(registration_fee, str):
		registration_fee = flt(registration_fee)
	if isinstance(consultation_amount, str):
		consultation_amount = flt(consultation_amount)

	reference_date = getdate() if reference_date in ["", "null", "undeffined"] else reference_date
	patient = frappe.db.get_value("Patient Appointment", reference_appointment, "patient")

	appointment_details = get_payments(reference_appointment)
	(
		balance_registration_amount,
		registration_fee_amount,
		balance_consultation_amount,
		consultation_charge_amount,
	) = (0, 0, 0, 0)
	if registration_fee:
		paid_amount = appointment_details.get("registration_paid_amount") or 0
		if paid_amount < registration_fee:
			balance_registration_amount = registration_fee - paid_amount
			if amount >= balance_registration_amount:
				registration_fee_amount = balance_registration_amount
				amount -= balance_registration_amount
			else:
				registration_fee_amount = amount
				amount = 0

	# create Payment Entry for registartion fee
	if registration_fee_amount:
		make_payment_entry(
			patient,
			reference_appointment,
			mode_of_payment,
			registration_fee_amount,
			reference_date,
			reference_no,
			True,
		)

	if consultation_amount:
		paid_amount = appointment_details.get("consultation_paid_amount") or 0
		if paid_amount < consultation_amount:
			balance_consultation_amount = consultation_amount - paid_amount
			if amount >= balance_consultation_amount:
				consultation_charge_amount = balance_consultation_amount
				amount -= balance_consultation_amount
			else:
				consultation_charge_amount = amount
				amount = 0

	# create Payment Entry for consultation fee
	if consultation_charge_amount:
		make_payment_entry(
			patient,
			reference_appointment,
			mode_of_payment,
			consultation_charge_amount,
			reference_date,
			reference_no,
		)

	# create Payment Entry for advance
	if amount > 0:
		make_payment_entry(
			patient,
			reference_appointment,
			mode_of_payment,
			amount,
			reference_date,
			reference_no,
			False,
			True,
		)

	return {"status": "Success"}


def make_payment_entry(
	patient=None,
	reference_appointment=None,
	mode_of_payment=None,
	amount=0,
	reference_date=None,
	reference_no=None,
	is_registration_payment=False,
	is_advance=False,
):
	if not reference_date:
		reference_date = getdate()

	outstanding_invoices = []
	if is_registration_payment:
		outstanding_invoices = get_outstanding_invoices("Patient", patient)
	elif not is_advance:
		outstanding_invoices = get_outstanding_invoices("Patient Appointment", reference_appointment)

	company = frappe.db.get_value("Patient Appointment", reference_appointment, "company")
	pe_doc = frappe.new_doc("Payment Entry")
	pe_doc.patient = patient
	pe_doc.payment_type = "Receive"
	pe_doc.posting_date = getdate()
	pe_doc.reference_no = reference_no
	pe_doc.reference_date = reference_date
	pe_doc.custom_reference_appointment = reference_appointment if not is_advance else None
	pe_doc.register_paid = is_registration_payment
	pe_doc.mode_of_payment = mode_of_payment
	pe_doc.paid_to = frappe.db.get_value(
		"Mode of Payment Account",
		{
			"company": company,
			"parent": mode_of_payment,
			"parentfield": "accounts",
			"parenttype": "Mode of Payment",
		},
		"default_account",
	)

	if not pe_doc.paid_to:
		return {
			"status": "error",
			"message": f"Please set account in Mode of Payment: {mode_of_payment}, for the company: {company}",
		}

	pe_doc.party_type = "Customer"
	pe_doc.party = frappe.db.get_value("Patient", patient, "customer")
	pe_doc.paid_amount = flt(amount)
	pe_doc.received_amount = flt(amount)

	# Set exchange rates
	from_currency = frappe.db.get_value("Account", pe_doc.paid_to, "account_currency")
	to_currency = frappe.db.get_value("Company", company, "default_currency")
	pe_doc.target_exchange_rate = get_exchange_rate(from_currency, to_currency)
	party_acc = get_party_account(pe_doc.party_type, pe_doc.party, company)
	pe_doc.source_exchange_rate = get_exchange_rate(
		frappe.db.get_value("Account", party_acc, "account_currency"), to_currency
	)
	if outstanding_invoices and len(outstanding_invoices):
		for i in outstanding_invoices:
			pe_doc.append(
				"references",
				{
					"reference_doctype": "Sales Invoice",
					"reference_name": i.sales_invoice,
					"total_amount": i.total_amount,
					"outstanding_amount": i.outstanding_amount,
					"allocated_amount": pe_doc.paid_amount
					if pe_doc.paid_amount <= i.outstanding_amount
					else i.outstanding_amount,
				},
			)

	pe_doc.insert(ignore_permissions=True)
	pe_doc.submit()

	if is_registration_payment:
		frappe.db.set_value("Patient", patient, {"payment_entry_created": 1, "status": "Active"})

	frappe.db.commit()


def get_outstanding_invoices(reference_dt, reference_dn):
	return frappe.db.sql(
		f"""
		select
			si.name as sales_invoice,
			si.grand_total as total_amount,
			si.outstanding_amount as outstanding_amount
		from
			`tabSales Invoice Item` as sii left join
			`tabSales Invoice` as si on si.name=sii.parent
		where
			si.docstatus=1 and
			si.outstanding_amount>0 and
			sii.reference_dt={frappe.db.escape(reference_dt)} and
			sii.reference_dn={frappe.db.escape(reference_dn)}
	""",
		as_dict=True,
	)


@frappe.whitelist(allow_guest=True)
def get_payments(appointment):
	if not appointment:
		frappe.throw("Appointment ID is required.")

	appointment_doc = frappe.get_doc("Patient Appointment", appointment)

	consultation_charge = 0
	registration_fee = 0
	consultation_pay_date = None
	registration_pay_date = None

	is_billable = check_is_billable(appointment_doc)

	if frappe.db.get_single_value("Healthcare Settings", "collect_registration_fee"):
		fee = frappe.db.get_single_value("Healthcare Settings", "registration_fee")
		if (
			not appointment_doc.custom_registration_fee_paid
			and not appointment_doc.custom_registration_fee_invoiced
		) or frappe.db.exists(
			"Payment Entry", {"docstatus": 1, "custom_reference_appointment": appointment, "register_paid": 1}
		):
			registration_fee = fee or 0
		else:
			registration_fee = 0

	registration_paid_amount = 0
	customer = frappe.db.get_value("Patient", appointment_doc.patient, "customer")

	PE = DocType("Payment Entry")

	paid_reg_amount_details = (
		frappe.qb.from_(PE)
		.select(Sum(PE.paid_amount).as_("amount"), PE.posting_date)
		.where(PE.docstatus != 2)
		.where(PE.register_paid == 1)
		.where(PE.party == customer)
		.where(PE.custom_reference_appointment == appointment)
	).run(as_dict=True)

	if paid_reg_amount_details and paid_reg_amount_details[0].get("amount"):
		registration_paid_amount = paid_reg_amount_details[0].get("amount")
		registration_pay_date = paid_reg_amount_details[0].get("posting_date")
	if registration_paid_amount == 0 and frappe.db.get_value("Patient", appointment_doc.patient, "invoiced"):
		registration_paid_amount = registration_fee

	item = None
	if appointment_doc.practitioner and is_billable:
		default_price_list = frappe.db.get_value("Patient", appointment_doc.patient, "default_price_list")
		if appointment_doc.inpatient_record:
			item = frappe.db.get_value(
				"Healthcare Practitioner",
				appointment_doc.practitioner,
				"inpatient_visit_charge_item",
			)
		else:
			item = frappe.db.get_value(
				"Healthcare Practitioner",
				appointment_doc.practitioner,
				"op_consulting_charge_item",
			)
		if not item:
			item = frappe.db.get_single_value("Healthcare Settings", "op_consulting_charge_item")

		consultation_charge = frappe.db.get_value(
			"Item Price",
			{"item_code": item, "price_list": default_price_list, "selling": 1},
			"price_list_rate",
		)

		if not consultation_charge:
			item, consultation_charge = get_practitioner_billing_details(
				appointment_doc.practitioner, appointment_doc.inpatient_record
			)

	total_amount = consultation_charge + registration_fee

	paid_consultation_amount_details = (
		frappe.qb.from_(PE)
		.select(Sum(PE.paid_amount).as_("total_amount"), PE.posting_date)
		.where(PE.docstatus == 1)
		.where(PE.register_paid == 0)
		.where(PE.custom_reference_appointment == appointment)
	).run(as_dict=True)

	consultation_paid_amount = 0
	if paid_consultation_amount_details and paid_consultation_amount_details[0].get("total_amount"):
		consultation_paid_amount = paid_consultation_amount_details[0]["total_amount"]
		consultation_pay_date = paid_consultation_amount_details[0]["posting_date"]

	if consultation_paid_amount == 0 and appointment_doc.invoiced:
		consultation_paid_amount = consultation_charge

	return {
		"total_amount": total_amount,
		"consultation_charge": consultation_charge,
		"registration_fee": registration_fee,
		"consultation_paid_amount": consultation_paid_amount,
		"registration_paid_amount": registration_paid_amount,
		"balance_to_pay": total_amount - (consultation_paid_amount + registration_paid_amount),
		"consultation_item": item,
		"consultation_pay_date": consultation_pay_date,
		"registration_pay_date": registration_pay_date,
	}


@frappe.whitelist(allow_guest=True)
def get_mode_of_payments():
	return frappe.db.get_all("Mode of Payment", fields=["name as label", "name as value"])


# get therapy plan
@frappe.whitelist(allow_guest=True)
def get_therapy_plan(patient):
	patient = None if patient in ["undefined", "", "null"] else patient

	if not patient:
		return None

	therapy_plan = frappe.db.get_all(
		"Therapy Plan",
		filters={"patient": patient, "status": ["not in", ["Completed", "Cancelled"]]},
		fields=["name as label", "name as value", "start_date", "patient_name"],
	)

	if therapy_plan:
		for i in therapy_plan:
			if i.patient_name and i.start_date:
				i["label"] = f"{i.label} - {i.patient_name} - {i.start_date}"

	return therapy_plan


# get therapy type
@frappe.whitelist(allow_guest=True)
def get_therapy_type(patient, therapy_plan):
	patient = None if patient in undefined_conditions else patient
	therapy_plan = None if therapy_plan in undefined_conditions else therapy_plan

	if not patient:
		return None

	therapy_types = []
	if not therapy_plan:
		therapy_types = frappe.get_all("Therapy Type", fields=["name as label", "name as value"])
	else:
		doc = frappe.get_doc("Therapy Plan", therapy_plan)
		for entry in doc.therapy_plan_details:
			if entry.custom_booked_sessions > entry.sessions_completed:
				therapy_types.append({"label": entry.therapy_type, "value": entry.therapy_type})

	return therapy_types


# get_patient company data success and encounter
@frappe.whitelist(allow_guest=True)
def get_patient_data_for_services(appointment):
	patient_appointment = frappe.get_doc("Patient Appointment", appointment)

	company = patient_appointment.company
	customer = frappe.db.get_value("Patient", patient_appointment.patient, "customer")

	patient_encounters = frappe.db.get_all(
		"Medication Request",
		filters={
			"patient": patient_appointment.patient,
			"status": "active-Medication Request Status",
			"billing_status": ["!=", "Invoiced"],
		},
		fields=["order_group as label", "order_group as value"],
	)

	return {"company": company, "customer": customer, "patient_encounters": patient_encounters}


# Create healthcare services Sales invoice
@frappe.whitelist(allow_guest=True)
def create_services_sales_invoice(
	selected_services,
	company,
	patient,
	paid_amount,
	payments=None,
	use_advance_amount=False,
	customer_advance_amount=0,
	encounter=None,
):
	use_advance_amount = False if use_advance_amount in undefined_conditions else True
	customer_advance_amount = (
		0 if customer_advance_amount in undefined_conditions else flt(customer_advance_amount)
	)
	customer = frappe.db.get_value("Patient", patient, "customer")
	payments = None if payments in undefined_conditions else payments
	encounter = None if encounter in undefined_conditions else encounter
	enc_doc = {}
	if encounter:
		enc_doc = frappe.get_cached_doc("Patient Encounter", encounter)

	sales_invoice = frappe.new_doc("Sales Invoice")
	sales_invoice.patient = patient
	sales_invoice.customer = customer
	sales_invoice.due_date = getdate()
	sales_invoice.company = company
	sales_invoice.ref_practitioner = enc_doc.get("practitioner")
	sales_invoice.debit_to = get_receivable_account(company)
	sales_invoice.disable_rounded_total = 1

	for i in selected_services:
		item = {}
		if i.get("service") == "Registration Fee":
			item["item_name"] = i.get("service")
			item["description"] = i.get("service")
			item["income_account"] = get_income_account(None, company)
		else:
			item["item_code"] = i.get("service")
		item["cost_center"] = frappe.get_cached_value("Company", company, "cost_center")
		item["rate"] = flt(i.get("rate"))
		item["amount"] = flt(i.get("rate"))
		item["qty"] = flt(i.get("qty")) or 1
		item["reference_dt"] = i.get("reference_type")
		item["reference_dn"] = i.get("reference_name")
		sales_invoice.append("items", item)

	paid_amount = flt(paid_amount)

	if use_advance_amount:
		sales_invoice.allocate_advances_automatically = 1
	else:
		sales_invoice.allocate_advances_automatically = 0
	if payments:
		sales_invoice.is_pos = 1
		for pay in payments:
			payment = sales_invoice.append("payments", {})
			payment.mode_of_payment = pay.get("mode_of_payment")
			payment.amount = flt(pay.get("amount"))
			payment.reference_no = pay.get("ref_id")
			payment.clearance_date = getdate(pay.get("ref_date"))

	# sales_invoice.set_missing_values(for_validate=True)
	sales_invoice.flags.ignore_mandatory = True
	sales_invoice.save(ignore_permissions=True)
	sales_invoice.submit()

	frappe.db.commit()

	return sales_invoice.name


# get healthcare services list
@frappe.whitelist(allow_guest=True)
def get_service_list(patient, customer, company):
	all_services = []

	if (
		patient
		and not frappe.db.get_value("Patient", patient, "invoiced")
		and frappe.db.get_single_value("Healthcare Settings", "collect_registration_fee")
	):
		fee = frappe.db.get_single_value("Healthcare Settings", "registration_fee")
		all_services.append(
			{
				"reference_type": "Patient",
				"reference_name": patient,
				"service": "Registration Fee",
				"qty": 1,
				"rate": fee,
			}
		)
	services_to_invoice = get_healthcare_services_to_invoice(patient, customer, company)

	if services_to_invoice and len(services_to_invoice):
		all_services += services_to_invoice

	date_field_dict = {
		"Patient Appointment": "appointment_date",
		"Patient Encounter": "encounter_date",
		"Inpatient Record Item": "creation",
		"Inpatient Occupancy": "creation",
		"Therapy Plan": "start_date",
		"Therapy Session": "start_date",
		"Service Request": "order_date",
		"Observation": "posting_date",
		"Clinical Procedure": "start_date",
		"Lab Test": "date",
	}
	for item in all_services:
		price_list = frappe.db.get_value("Patient", patient, "default_price_list")
		uom = frappe.db.get_value("Item", item.get("service"), "stock_uom")
		args = {"price_list": price_list, "uom": uom}
		price = get_item_price(args, item.get("service"))
		if not item.get("qty"):
			item["qty"] = "1"
		else:
			item["qty"] = str(flt(item.get("qty"), 3))

		if not item.get("reference_type") == "Patient":
			item["rate"] = str(price[0].get("price_list_rate") if price and len(price) else 0)
			item["posting_date"] = format_date(
				getdate(
					frappe.db.get_value(
						item.get("reference_type"),
						item.get("reference_name"),
						date_field_dict[item.get("reference_type")],
					)
				),
				"dd-mm-yyyy",
			)
		else:
			item["posting_date"] = ""
			item["rate"] = str(item.get("rate"))

	return all_services


def get_therapy_session_rate_from_cost_counselling(session=None):
	if not session:
		return

	therapy_plan, therapy_type = frappe.db.get_value(
		"Therapy Session", session, ["therapy_plan", "therapy_type"]
	)
	if therapy_plan:
		therapy_plan_doc = frappe.get_doc("Therapy Plan", therapy_plan)
		for entry in therapy_plan_doc.therapy_plan_details:
			if entry.therapy_type == therapy_type:
				if frappe.db.exists("Cost Counselling Item", {"plan_item_ref": entry.name}):
					amount_with_discount, no_of_sessions = frappe.db.get_value(
						"Cost Counselling Item",
						{"plan_item_ref": entry.name},
						["amount_with_discount", "no_of_sessions"],
					)
					rate = amount_with_discount / no_of_sessions
					return rate
				else:
					return None


# def get_healthcare_services_to_invoice(patient, company):
# 	patient = frappe.get_doc("Patient", patient)
# 	items_to_invoice = []
# 	if patient:
# 		items_to_invoice += get_appointments_to_invoice(patient, company)
# 		items_to_invoice += get_encounters_to_invoice(patient, company)
# 		items_to_invoice += get_clinical_procedures_to_invoice(patient, company)
# 		items_to_invoice += get_inpatient_services_to_invoice(patient, company)
# 		items_to_invoice += get_therapy_sessions_to_invoice(patient, company)
# 		items_to_invoice += get_service_requests_to_invoice(patient, company)
# 		items_to_invoice += get_observations_to_invoice(patient, company)

# 		return items_to_invoice


def get_therapy_sessions_to_invoice(patient, company):
	therapy_sessions_to_invoice = []
	therapy_plans_created_from_template = frappe.db.get_all(
		"Therapy Plan", filters={"therapy_plan_template": ("!=", "")}, pluck="name"
	)

	therapy_sessions = frappe.get_list(
		"Therapy Session",
		fields="*",
		filters={
			"patient": patient.name,
			"invoiced": 0,
			"company": company,
			"therapy_plan": ("not in", therapy_plans_created_from_template),
			"docstatus": 1,
			"service_request": "",
		},
	)
	for therapy in therapy_sessions:
		if therapy.therapy_type and frappe.db.get_value("Therapy Type", therapy.therapy_type, "is_billable"):
			therapy_sessions_to_invoice.append(
				{
					"reference_type": "Therapy Session",
					"reference_name": therapy.name,
					"service": frappe.db.get_value("Therapy Type", therapy.therapy_type, "item"),
				}
			)

	return therapy_sessions_to_invoice


@frappe.whitelist()
def get_service_requests_to_invoice(patient, company):
	price_list = frappe.db.get_value("Patient", patient.name, "default_price_list")
	orders_to_invoice = []
	service_requests = frappe.db.get_all(
		"Service Request",
		fields=["*"],
		filters={
			"patient": patient.name,
			"company": company,
			"billing_status": ["!=", "Invoiced"],
			"docstatus": 1,
			"template_dt": ["!=", "Therapy Type"],
		},
	)
	for service_request in service_requests:
		item, is_billable, rate = frappe.get_cached_value(
			service_request.template_dt,
			service_request.template_dn,
			["item", "is_billable", "rate"],
		)

		uom = frappe.db.get_value("Item", item, "stock_uom")
		args = {"price_list": price_list, "uom": uom}
		price = get_item_price(args, item)
		if is_billable:
			orders_to_invoice.append(
				{
					"reference_type": "Service Request",
					"reference_name": service_request.name,
					"service": item,
					"qty": service_request.quantity if service_request.quantity else 1,
					"posting_date": service_request.order_date,
					"rate": price[0].get("price_list_rate") if price and len(price) else rate,
				}
			)

	return orders_to_invoice


# get prescription
@frappe.whitelist(allow_guest=True)
def get_prescriptions(encounter, customer):
	prescription_to_invoice = get_drugs_to_invoice(encounter, customer)

	for item in prescription_to_invoice:
		patient, date = frappe.db.get_value(
			"Medication Request", item.get("reference_name"), ["patient", "order_date"]
		)
		price_list = frappe.db.get_value("Patient", patient, "default_price_list")
		uom = frappe.db.get_value("Item", item.get("drug_code"), "stock_uom")
		args = {"price_list": price_list, "uom": uom}
		price = get_item_price(args, item.get("drug_code"))

		item["quantity"] = str(item.get("quantity"))
		item["posting_date"] = format_date(getdate(date), "dd-mm-yyyy")
		item["rate"] = str(price[0].get("price_list_rate") if price and len(price) else 0)

	return prescription_to_invoice


@frappe.whitelist(allow_guest=True)
def create_prescription_sales_invoice(
	selected_prescriptions,
	company,
	patient,
	customer,
	paid_amount,
	mode_of_payment="Cash",
):
	sales_invoice = frappe.new_doc("Sales Invoice")
	sales_invoice.patient = patient
	sales_invoice.customer = customer
	sales_invoice.due_date = getdate()
	sales_invoice.company = company
	sales_invoice.debit_to = get_receivable_account(company)

	# item = sales_invoice.append("items", {})
	for i in selected_prescriptions:
		item = {}
		item["item_code"] = i.get("drug_code")
		item["cost_center"] = frappe.get_cached_value("Company", company, "cost_center")
		item["rate"] = flt(i.get("rate"))
		item["amount"] = flt(i.get("rate"))
		item["qty"] = flt(i.get("quantity")) or 1
		item["reference_dt"] = i.get("reference_type")
		item["reference_dn"] = i.get("reference_name")
		sales_invoice.append("items", item)

	paid_amount = flt(paid_amount)

	# Add payments if payment details are supplied else proceed to create invoice as Unpaid
	if mode_of_payment and paid_amount:
		sales_invoice.is_pos = 1
		payment = sales_invoice.append("payments", {})
		payment.mode_of_payment = mode_of_payment
		payment.amount = paid_amount

	sales_invoice.set_missing_values(for_validate=True)
	sales_invoice.flags.ignore_mandatory = True
	sales_invoice.save(ignore_permissions=True)
	sales_invoice.submit()

	return sales_invoice.name


# users  and roles
@frappe.whitelist(allow_guest=True)
def get_user_role():
	user = frappe.session.user
	roles = frappe.get_roles(user)

	return {"user": user, "roles": roles}


# status
@frappe.whitelist(allow_guest=True)
def set_status(id, status):
	appointment = frappe.get_doc("Patient Appointment", id)
	if status == "Checked In":
		service_unit = frappe.db.get_value("Medical Department", appointment.department, "service_unit")

		message = check_and_insert_token(
			"Patient Appointment",
			id,
			appointment.patient,
			appointment,
			service_unit,
		)
		if message:
			return message
	else:
		update_status(id, status)
		return {"message": f"Patient {appointment.patient_name} has {status} Appointment {id}"}


# Patient Encounter Routing
@frappe.whitelist(allow_guest=True)
def make_encounter(appointment):
	if not appointment:
		return
	exist = frappe.db.exists("Patient Encounter", {"appointment": appointment})
	enc_name = None
	if not exist:
		appointment = frappe.get_doc("Patient Appointment", appointment)
		encounter = frappe.new_doc("Patient Encounter")
		encounter.appointment = appointment.name
		encounter.patient = appointment.patient
		encounter.practitioner = appointment.practitioner
		encounter.appointment_type = appointment.appointment_type
		encounter.encounter_date = getdate()
		encounter.insert(ignore_permissions=True)
		frappe.db.commit()
		enc_name = frappe.get_doc("Patient Encounter", encounter.name)
		return {"success": True, "encounter": enc_name}
	else:
		enc_name = frappe.get_doc("Patient Encounter", exist)
		return {"success": True, "encounter": enc_name}


# new patient appointment
@frappe.whitelist(allow_guest=True)
def patient_appointment(from_kiosk=True):
	new_appointment = frappe.new_doc("Patient Appointment")
	default_appointment_type = frappe.db.get_single_value(
		"Marley Frontend Settings", "default_appointment_type"
	)
	if from_kiosk:
		new_appointment.appointment_type = default_appointment_type
	else:
		new_appointment.appointment_type = (
			frappe.form_dict.get("appointment_type") or default_appointment_type
		)
	new_appointment.appointment_for = frappe.db.get_value(
		"Appointment Type", new_appointment.appointment_type, "allow_booking_for"
	)
	company = frappe.defaults.get_user_default("company")
	if not company:
		company = frappe.db.get_single_value("Global Defaults", "default_company")
	new_appointment.company = company

	new_appointment.patient = frappe.form_dict.get("patient")

	practitioner = frappe.get_doc("Healthcare Practitioner", frappe.form_dict.get("practitioner"))
	new_appointment.practitioner = practitioner.name
	new_appointment.department = practitioner.department
	new_appointment.appointment_date = frappe.form_dict.get("date") or frappe.form_dict.get("daterangevalue")
	new_appointment.appointment_time = frappe.form_dict.get("slot")

	date = frappe.utils.getdate(frappe.form_dict.get("date"))
	weekday = date.strftime("%A")
	for schedule_entry in practitioner.practitioner_schedules:
		practitioner_schedule = frappe.get_doc("Practitioner Schedule", schedule_entry.schedule)
		service_unit = frappe.db.get_value("Healthcare Service Unit", schedule_entry.service_unit, "name")

		if practitioner_schedule and not practitioner_schedule.disabled:
			available_slots = []
			for time_slot in practitioner_schedule.time_slots:
				if weekday == time_slot.day:
					time = datetime.min + time_slot.from_time
					time = time.time()
					available_slots.append(time.strftime("%H:%M"))

		if frappe.form_dict.get("slot") in available_slots:
			break

	new_appointment.service_unit = service_unit

	practitioner_service = get_appointment_billing_item_and_rate(new_appointment)
	new_appointment.billing_item = practitioner_service["service_item"]
	new_appointment.paid_amount = practitioner_service["practitioner_charge"]

	new_appointment.save(ignore_permissions=True)
	frappe.publish_realtime("reload_waitlist")
	frappe.publish_realtime("reload_practitioner_screen")

	return {"status": "success", "appointment": new_appointment.name}


@frappe.whitelist(allow_guest=True)
def update_patient():
	patient = frappe.get_doc("Patient", frappe.form_dict.get("patient"))

	patient.first_name = frappe.form_dict.get("firstname")
	patient.last_name = frappe.form_dict.get("lastname")
	patient.sex = frappe.form_dict.get("gender")
	patient.dob = frappe.form_dict.get("dob")
	patient.mobile = frappe.form_dict.get("mobile")
	patient.address_line1 = frappe.form_dict.get("address1")
	patient.address_line2 = frappe.form_dict.get("address2")
	patient.city = frappe.form_dict.get("city")
	patient.state = frappe.form_dict.get("state")
	patient.zip_code = frappe.form_dict.get("zip")
	patient.marital_status = frappe.form_dict.get("marital")

	patient.save(ignore_permissions=True)

	return "success"


@frappe.whitelist(allow_guest=True)
def get_current_patient_data(patient):
	patient = None if patient in undefined_conditions else patient

	patient_doc = frappe.get_doc("Patient", patient)
	profile_completed = None
	if (
		patient_doc.first_name
		and patient_doc.sex
		and patient_doc.mobile
		and patient_doc.dob
		and patient_doc.address_line1
		and patient_doc.zip_code
		and patient_doc.city
		and patient_doc.state
		and patient_doc.marital_status
	):
		profile_completed = True

	return {"doc": patient_doc, "profile_completed": profile_completed}


@frappe.whitelist(allow_guest=True)
def new_error_log(error_title, error_message):
	if error_message:
		frappe.log_error(message=error_message, title=error_title)
		return {"message": "Error Log created"}


@frappe.whitelist()
def get_boarding_pass_print_format():
	print_format = frappe.db.get_single_value("Marley Frontend Settings", "default_boarding_pass_print")

	return print_format if print_format else False


# consultation payment print format
@frappe.whitelist()
def get_consultation_payment_entry_print_format():
	print_format = frappe.db.get_single_value("Marley Frontend Settings", "default_payment_entry_print")

	return print_format if print_format else False


@frappe.whitelist()
def fetch_mode_type(mode):
	mode = None if mode in ["", "null", "undefined"] else mode

	if not mode:
		return ""

	mode_type = frappe.db.get_value("Mode of Payment", mode, "type")

	is_bank = True if mode_type == "Bank" else False

	return {"mode_type": mode_type, "is_bank": is_bank}


# get default appointment type
@frappe.whitelist(allow_guest=True)
def get_default_appointment():
	return frappe.db.get_single_value("Marley Frontend Settings", "default_appointment_type")


def check_is_billable(appointment):
	if not appointment:
		frappe.throw("Check with valid appointment")

	is_billable = False
	fee_validity = check_fee_validity(appointment)

	if fee_validity:
		if fee_validity.patient_appointment == appointment.name and not appointment.invoiced:
			is_billable = True
		else:
			validity = get_fee_validity(appointment.name, appointment.appointment_date, ignore_status=True)
			if not validity:
				is_billable = True
	else:
		is_billable = True

	return is_billable
