import base64
import json
from datetime import datetime, timedelta

import frappe
import frappe.utils
from frappe.core.doctype.sms_settings.sms_settings import send_sms
from frappe.utils import format_date, get_date_str, get_time, getdate, nowtime

from erpnext import get_default_company
from erpnext.setup.doctype.employee.employee import is_holiday

from healthcare.healthcare.doctype.patient_appointment.patient_appointment import (
	check_employee_wise_availability,
)
from healthcare.healthcare.utils import get_appointment_billing_item_and_rate

from marley_frontend.marley_frontend.doctype.patient_token.patient_token import (
	insert_token,
)

undefined_conditions = ["null", "", "undefined", "false", False, "[]", []]


@frappe.whitelist()
def patient_registration(file=None):
	country = frappe.form_dict.get("country") or None
	invite_user = frappe.form_dict.get("invite_user")

	new_patient = frappe.new_doc("Patient")
	new_patient.first_name = frappe.form_dict.get("first_name")
	new_patient.last_name = frappe.form_dict.get("last_name")
	new_patient.sex = frappe.form_dict.get("gender")
	new_patient.email = frappe.form_dict.get("email")
	new_patient.invite_user = invite_user if invite_user else False
	new_patient.mobile = frappe.form_dict.get("mobile")
	new_patient.country = country
	new_patient.dob = frappe.form_dict.get("dob")
	new_patient.marital_status = frappe.form_dict.get("marital")
	new_patient.address_line1 = frappe.form_dict.get("address1")
	new_patient.city = frappe.form_dict.get("city")
	new_patient.address_line2 = frappe.form_dict.get("address2")
	new_patient.city = frappe.form_dict.get("city")
	new_patient.state = frappe.form_dict.get("state")
	new_patient.zip_code = frappe.form_dict.get("zip")
	new_patient.save(ignore_permissions=True)

	_file = None
	if new_patient.get("name") and file:
		base64_data = file.split(",")[1]
		image = base64.b64decode(base64_data)

		_file = frappe.get_doc(
			{
				"doctype": "File",
				"file_name": f"{new_patient.name}_profile_image.png",
				"attached_to_doctype": "Patient",
				"attached_to_name": new_patient.name,
				"attached_to_field": "image",
				"is_private": 0,
				"content": image,
			}
		)
		_file.insert(ignore_permissions=True)
		frappe.db.commit()

	return {"status": "success", "patient_id": new_patient.name, "file": _file.name if _file else ""}


@frappe.whitelist()
def get_slots(date, practitioner):
	practitioner_doc = frappe.get_doc("Healthcare Practitioner", {"practitioner_name": practitioner})

	date = getdate(date)
	weekday = date.strftime("%A")

	check_employee_wise_availability(date, practitioner_doc)

	if practitioner_doc.practitioner_schedules:
		available_slots = []
		for schedule_entry in practitioner_doc.practitioner_schedules:
			if schedule_entry.service_unit:
				booked_slots = []
				allow_overlap = 0
				# fetch all appointments to practitioner by service unit
				filters = {
					"practitioner": practitioner_doc.name,
					"service_unit": schedule_entry.service_unit,
					"appointment_date": date,
					"status": ["not in", ["Cancelled"]],
				}

				allow_overlap = frappe.db.get_value(
					"Healthcare Service Unit",
					schedule_entry.service_unit,
					"overlap_appointments",
				)
				if not allow_overlap:
					# fetch all appointments to service unit
					filters.pop("practitioner")

				booked_slots = frappe.db.get_all(
					"Patient Appointment", filters=filters, pluck="appointment_time"
				)

				practitioner_schedule = frappe.get_doc("Practitioner Schedule", schedule_entry.schedule)
				if practitioner_schedule and not practitioner_schedule.disabled:
					for time_slot in practitioner_schedule.time_slots:
						if weekday == time_slot.day:
							hours, remainder = divmod(time_slot.from_time.total_seconds(), 3600)
							minutes, seconds = divmod(remainder, 60)
							time_value = f"{int(hours):01}:{int(minutes):02}"
							if (
								date == getdate()
								and get_time(nowtime()) < get_time(time_slot.from_time)
								and time_slot.from_time not in booked_slots
							):
								available_slots.append(time_value)
							elif date > getdate() and time_slot.from_time not in booked_slots:
								available_slots.append(time_value)
	else:
		return {"status": "no slots"}

	return {"status": "success", "slots": list(sorted(available_slots))}


