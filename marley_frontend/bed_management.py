import frappe
from frappe.defaults import get_user_default_as_list
from frappe.utils import add_to_date, get_date_str, getdate, now

from erpnext import get_default_company

from healthcare.healthcare.doctype.inpatient_record.inpatient_record import create_inpatient_record

undefined_conditions = ["null", "", "undefined", "false", False, "[]", []]


@frappe.whitelist()
def get_filter_options(room_type_filter):
	room_type_filter = None if room_type_filter in undefined_conditions else room_type_filter

	service_unit_options = []
	type_options = []
	patient_options = []
	allocate_patient_options = []
	consultant_options = []
	allocate_rooms_options = []

	su_filter = {"inpatient_occupancy": 1}
	if room_type_filter:
		su_filter["service_unit_type"] = room_type_filter

	service_unit_options = frappe.db.get_all(
		"Healthcare Service Unit",
		filters=su_filter,
		fields=["healthcare_service_unit_name as label", "name as value"],
		order_by="name ASC",
	)

	type_options = frappe.db.get_all(
		"Healthcare Service Unit Type",
		filters={"disabled": 0, "inpatient_occupancy": 1},
		fields=["name as label", "name as value"],
		order_by="name ASC",
	)

	patient_options = frappe.db.get_all(
		"Patient",
		filters={"status": "Active", "inpatient_record": ["is", "set"]},
		fields=["patient_name as label", "name as value", "mobile"],
		order_by="name ASC",
	)
	for pat in patient_options:
		if pat.mobile:
			pat["label"] = f"{pat.label}-{pat.mobile}"

	allocate_patient_options = frappe.db.get_all(
		"Patient",
		filters={"status": "Active", "inpatient_record": ["is", "not set"]},
		fields=["patient_name as label", "name as value", "mobile"],
		order_by="name ASC",
	)
	for pat in allocate_patient_options:
		if pat.mobile:
			pat["label"] = f"{pat.label}-{pat.mobile}"

	consultant_options = frappe.db.get_all(
		"Healthcare Practitioner",
		filters={
			"status": "Active",
		},
		fields=["practitioner_name as label", "name as value"],
		order_by="name ASC",
	)

	allocate_rooms_options = frappe.db.get_all(
		"Healthcare Service Unit",
		filters={"inpatient_occupancy": 1, "is_group": 0, "room_status": ["in", ["Vacant", "Occupied"]]},
		fields=["healthcare_service_unit_name as label", "name as value"],
		order_by="name ASC",
	)

	room_status_options = [{"label": "", "value": ""}]
	field_meta = frappe.get_meta("Healthcare Service Unit").get_field("room_status")
	for item in field_meta.options.strip().splitlines():
		room_status_options.append({"label": item.strip(), "value": item.strip()})

	return {
		"service_unit_options": service_unit_options,
		"type_options": type_options,
		"patient_options": patient_options,
		"allocate_patient_options": allocate_patient_options,
		"consultant_options": consultant_options,
		"allocate_rooms_options": allocate_rooms_options,
		"room_status_options": room_status_options,
	}


@frappe.whitelist()
def get_filter_room(room_type, company=None):
	room_type = None if room_type in undefined_conditions else room_type
	company = None if company in undefined_conditions else company
	user = frappe.session.user

	if not company:
		companies = get_user_default_as_list("company", user)
		if companies:
			company = companies[0]
		else:
			company = frappe.db.get_single_value("Global Defaults", "default_company")

	if not room_type:
		return

	service_units = frappe.db.get_all(
		"Healthcare Service Unit",
		filters={
			"inpatient_occupancy": 1,
			"service_unit_type": room_type,
			"room_status": "Vacant",
			"company": company,
		},
		fields=["healthcare_service_unit_name as label", "name as value"],
		order_by="name ASC",
	)

	return service_units


@frappe.whitelist()
def get_encounter_options(patient):
	patient = None if patient in undefined_conditions else patient

	filters = {"docstatus": 1, "inpatient_record": ["is", "not set"]}
	if patient:
		filters["patient"] = patient

	encounters = frappe.db.get_all(
		"Patient Encounter",
		filters=filters,
		fields=["name as label", "name as value"],
		order_by="encounter_date DESC",
	)

	return encounters