def get_slot_position(appointment_id=None):
	slot_list = []
	date = getdate()
	weekday = date.strftime("%A")
	if not appointment_id:
		return {"status": "No Appointment"}
	practitioner = frappe.get_value(
		"Patient Appointment", appointment_id, ["practitioner", "appointment_time"], as_dict=True
	)
	practitioner_doc = frappe.get_doc("Healthcare Practitioner", practitioner.practitioner)

	if practitioner_doc.practitioner_schedules:
		for schedule_entry in practitioner_doc.practitioner_schedules:
			if schedule_entry.service_unit:
				practitioner_schedule = frappe.get_doc("Practitioner Schedule", schedule_entry.schedule)
				if practitioner_schedule and not practitioner_schedule.disabled:
					for time_slot in practitioner_schedule.time_slots:
						if weekday == time_slot.day:
							hours, remainder = divmod(time_slot.from_time.total_seconds(), 3600)
							minutes, seconds = divmod(remainder, 60)
							time_value = f"{int(hours):01}:{int(minutes):02}:{int(seconds):02}"
							slot_list.append(time_value)
		slot_position = slot_list.index(str(practitioner.appointment_time)) + 1
		return slot_position
	else:
		return {"status": "no slots"}


@frappe.whitelist()
def get_slots_by_date_range(practitioner=None, start_date=None, end_date=None):
	if not practitioner or not start_date or not end_date:
		return {
			"status": "error",
			"message": "Practitioner, start_date, and end_date are required",
		}

	try:
		practitioner_doc = frappe.get_doc("Healthcare Practitioner", {"practitioner_name": practitioner})
		start_date = frappe.utils.getdate(start_date)
		end_date = frappe.utils.getdate(end_date)

		def fetch_slots_for_date(date):
			curr_bookings = frappe.get_all(
				"Patient Appointment",
				filters={
					"practitioner": practitioner_doc.name,
					"appointment_date": date,
				},
				pluck="appointment_time",
			)
			booked_slots = [(datetime.min + booked_slot).time() for booked_slot in curr_bookings]

			full_slots = []
			weekday = date.strftime("%A")

			for schedule_entry in practitioner_doc.practitioner_schedules:
				practitioner_schedule = frappe.get_doc("Practitioner Schedule", schedule_entry.schedule)

				if practitioner_schedule and not practitioner_schedule.disabled:
					available_slots = []
					for time_slot in practitioner_schedule.time_slots:
						if weekday == time_slot.day:
							time = datetime.min + time_slot.from_time
							time = time.time()
							if time not in booked_slots:
								available_slots.append(time.strftime("%H:%M"))
					full_slots.extend(available_slots)

			return {"date": date.strftime("%Y-%m-%d"), "slots": sorted(full_slots)}

		# Loop through date range and fetch slots)
		days = []
		current_date = start_date
		while current_date <= end_date:
			days.append(fetch_slots_for_date(current_date))
			current_date += timedelta(days=1)

		return {"status": "success", "days": days}

	except Exception as e:
		if not isinstance(e, str):
			e = str(e)

		frappe.log_error(f"Error in get_slots_by_date_range: {e}", "Get Slots by Date Range API")
		return {"status": "error", "message": str(e)}


@frappe.whitelist()
def patient_appointment(from_kiosk=True):
	new_appointment = frappe.new_doc("Patient Appointment")
	if from_kiosk:
		new_appointment.appointment_type = frappe.db.get_single_value(
			"Marley Frontend Settings", "default_appointment_type"
		)
	else:
		new_appointment.appointment_type = frappe.form_dict.get("appointment_type")
	new_appointment.appointment_for = frappe.db.get_value(
		"Appointment Type", new_appointment.appointment_type, "allow_booking_for"
	)
	company = frappe.defaults.get_user_default("company")
	if not company:
		company = frappe.db.get_single_value("Global Defaults", "default_company")
	new_appointment.company = company

	if from_kiosk:
		patient = frappe.get_doc("Patient", frappe.form_dict.get("patient"))
	else:
		patient = frappe.get_doc("Patient", {"patient_name": frappe.form_dict.get("patient")})
	new_appointment.patient = patient.name
	practitioner = frappe.get_doc(
		"Healthcare Practitioner",
		{"practitioner_name": frappe.form_dict.get("practitioner")},
	)
	new_appointment.practitioner = practitioner.name
	new_appointment.department = practitioner.department
	new_appointment.appointment_date = frappe.form_dict.get("date") or frappe.form_dict.get("daterangevalue")
	new_appointment.appointment_time = frappe.form_dict.get("slot")

	date = frappe.utils.getdate(frappe.form_dict.get("date"))
	weekday = date.strftime("%A")
	for schedule_entry in practitioner.practitioner_schedules:
		# 		validate_practitioner_schedules(schedule_entry, practitioner)
		practitioner_schedule = frappe.get_doc("Practitioner Schedule", schedule_entry.schedule)
		service_unit = frappe.db.get_value("Healthcare Service Unit", schedule_entry.service_unit, "name")

		if practitioner_schedule and not practitioner_schedule.disabled:
			available_slots = []
			for time_slot in practitioner_schedule.time_slots:
				if weekday == time_slot.day:
					# convert timedelta object to datetime object using a fixed base
					time = datetime.min + time_slot.from_time
					# extracting just the time out of the datetime object
					time = time.time()
					available_slots.append(time.strftime("%H:%M"))

		if frappe.form_dict.get("slot") in available_slots:
			break

	new_appointment.service_unit = service_unit

	practitioner_service = get_appointment_billing_item_and_rate(new_appointment)
	new_appointment.billing_item = practitioner_service["service_item"]
	new_appointment.paid_amount = practitioner_service["practitioner_charge"]

	new_appointment.save(ignore_permissions=True)

	return {"status": "success", "appointment": new_appointment.name}


@frappe.whitelist()
def get_departments():
	practitioners = []
	departments = []
	default_appointment_type = (
		frappe.db.get_single_value("Marley Frontend Settings", "default_appointment_type") or None
	)

	for name in frappe.db.get_all("Healthcare Practitioner", fields=["practitioner_name", "image"]):
		practitioners.append(
			{
				"label": name.practitioner_name,
				"value": name.practitioner_name,
				"image": name.image,
			}
		)

	for dept in frappe.db.get_all("Medical Department", pluck="name"):
		departments.append({"label": dept, "value": dept})

	return {
		"practitioners": practitioners,
		"departments": departments,
		"defAppType": default_appointment_type,
	}


@frappe.whitelist()
def get_patient(patient_id):
	if not patient_id:
		return {"error": "Enter a valid details"}

	token_exists = frappe.db.exists("Patient Token", patient_id)
	if patient_id and frappe.db.exists("Patient", {"mobile": patient_id}):
		patients = frappe.db.get_all(
			"Patient", filters={"mobile": patient_id}, fields={"name", "patient_name"}
		)

		if patients:
			return {"status": "success", "patients": patients}
	elif token_exists:
		return {"status": "success", "token": token_exists}
	else:
		return {"error": "No patient found for given number"}


@frappe.whitelist()
def get_patient_name(patient_id=None):
	exists = frappe.db.exists("Patient", patient_id)
	if patient_id and exists:
		patient_name = frappe.db.get_value("Patient", patient_id, "patient_name")

		return {"patient": patient_id, "patient_name": patient_name}
	elif patient_id and not exists:
		token_exists = frappe.db.exists("Patient Token", patient_id)
		if token_exists:
			patient = frappe.db.get_value("Patient Token", patient_id, "patient")
			patient_name = frappe.db.get_value("Patient", patient, "patient_name")

			return {"patient": patient, "patient_name": patient_name}
		else:
			return {"error": f"No patient found for given number/ID - {patient_id}"}
	else:
		return {"error": f"No patient found for given number/ID - {patient_id}"}


@frappe.whitelist()
def get_gender():
	genders = []
	countries = []
	gender_list = frappe.db.get_all("Gender", pluck="name", order_by="name ASC")
	country_list = frappe.db.get_all("Country", pluck="name", order_by="name ASC")
	for gender in gender_list:
		genders.append({"label": gender, "value": gender})
	for country in country_list:
		countries.append({"label": country, "value": country})
	return {"genders": genders, "countries": countries, "gender_list": gender_list}


@frappe.whitelist()
def get_practitioners():
	practitioners = []
	for name in frappe.db.get_all(
		"Healthcare Practitioner",
		filters={"department": frappe.form_dict.get("department")},
		pluck="practitioner_name",
	):
		practitioners.append({"label": name, "value": name})
	for name in frappe.db.get_all(
		"Healthcare Practitioner",
		filters={"department": frappe.form_dict.get("department2")},
		pluck="practitioner_name",
	):
		practitioners.append({"label": name, "value": name})
	return {"practitioners": practitioners}


@frappe.whitelist()
def get_patients():
	patients = []
	for name in frappe.db.get_all("Patient", pluck="patient_name"):
		patients.append({"label": name, "value": name})
	return {"patients": patients}


@frappe.whitelist()
def get_appointment(practitioner=None, appointment_date=None, appointment_type=None, search_by=None):
	practitioner = None if practitioner in undefined_conditions else practitioner
	search_by = None if search_by in undefined_conditions else search_by
	appointment_date = getdate() if appointment_date in undefined_conditions else getdate(appointment_date)
	appointments = []
	search_options = []
	filters = {}
	if practitioner:
		filters["practitioner_name"] = practitioner
	if appointment_type:
		filters["appointment_type"] = appointment_type
	if search_by:
		filters["name"] = search_by

	appointment_data = frappe.db.get_all(
		"Patient Appointment",
		filters=filters,
		fields=[
			"name",
			"patient_name",
			"practitioner_name",
			"service_unit",
			"appointment_time",
			"status",
			"patient",
		],
		as_list=False,
	)
	for appointment in appointment_data:
		patient_data = frappe.get_value("Patient", appointment.patient, "mobile")
		mobile_number = patient_data if patient_data else "Not Available"

		appointments.append(
			{
				"id": appointment["name"],
				"name": appointment["patient_name"],
				"time": appointment["appointment_time"],
				"practitioner": appointment["practitioner_name"],
				"service": appointment["service_unit"],
				"status": appointment["status"],
				"mobile": mobile_number,
			}
		)
		search_options.append({"label": appointment["name"], "value": appointment["name"]})
	return {"appointments": appointments, "search_options": search_options}