@frappe.whitelist()
def get_room_details(**args):
	if isinstance(args, dict):
		args = frappe._dict(args)

	args.date_filter = getdate() if args.date_filter in undefined_conditions else getdate(args.date_filter)
	args.status_filter = None if args.status_filter in undefined_conditions else args.status_filter
	args.patient_filter = None if args.patient_filter in undefined_conditions else args.patient_filter
	cond = ""

	if args.room_type_filter and args.room_type_filter not in undefined_conditions:
		cond += f" and su.service_unit_type={frappe.db.escape(args.room_type_filter)}"

	if args.bed_filter and args.bed_filter not in undefined_conditions:
		cond += f" and su.name={frappe.db.escape(args.bed_filter)}"

	user = frappe.session.user
	company = args.get("company") or None
	if not args.get("company"):
		companies = get_user_default_as_list("company", user)
		if companies:
			company = companies[0]
		else:
			company = frappe.db.get_single_value("Global Defaults", "default_company")
	if company:
		cond += f" and su.company={frappe.db.escape(company)}"

	service_units = frappe.db.sql(
		f"""
		SELECT
			su.*, sut.item, sut.rate, sut.uom, sut.no_of_hours, sut.minimum_billable_qty, sut.is_billable
		FROM
			`tabHealthcare Service Unit` as su LEFT JOIN
			`tabHealthcare Service Unit Type` sut ON sut.name = su.service_unit_type
		WHERE
			su.inpatient_occupancy = 1
			AND su.is_group = 0
			{cond}
		GROUP BY su.name
		ORDER BY su.service_unit_type ASC, su.name ASC
	""",
		as_dict=True,
	)

	for su in service_units:
		io_exists = frappe.db.sql(
			f"""
			SELECT
				ip.patient, ip.patient_name, ip.admission_encounter, ip.admission_ordered_for,
				ip.primary_practitioner, ip.scheduled_date, ip.admitted_datetime, io.check_in,
				io.service_unit, ip.name AS ip_record, ip.status AS ip_status, ip.expected_discharge,
				ip.discharge_datetime, io.left
			FROM
				`tabInpatient Occupancy` io LEFT JOIN
				`tabInpatient Record` ip ON ip.name = io.parent
			WHERE
				io.service_unit={frappe.db.escape(su.name)} and
				io.left=0 and
				DATE(io.check_in) <= DATE({frappe.db.escape(get_date_str(args.date_filter))}) and
				ifnull(DATE(io.check_out), {frappe.db.escape(get_date_str(args.date_filter))}) >= DATE({frappe.db.escape(get_date_str(args.date_filter))}) and
				ip.company = {frappe.db.escape(company)}
		""",
			as_dict=True,
		)

		ip_exists = frappe.db.sql(
			f"""
			SELECT
				ip.patient, ip.patient_name, ip.admission_encounter, ip.admission_ordered_for,
				ip.primary_practitioner, ip.scheduled_date, ip.admitted_datetime,
				ip.name AS ip_record, ip.status AS ip_status, ip.expected_discharge, ip.discharge_datetime
			FROM
				`tabInpatient Record` as ip
			WHERE
				ip.admission_service_unit={frappe.db.escape(su.name)} and
				ip.status='Admission Scheduled' and
				ip.company = {frappe.db.escape(company)} and
				DATE(ip.admission_ordered_for) <= DATE({frappe.db.escape(get_date_str(args.date_filter))}) and
				ifnull(DATE(ip.expected_discharge), {frappe.db.escape(get_date_str(args.date_filter))}) >= DATE({frappe.db.escape(get_date_str(args.date_filter))})
		""",
			as_dict=True,
		)

		if su.room_status in ["Under Maintenance", "Cleaning"]:
			pass
		elif io_exists and len(io_exists):
			su["room_status"] = "Occupied"
			su.update(io_exists[0])
		elif ip_exists and len(ip_exists):
			su["room_status"] = "Occupied"
			su.update(ip_exists[0])
		else:
			su["room_status"] = "Vacant"

	data_dict = {}

	for item in service_units:
		if not args.status_filter or item.room_status == args.status_filter:
			if not args.patient_filter or item.patient == args.patient_filter:
				data_dict.setdefault(item.service_unit_type, []).append(item)

	final_list = []
	if data_dict:
		for i in data_dict:
			final_list.append({"room_type_details": i, "rooms": data_dict[i]})

	return final_list