@frappe.whitelist()
def create_vitalsigns():
	patient = frappe.form_dict.get("patient")
	appointment = frappe.form_dict.get("appointment")

	if not patient:
		return {"status": "error", "message": "Patient is required"}

	existing_vital = frappe.db.exists("Vital Signs", {"patient": patient, "appointment": appointment})

	if existing_vital:
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
		frappe.db.commit()
	else:
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
		frappe.db.commit()

	return {"status": "success", "id": new_vital.patient}


@frappe.whitelist()
def get_all_appointments(patient_id=None, token=None):
	token = None if token in undefined_conditions else token
	if token:
		appointment = frappe.db.get_value(
			"Patient Appointment",
			{"patient_token": token},
			["name", "appointment_date", "patient"],
			as_dict=True,
		)
		if appointment:
			token_number = frappe.db.get_value("Patient Token", token, "token_number")
			if getdate(appointment.get("appointment_date")) < getdate():
				return {
					"Token Not Exist": f"The Token number {token_number} has been expired. Appointment ID: {appointment.get('name')}"
				}
			elif getdate(appointment.get("appointment_date")) > getdate():
				return {
					"Token Not Exist": f"The Token number {token_number} for the Appointment {appointment.get('name')} is not booked for today. Date of appointment is {format_date(appointment.get('appointment_date'), 'dd-mm-yyyy')}"
				}
			else:
				return {
					"appointment": appointment["name"],
					"date": appointment["appointment_date"],
					"patient": appointment["patient"],
				}
		else:
			return {"Token Not Exist": f"No appointment exists for token {token}"}

	appointments = frappe.db.get_all(
		"Patient Appointment",
		filters={
			"patient": patient_id,
			"appointment_date": getdate(),
			"status": ["!=", "Cancelled", "Closed"],
		},
		fields=["name", "practitioner_name", "appointment_date", "appointment_time", "service_unit"],
	)

	if len(appointments) > 1:
		return {"appointment_list": appointments}
	elif len(appointments) == 1:
		return {"appointment": appointments[0]["name"], "date": appointments[0]["appointment_date"]}
	else:
		return {"Error": "No Appointments Today"}


@frappe.whitelist()
def check_appointment(patient_id, appointment_id=None):
	patient_id = None if patient_id in undefined_conditions else patient_id
	appointment_id = None if appointment_id in undefined_conditions else appointment_id

	appointment = None
	if patient_id:
		if not appointment_id:
			appointment = frappe.db.get_value(
				"Patient Appointment",
				{
					"patient": patient_id,
					"appointment_date": getdate(),
					"status": ["!=", "Cancelled"],
				},
				["*"],
				as_dict=True,
			)
		else:
			appointment = frappe.get_doc("Patient Appointment", appointment_id)

		if appointment:
			vitals_service_unit = frappe.db.get_value(
				"Medical Department", appointment.department, "service_unit"
			)
			vitals_su_name = frappe.db.get_value(
				"Healthcare Service Unit",
				vitals_service_unit,
				"healthcare_service_unit_name",
			)
			vitals_queue_exists = frappe.db.exists(
				"Queue Assignment",
				{"service_unit": vitals_service_unit, "status": "Active"},
			)
			logged_in_user_queue = frappe.db.get_value(
				"Queue Assignment",
				{"user": frappe.session.user, "status": "Active"},
				"service_unit",
			)
			appointment_queue = frappe.db.exists(
				"Queue Assignment",
				{"service_unit": appointment.service_unit, "status": "Active"},
			)

			# validate and insert token
			kiosk_user = frappe.db.exists(
				"Has Role",
				{
					"parenttype": "User",
					"parent": frappe.session.user,
					"role": "Kiosk User",
				},
			)
			if kiosk_user:
				submitted_vitals = frappe.db.exists(
					"Vital Signs",
					{
						"patient": patient_id,
						"signs_date": getdate(),
						"docstatus": 1,
					},
				)
				if submitted_vitals:
					# checkin to appointment serrvice unit
					if not appointment_queue:
						return {
							"alert": f'No active queue for service unit {frappe.db.get_value("Healthcare Service Unit", appointment.service_unit, "healthcare_service_unit_name")}'
						}
					message = check_and_insert_token(
						"Patient Appointment",
						appointment.name,
						patient_id,
						appointment,
						appointment.service_unit,
					)
					return message
				else:
					# check in to vitals queue (check queue exist: already in the queue go to queue, )
					if not vitals_queue_exists:
						return {"alert": f"No active queue for service unit {frappe.bold(vitals_su_name)}"}

					message = check_and_insert_token(
						"Patient Appointment",
						appointment.name,
						patient_id,
						appointment,
						vitals_service_unit,
					)
					return message
			else:
				if not logged_in_user_queue:
					return {
						"alert": f"No active queue for logged in user {frappe.session.user}, Please checkin to a queue and try again"
					}

				message = check_and_insert_token(
					"Patient Appointment",
					appointment.name,
					patient_id,
					appointment,
					logged_in_user_queue,
				)
				return message
		else:
			return {"message": "You have no Appointments today"}
	else:
		return {"message": "No patient found for this number"}


@frappe.whitelist()
def get_vitals(appointment):
	if not appointment:
		return

	vital = frappe.db.exists("Vital Signs", {"appointment": appointment})
	if vital:
		return frappe.get_doc("Vital Signs", vital)
	return


@frappe.whitelist()
def get_tokens(service_unit=None):
	slot_based_token = frappe.db.get_value("Healthcare Service Unit", service_unit, "custom_slot_based_token")

	limit_value = frappe.db.get_single_value("Healthcare Settings", "token_limit")
	if not limit_value:
		limit_value = 3

	date = getdate()
	weekday = date.strftime("%A")
	time = get_time(nowtime())

	# Modify the query to use the variable for the LIMIT
	query = f"""
		SELECT
			pt.token_number AS token_no,
			pjs.status AS status,
			pjs.service_unit AS service_unit
		FROM
			`tabPatient Journey Stop` AS pjs LEFT JOIN
			`tabPatient Token` AS pt ON pjs.parent=pt.name
		WHERE
			pjs.service_unit={frappe.db.escape(service_unit)} AND
			pjs.status IN ('In Progress', 'Checked In') AND
			pt.status!='Expired' AND
			DATE(pt.posting_date)=DATE({frappe.db.escape(get_date_str(date))})
		ORDER BY
			CASE WHEN {slot_based_token}=1 THEN pt.slot_position ELSE pjs.check_in_time END ASC
		LIMIT {limit_value}
	"""

	results = frappe.db.sql(query, as_dict=True)

	practitioner_query = f"""
		SELECT
			hp.practitioner_name
		FROM
			`tabPractitioner Service Unit Schedule` as psu LEFT JOIN
			`tabHealthcare Schedule Time Slot` AS ts on ts.parent=psu.schedule LEFT JOIN
			`tabHealthcare Practitioner` as hp on hp.name=psu.parent
		WHERE
			psu.service_unit={frappe.db.escape(service_unit)} AND
			ts.day={frappe.db.escape(weekday)} AND
			({frappe.db.escape(get_date_str(time))} BETWEEN ts.from_time AND ts.to_time)
	"""

	practitioners = frappe.db.sql(practitioner_query, as_dict=True)

	if practitioners and len(practitioners) > 0:
		practitioner = practitioners[0]["practitioner_name"]
	else:
		practitioner = ""

	return {
		"results": results,
		"practitioner": practitioner,
		"number_of_rows": limit_value,
		"service_unit_name": frappe.db.get_value(
			"Healthcare Service Unit", service_unit, "healthcare_service_unit_name"
		),
	}


@frappe.whitelist()
def trigger_call(token, service_unit):
	service_unit_name = frappe.get_value(
		"Healthcare Service Unit", service_unit, "healthcare_service_unit_name"
	)
	frappe.publish_realtime(
		"call", {"token_number": token, "service_unit": service_unit, "service_unit_name": service_unit_name}
	)


@frappe.whitelist()
def check_vitals(patient):
	draft = frappe.db.exists("Vital Signs", {"patient": patient, "signs_date": getdate(), "docstatus": 0})
	if draft:
		return draft
	return


@frappe.whitelist()
def new_error_log(error_title, error_message):
	if error_message:
		frappe.log_error(message=error_message, title=error_title)
		return {"message": "Error Log created"}


@frappe.whitelist()
def get_file():
	files = frappe.db.get_all(
		"TV Screen Advertisement",
		filters={"enabled": True, "from_date": ["is", "set"], "to_date": ["is", "set"]},
		fields=["from_date", "to_date", "file"],
	)
	if len(files) != 0:
		for file in files:
			if file["from_date"] <= getdate() <= file["to_date"]:
				return file["file"]
	elif frappe.db.exists("TV Screen Advertisement", {"default": True, "enabled": True}):
		return frappe.db.get_value("TV Screen Advertisement", {"default": True}, "file")
	return None