@frappe.whitelist()
def order_admission(
	patient,
	encounter,
	primary_consultant,
	secondary_consultant,
	bed_type,
	bed,
	admission_date,
	expected_length_of_stay,
):
	patient = None if patient in undefined_conditions else patient
	encounter = None if encounter in undefined_conditions else encounter
	primary_consultant = None if primary_consultant in undefined_conditions else primary_consultant
	secondary_consultant = None if secondary_consultant in undefined_conditions else secondary_consultant
	bed_type = None if bed_type in undefined_conditions else bed_type
	bed = None if bed in undefined_conditions else bed
	expected_length_of_stay = (
		0 if expected_length_of_stay in undefined_conditions else expected_length_of_stay
	)

	admission_date = getdate(admission_date) if admission_date in undefined_conditions else admission_date

	medical_department = frappe.db.get_value("Healthcare Practitioner", primary_consultant, "department")
	company = get_default_company()
	if encounter:
		encounter_doc = frappe.get_doc("Patient Encounter", encounter)
		company = encounter_doc.company
		medical_department = encounter_doc.medical_department

	admission_order = {
		"patient": patient,
		"admission_encounter": encounter,
		"referring_practitioner": frappe.db.get_value("Patient Encounter", encounter, "practitioner"),
		"company": company,
		"medical_department": medical_department,
		"primary_practitioner": primary_consultant,
		"secondary_practitioner": secondary_consultant,
		"admission_ordered_for": admission_date,
		"admission_service_unit_type": bed_type,
		"admission_service_unit": bed,
		"treatment_plan_template": None,
		"expected_length_of_stay": int(expected_length_of_stay),
		"expected_discharge": add_to_date(admission_date, days=int(expected_length_of_stay))
		if int(expected_length_of_stay) > 0
		else None,
		"admission_instruction": None,
		"admission_nursing_checklist_template": None,
	}

	ip_record = create_inpatient_record(admission_order)
	frappe.db.commit()

	if ip_record:
		return ip_record


@frappe.whitelist()
def change_status(status, room=None, ip_status=None):
	room = None if room in undefined_conditions else room
	ip_status = None if ip_status in undefined_conditions else ip_status

	if not room:
		return

	if status == "Cleaning Completed":
		if status == "Cleaning Completed" and ip_status:
			if ip_status == "Admitted":
				status = "Occupied"
			else:
				status = "Vacant"
		else:
			status = "Vacant"

	frappe.db.set_value("Healthcare Service Unit", room, "room_status", status)
	frappe.db.commit()

	return True


@frappe.whitelist()
def order_bed_transfer(patient, ipd, leave_from, transfer_to, for_procedure):
	patient = None if patient in undefined_conditions else patient
	ipd = None if ipd in undefined_conditions else ipd
	leave_from = None if leave_from in undefined_conditions else leave_from
	transfer_to = None if transfer_to in undefined_conditions else transfer_to
	for_procedure = False if for_procedure in undefined_conditions else True

	if ipd:
		ipd_doc = frappe.get_doc("Inpatient Record", ipd)
		if for_procedure:
			ipd_doc.transfer(transfer_to, now(), None, for_procedure)
		else:
			ipd_doc.transfer(transfer_to, now(), leave_from)
		frappe.db.commit()
		return True


@frappe.whitelist()
def admit_patient(ip_record, service_unit, check_in, expected_discharge):
	ip_record = None if ip_record in undefined_conditions else ip_record
	service_unit = None if service_unit in undefined_conditions else service_unit
	check_in = now() if check_in in undefined_conditions else check_in
	expected_discharge = None if expected_discharge in undefined_conditions else expected_discharge

	if not ip_record or not frappe.db.exists("Inpatient Record", ip_record):
		frappe.throw("Need a valid Inpatient Record to admit this patient")

	ip_doc = frappe.get_doc("Inpatient Record", ip_record)
	price_list, currency = frappe.get_cached_value(
		"Patient", ip_doc.patient, ["default_price_list", "default_currency"]
	)
	ip_doc.admit(service_unit, check_in, expected_discharge, currency, price_list)
	frappe.db.commit()