@frappe.whitelist()
def get_practitioner_charge(practitioner, appointment=None):
	practitioner_charge = None
	registration_fee = None
	total_amount = 0

	if appointment:
		patient = frappe.db.get_value("Patient Appointment", appointment, "patient")
		if frappe.db.get_single_value("Healthcare Settings", "collect_registration_fee"):
			if patient:
				invoiced = frappe.db.get_value("Patient", patient, "invoiced")
				payment_entry_created = frappe.db.get_value("Patient", patient, "payment_entry_created")
				if not invoiced and not payment_entry_created:
					registration_fee = frappe.db.get_single_value("Healthcare Settings", "registration_fee")
					total_amount += registration_fee if registration_fee else 0

		if practitioner:
			default_price_list = frappe.db.get_value("Patient", patient, "default_price_list")
			exists = frappe.db.exists("Healthcare Practitioner", {"practitioner_name": practitioner})
			if not exists:
				exists = frappe.db.exists("Healthcare Practitioner", practitioner)

			if exists:
				item = frappe.db.get_value("Healthcare Practitioner", exists, "op_consulting_charge_item")
				if not item:
					item = frappe.db.get_single_value("Healthcare Settings", "op_consulting_charge_item")

				practitioner_charge = frappe.db.get_value(
					"Item Price",
					{"item_code": item, "price_list": default_price_list, "selling": 1},
					"price_list_rate",
				)
				if not practitioner_charge:
					practitioner_charge = frappe.db.get_value(
						"Healthcare Practitioner", exists, "op_consulting_charge"
					)

				total_amount += practitioner_charge if practitioner_charge else 0

	return {
		"practitioner_charge": practitioner_charge,
		"registration_fee": registration_fee,
		"total_amount": total_amount,
	}


def check_and_insert_token(ref_doc, docname, patient, appointment, service_unit=None):
	active_token = frappe.db.exists(
		"Patient Token",
		{
			"patient": patient,
			"status": ["in", ["Checked In", "Active"]],
			"reference_dn": docname,
		},
	)

	vitals_exist = frappe.db.exists(
		"Vital Signs",
		{
			"patient": patient,
			"signs_date": appointment.appointment_date,
			"docstatus": ["!=", 2],
			"appointment": ["!=", appointment.name],
		},
	)
	vitals_service_unit = frappe.db.get_value("Medical Department", appointment.department, "service_unit")
	if not active_token and not vitals_exist:
		if not vitals_service_unit:
			dept_name = frappe.db.get_value("Medical Department", appointment.department, "name")
			return {
				"alert": f"No Vitals Service Unit configured for department {dept_name}. Please set it in Medical Department"
			}
		vitals_queue_exists = frappe.db.exists(
			"Queue Assignment", {"service_unit": vitals_service_unit, "status": "Active"}
		)
		if not vitals_queue_exists:
			su_name = frappe.db.get_value(
				"Healthcare Service Unit", vitals_service_unit, "healthcare_service_unit_name"
			)
			return {
				"alert": f"No active queue for vitals service unit {su_name}. Please create a Queue Assignment first"
			}
		service_unit = vitals_service_unit
	else:
		active_journey_stops = frappe.db.get_all(
			"Patient Journey Stop",
			filters={
				"parent": active_token,
				"parentfield": "patient_journey_stops",
				"parenttype": "Patient Token",
			},
			fields=["*"],
			order_by="idx ASC",
			as_list=False,
		)
		if len(active_journey_stops) == 0 and not vitals_exist:
			if not vitals_service_unit:
				dept_name = frappe.db.get_value("Medical Department", appointment.department, "name")
				return {
					"alert": f"No Vitals Service Unit configured for department {dept_name}. Please set it in Medical Department"
				}
			vitals_queue_exists = frappe.db.exists(
				"Queue Assignment", {"service_unit": vitals_service_unit, "status": "Active"}
			)
			if not vitals_queue_exists:
				su_name = frappe.db.get_value(
					"Healthcare Service Unit", vitals_service_unit, "healthcare_service_unit_name"
				)
				return {
					"alert": f"No active queue for vitals service unit {su_name}. Please create a Queue Assignment first"
				}
			service_unit = vitals_service_unit
		elif len(active_journey_stops) <= 1:
			practitioner_unit = get_practitioner_current_unit(
				appointment.practitioner,
				appointment.appointment_date,
				appointment.appointment_time,
			)
			if practitioner_unit == "Not Available":
				return {
					"alert": "Practitioner is leave or not available today, Please contact reception for rescheduling your appointment"
				}
			service_unit = practitioner_unit or appointment.service_unit or service_unit

	if not service_unit:
		return {"alert": "No service unit found for this appointment. Please contact administrator"}

	service_unit_name = frappe.db.get_value(
		"Healthcare Service Unit", service_unit, "healthcare_service_unit_name"
	)
	checked_in_token = frappe.db.exists(
		"Patient Token",
		{"patient": patient, "status": "Checked In", "reference_dn": docname},
	)

	if checked_in_token:
		journey_stops = frappe.db.get_all(
			"Patient Journey Stop",
			filters={
				"parent": checked_in_token,
				"parentfield": "patient_journey_stops",
				"parenttype": "Patient Token",
			},
			fields=["*"],
			order_by="idx ASC",
			as_list=False,
		)

		if journey_stops and len(journey_stops):
			stop = journey_stops[-1]
			if stop.status in ["Checked In", "In Progress"] and stop.check_in_time and not stop.exit_time:
				return {
					"alert": f'{appointment.patient_name} is already checked into {frappe.db.get_value("Healthcare Service Unit", stop.service_unit, "healthcare_service_unit_name")} queue'
				}
	slot_position = get_slot_position(appointment.name)
	insert_token(ref_doc, docname, service_unit, slot_position)
	return {
		"message": f"{appointment.patient_name} is added to {service_unit_name} queue. Please proceed to {service_unit_name}"
	}


@frappe.whitelist()
def check_patient_details(patient_id):
	patient = frappe.get_doc("Patient", patient_id)
	attr_list = [
		"dob",
		"marital_status",
		"address_line1",
		"address_line2",
		"city",
		"state",
		"zip_code",
		"last_name",
	]
	if any(not getattr(patient, attr) for attr in attr_list):
		return {
			"first_name": patient.first_name,
			"last_name": patient.last_name,
			"gender": patient.sex,
			"dob": patient.dob,
			"email": patient.email,
			"mobile": patient.mobile,
			"city": patient.city,
			"state": patient.state,
			"zip": patient.zip_code,
			"address1": patient.address_line1,
			"address2": patient.address_line2,
			"marital": patient.marital_status,
		}
	return "complete"


@frappe.whitelist()
def update_patient():
	patient = frappe.get_doc("Patient", frappe.form_dict.get("patient_id"))
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


@frappe.whitelist()
def send_otp(number=None, otp=None):
	number = None if number in undefined_conditions else number

	if not number:
		return {"status": "Failed", "message": "No mobile number found"}

	company = get_default_company()
	company_name = frappe.db.get_value("Company", company, "company_name")
	message = f"{otp} is your OTP to verify mobile number at {company_name}. Do not share it with anyone - {company_name}"

	hcare_settings = frappe.get_single("Marley Frontend Settings")
	if hcare_settings.insert_error_log_for_otp_verification:
		frappe.log_error(message=message, title=f"KIOSK: OTP Verification SMS to {number}")

	ss = frappe.get_doc("SMS Settings", "SMS Settings")
	number = [number]
	if ss.sms_gateway_url:
		send_sms(number, message)

	return {"status": "Success", "alert": hcare_settings.show_browser_alert_for_otp, "message": message}


@frappe.whitelist()
def get_registration_fee(appointment):
	if not appointment:
		return

	if frappe.db.get_single_value("Healthcare Settings", "collect_registration_fee"):
		reg_fee = frappe.db.get_single_value("Healthcare Settings", "registration_fee")
		patient = frappe.db.get_value("Patient Appointment", appointment, "patient")

		if patient:
			invoiced = frappe.db.get_value("Patient", patient, "invoiced")
			if not invoiced:
				return reg_fee
			else:
				return False


def get_practitioner_current_unit(practitioner, appointment_date, appointment_time):
	date = getdate(appointment_date)
	weekday = date.strftime("%A")

	employee, user_id = frappe.db.get_value("Healthcare Practitioner", practitioner, ["employee", "user_id"])

	is_not_availble = False
	if not employee and user_id:
		employee = frappe.db.get_value("Employee", {"user_id": user_id}, "name")

	if employee:
		# check holiday
		if is_holiday(employee, date):
			is_not_availble = True

		# check leave status
		if "hrms" in frappe.get_installed_apps():
			leave_record = frappe.db.sql(
				"""select half_day from `tabLeave Application`
				where employee = %s and %s between from_date and to_date
				and docstatus = 1""",
				(employee, date),
				as_dict=True,
			)
			if leave_record and len(leave_record):
				is_not_availble = True
	if is_not_availble:
		return "Not Available"
	else:
		slot_unit = frappe.db.sql(
			f"""
			SELECT
				psus.service_unit as service_unit
			FROM
				`tabPractitioner Service Unit Schedule` as psus left join
				`tabPractitioner Schedule` as ps on psus.schedule=ps.name left join
				`tabHealthcare Schedule Time Slot` as slot on slot.parent=ps.name
			WHERE
				psus.service_unit IS NOT NULL and
				slot.from_time='{appointment_time}' and
				slot.day={frappe.db.escape(weekday)} and
				psus.parent={frappe.db.escape(practitioner)}
			LIMIT 1
		""",
			as_dict=True,
		)

		if slot_unit and len(slot_unit):
			return slot_unit[0].service_unit
		else:
			return None


@frappe.whitelist()
def get_patient_appointment(patient):
	if not patient:
		return

	appointment_exists = frappe.db.exists(
		"Patient Appointment",
		{
			"patient": patient,
			"appointment_date": getdate(),
			"status": ["!=", "Cancelled"],
		},
	)

	if appointment_exists:
		return appointment_exists
	else:
		return


@frappe.whitelist()
def get_user_info(user=None):
	if frappe.session.user == "Guest":
		frappe.throw("Authentication failed", exc=frappe.AuthenticationError)

	defined_user_roles = [
		"Kiosk User",
		"Vitals User",
		"Receptionist",
		"Physician",
		"Healthcare Administrator",
		"System Manager",
	]

	filters = {"roles.role": ["in", defined_user_roles]}
	if user:
		filters["name"] = user

	users = frappe.qb.get_query(
		"User",
		filters=filters,
		fields=["name", "email", "enabled", "user_image", "full_name", "user_type"],
		order_by="full_name asc",
		distinct=True,
	).run(as_dict=1)

	roles = frappe.db.get_all("Has Role", filters={"parenttype": "User"}, fields=["role", "parent"])

	for user in users:
		if frappe.session.user == user.name:
			user.session_user = True
		user_roles = [r.role for r in roles if r.parent == user.name]
		user.role = None
		for role in defined_user_roles:
			if role in user_roles:
				user.role = role
	return users


@frappe.whitelist()
def get_brand_image():
	brand_image = frappe.db.get_singles_value("Marley Frontend Settings", "home_screen_brand")
	if brand_image:
		return frappe.utils.get_url(brand_image)

	return None


@frappe.whitelist()
def get_logo_image():
	logo_image = frappe.db.get_singles_value("Marley Frontend Settings", "brand_logo")
	if logo_image:
		return frappe.utils.get_url(logo_image)

	return None


@frappe.whitelist()
def get_units():
	units = frappe.db.get_all(
		"Healthcare Service Unit",
		filters={"allow_appointments": 1},
		fields=["name as value", "healthcare_service_unit_name as label"],
		order_by="name ASC",
	)

	return units


@frappe.whitelist()
def get_qr_config():
	settings = frappe.get_single("Marley Frontend Settings")

	return settings.show_qr_camera_on_checkin_page, settings.show_qr_camera_on_kiosk_page


@frappe.whitelist()
def get_users():
	users = frappe.qb.get_query(
		"User",
		fields=[
			"name",
			"email",
			"enabled",
			"user_image",
			"first_name",
			"last_name",
			"full_name",
			"user_type",
		],
		order_by="full_name asc",
		distinct=True,
	).run(as_dict=1)

	for user in users:
		if frappe.session.user == user.name:
			user.session_user = True

		user.roles = frappe.get_roles(user.name)

		user.role = ""

		if "System Manager" in user.roles:
			user.role = "System Manager"
		elif "Healthcare Administrator" in user.roles:
			user.role = "Healthcare Administrator"
		elif "Guest" in user.roles:
			user.role = "Guest"

		if frappe.session.user == user.name:
			user.session_user = True

	healthcare_users = []

	for user in users:
		if "Healthcare Administrator" in user.roles:
			healthcare_users.append(user)

	return users, healthcare_users


# @frappe.whitelist()
# def get_dashboard(from_date="", to_date="", user=""):
# 	"""
# 	Get the dashboard data for the Healthcare dashboard.
# 	"""

# 	if not from_date or not to_date:
# 		from_date = frappe.utils.get_first_day(from_date or frappe.utils.nowdate())
# 		to_date = frappe.utils.get_last_day(to_date or frappe.utils.nowdate())

# 	if not user:
# 		user = frappe.session.user

# 	layout = json.loads(frappe.db.get_value("Healthcare Dashboard", "Manager Dashboard", "layout") or "[]")

# 	for l in layout:
# 		method_name = f"get_{l['name']}"

# 	return layout


@frappe.whitelist()
def get_current_patient_data(patient):
	patient = None if patient in undefined_conditions else patient

	patient_doc = frappe.get_doc("Patient", patient)
	profile_completed = None
	if (
		patient_doc.first_name
		and patient_doc.sex
		and patient_doc.phone
		and patient_doc.dob
		and patient_doc.address_line1
		and patient_doc.zip_code
		and patient_doc.city
		and patient_doc.state
		and patient_doc.marital_status
	):
		profile_completed = True

	return {"doc": patient_doc, "profile_completed": profile_completed}
