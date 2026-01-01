# Copyright (c) 2023, earthians and contributors
# For license information, please see license.txt

import random
import string

import frappe
from frappe import _
from frappe.model.document import Document
from frappe.model.naming import make_autoname
from frappe.utils import getdate, now_datetime, time_diff_in_hours


class PatientToken(Document):
	def before_insert(self):
		# last_token_number = get_last_token_from_service_unit(self)
		# if isinstance(last_token_number, str):
		# 	last_token_number = int(last_token_number)
		random_token = create_random_token_number()
		self.token_number = random_token
		# generate token number
		self.token_name = make_autoname(
			f"{self.token_name if self.token_name.endswith('-') else f'{self.token_name}-'}.#####", "", ""
		)

	def validate(self):
		"""
		update status and total time
		TODO: Validate order_by position
		"""
		if self.status in ["Scheduled", "Checked In", "No Show"]:
			status = ""
			total_time_in_queue = 0

			for journey_stop in self.patient_journey_stops:
				if journey_stop.status == "Scheduled" and status == "":
					status = "Scheduled"
					break

				elif journey_stop.status == "Scheduled" and status == "Checked Out":
					status = "Checked In"
					break

				elif journey_stop.status == "Checked In":
					status = "Checked In"
					break

				elif journey_stop.status == "In Progress":
					status = "Checked In"
					break

				elif journey_stop.status == "Checked Out":
					# check_in if scheduled stop is auto_check_in enabled
					status = "Active"
					total_time_in_queue += journey_stop.time_in_queue

				elif journey_stop.status == "No Show":
					status = "No Show"

			if getdate(self.posting_date) > getdate():
				status = "Expired"
			# set token status
			# NOTE: if status is Checked Out all stops should be Checked Out, mark Exited
			self.status = "Exited" if status == "Checked Out" else status

			self.total_time_in_queue = total_time_in_queue

	@frappe.whitelist()
	def check_in(self, queue_dn=None):
		if self.status == "No Show":
			reference_doc = frappe.get_doc(self.reference_dt, self.reference_dn)
			if queue_dn != reference_doc.service_unit:
				frappe.throw(_("Service Unit mismatch"))

			reqd_token_no, priority, next_token = check_and_find_last_token_number(reference_doc, "No Show")
			self.append(
				"patient_journey_stops",
				{
					"reference_doctype": self.reference_dt,
					"reference_docname": self.reference_dn,
					"status": "Checked In",
					"check_in_time": now_datetime(),
					"service_unit": reference_doc.service_unit,
					"medical_department": reference_doc.department,
					"practitioner": reference_doc.practitioner,
					"user": frappe.session.user,
				},
			)
			self.current_service_unit = queue_dn
			if reqd_token_no:
				self.next = reqd_token_no.get("next")
				frappe.db.set_value(
					"Patient Token", reqd_token_no.get("name"), "next", self.name, update_modified=False
				)
				frappe.publish_realtime("reload_practitioner_screen")

			self.save()

	@frappe.whitelist()
	def attend(self, queue_dn):
		"""
		mark the stop as In Progress
		"""
		journey_stop = next(
			(
				stop
				for stop in self.patient_journey_stops
				if stop.get("status") == "Checked In" and stop.get("service_unit") == queue_dn
			),
			None,
		)
		message = f"Not Checked In to {queue_dn}, please Check In and try again"
		if not journey_stop:
			if "Admin" not in frappe.get_roles(frappe.session.user):
				frappe.throw(_(message))
			else:
				frappe.msgprint(_(message))

		journey_stop_exists = frappe.db.sql(
			"""
			SELECT pjs.name
			FROM `tabPatient Journey Stop` pjs
				JOIN `tabPatient Token` pt ON pjs.parent = pt.name
			WHERE pjs.status = 'In Progress'
				AND pjs.service_unit = %s
				AND pjs.practitioner = %s
				AND pt.status != 'Expired'
				AND pt.posting_date=%s
			LIMIT 1
		""",
			(journey_stop.service_unit, journey_stop.practitioner, getdate(self.posting_date)),
		)

		if journey_stop_exists:
			frappe.throw(_("Another patient is currently attending!"))

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

		frappe.db.set_value("Patient Token", self.next, "head", 1)
		frappe.db.set_value(self.doctype, self.name, "head", 0)
		frappe.publish_realtime("update_tokens")
		frappe.publish_realtime("reload_practitioner_screen")

	@frappe.whitelist()
	def check_out(self, queue_dn):
		journey_stop = next(
			(
				stop
				for stop in self.patient_journey_stops
				if stop.get("status") == "In Progress" and stop.get("service_unit") == queue_dn
			),
			None,
		)

		if not journey_stop:
			frappe.throw(_("No queues to Check Out, please contact System Administrator"))

		journey_stop.status = "Checked Out"
		journey_stop.exit_time = now_datetime()

		journey_stop.time_to_complete = time_diff_in_hours(journey_stop.exit_time, journey_stop.entry_time)

		self.current_service_unit = ""

		self.save(ignore_permissions=True)
		frappe.publish_realtime("update_tokens")
		frappe.publish_realtime("reload_practitioner_screen")

	@frappe.whitelist()
	def no_show(self):
		journey_stop = next(
			(stop for stop in self.patient_journey_stops if stop.get("status") == "Checked In"), None
		)

		if not journey_stop:
			frappe.throw(_("No matching queues, please contact System Administrator"))

		journey_stop.status = "No Show"
		# self.current_service_unit = ''
		if self.head:
			self.head = 0
			frappe.db.set_value("Patient Token", self.next, "head", 1)

		self.save(ignore_permissions=True)

	def set_next_head(self):
		if not self.next:
			return

		next_token = frappe.get_doc("Patient Token", self.next)
		journey_stop = next(
			(stop for stop in self.patient_journey_stops if stop.get("status") == "Checked In"), None
		)

		if journey_stop:
			journey_stop.db_set("time_at_head", now_datetime())
			next_token.db_set("head", True)


@frappe.whitelist(allow_guest=True)
def insert_token(ref_doc, ref_name, service_unit=None, slot_position=None):
	if not service_unit or slot_position is None:
		return

	reference_doc = frappe.get_doc(ref_doc, ref_name)

	active_token = frappe.db.exists(
		"Patient Token",
		{
			"patient": reference_doc.patient,
			"status": ["in", ["Checked In", "Active"]],
			"reference_dn": ref_name,
		},
	)

	naming_series = frappe.db.get_single_value("Healthcare Settings", "token_series")

	if active_token:
		patient_token = frappe.get_doc("Patient Token", active_token)
	else:
		existing_tokens = frappe.get_all(
			"Patient Token",
			filters={"status": ["in", ["Checked In", "Active"]]},
			fields=["name", "slot_position", "next"],
			order_by="slot_position",
		)

		patient_token = frappe.new_doc("Patient Token")
		patient_token.patient = reference_doc.patient
		patient_token.token_name = naming_series
		patient_token.slot_position = slot_position
		patient_token.posting_date = now_datetime()
		patient_token.reference_dt = ref_doc
		patient_token.reference_dn = ref_name

		if not existing_tokens:
			patient_token.head = 1
		else:
			prev_token = None
			for token in existing_tokens:
				if float(token.slot_position) > float(slot_position):
					break
				prev_token = token

			if prev_token:
				patient_token.next = prev_token.next
				patient_token.head = 0
				frappe.db.set_value("Patient Token", prev_token.name, "next", patient_token.name)
			else:
				patient_token.next = existing_tokens[0].name
				patient_token.head = 1
				frappe.db.set_value("Patient Token", existing_tokens[0].name, "head", 0)

	if patient_token:
		patient_token.current_service_unit = service_unit
		patient_token.status = "Checked In"
		patient_token.append(
			"patient_journey_stops",
			{
				"reference_doctype": ref_doc,
				"reference_docname": ref_name,
				"status": "Checked In",
				"check_in_time": now_datetime(),
				"service_unit": service_unit,
				"medical_department": reference_doc.get("department"),
				"practitioner": reference_doc.get("ref_practitioner")
				if ref_doc == "Sales Invoice"
				else reference_doc.get("practitioner"),
				"user": frappe.session.user,
			},
		)
		patient_token.save(ignore_permissions=True)
		frappe.msgprint(f"Token {frappe.bold(patient_token.name)} has generated", alert=True)

	if patient_token:
		frappe.db.set_value(ref_doc, ref_name, "patient_token", patient_token.name)

	if ref_doc == "Patient Appointment":
		frappe.db.set_value("Patient Appointment", ref_name, "status", "Confirmed")
	frappe.db.commit()
	frappe.publish_realtime("update_tokens")
	frappe.publish_realtime("reload_practitioner_screen")


# @frappe.whitelist()
def check_and_find_last_token_number(reference_doc, status=None):
	actual_priority = check_priority_rule_exist(reference_doc)
	if status and status == "No Show":
		actual_priority = frappe.db.get_single_value("Healthcare Settings", "consider_after_number_of_token")

	last_token = next_token = False
	query = f"""
		SELECT
			token.name,
			token.head,
			token.next,
			token.priority_level
		FROM
			`tabPatient Token` as token LEFT JOIN
			`tabPatient Journey Stop` as pstop ON pstop.parent = token.name
		WHERE
			pstop.service_unit={frappe.db.escape(reference_doc.get("service_unit"))} and pstop.practitioner={frappe.db.escape(reference_doc.get("practitioner"))} and pstop.status='Checked In'
		GROUP BY
			token.name
	"""

	token_list = frappe.db.sql(query, as_dict=1)
	priority = actual_priority
	if token_list and len(token_list) > 0:
		if priority and int(priority) <= len(token_list):
			# only looks for same or more priority tokens
			current_row = None
			priority_list = [
				row
				for row in token_list
				if (row["priority_level"] > 0 and row["priority_level"] <= int(priority))
			]
			if priority_list and not status == "No Show":
				current_row = get_the_last_priority_token(priority_list, 2)
			else:
				current_row = next(
					(row for row in token_list if (row.get("head") == 1)), None
				)  # Start from the first 'Head' row
				priority = int(priority) - 1
				if priority == 0:
					next_token = current_row
					current_row = None

			for _i in range(1, int(priority)):
				if current_row and current_row["next"]:
					# Find the row with the 'Next name' in the table
					current_row = next(row for row in token_list if (row["name"] == current_row["next"]))
				else:
					# Break if there is no 'Next name' or if the next row is not found
					break
			last_token = current_row
		else:
			last_token = next((row for row in token_list if (row.get("next") in [None, ""])), None)

	return last_token, actual_priority, next_token


def create_random_token_number():
	allowed_letters = "".join([char for char in string.ascii_uppercase if char not in "IO"])
	tokens = frappe.db.get_all("Patient Token", filters={"status": ["!=", "Expired"]}, pluck="token_number")

	while True:
		random_letters = random.sample(allowed_letters, 2)  # Get two unique random letters
		random_token = (
			random_letters[0]
			+ str(random.randrange(1, 10))
			+ str(random.randrange(1, 10))
			+ random_letters[1]
		)
		if random_token not in tokens:
			return random_token


def check_priority_rule_exist(reference_doc):
	# check date exipired
	if reference_doc.get("doctype") == "Patient Appointment":
		query = f"""
			SELECT
				priority_level
			FROM
				`tabPatient Queue Priority Rule`
			WHERE
				disabled=0 and field_doctype='Appointment Type' AND
				field_name = {frappe.db.escape(reference_doc.get("appointment_type"))}
			Order BY
				valid_from DESC
			limit 1
		"""

		priority_rule = frappe.db.sql(query, as_dict=1)
		if priority_rule and len(priority_rule) > 0:
			return priority_rule[0].get("priority_level")
		else:
			return False


def get_the_last_priority_token(token_list, priority):
	esc_token_list = []
	# to consider equal priority if exist else lesser for last token
	if any("priority_level" in d and d["priority_level"] == priority for d in token_list):
		esc_token_list = [
			frappe.db.escape(tok.get("name")) for tok in token_list if tok.get("priority_level") == priority
		]
	else:
		esc_token_list = [frappe.db.escape(tok.get("name")) for tok in token_list]

	if len(esc_token_list) > 0:
		query = f"""
			SELECT
				token.name,
				token.head,
				token.next,
				token.priority_level
			FROM
				`tabPatient Token` as token LEFT JOIN
				`tabPatient Journey Stop` as pstop ON pstop.parent = token.name
			WHERE
				token.name in ({",".join(esc_token_list)}) and
				pstop.status='Checked In'
			GROUP BY
				token.name
			Order BY
				pstop.check_in_time DESC
			limit 1
		"""

		p_token_list = frappe.db.sql(query, as_dict=1)
		if p_token_list and len(p_token_list) > 0:
			return p_token_list[0]
		else:
			return False


def update_token_status():
	# update the status of tokens daily
	tokens = frappe.db.get_all(
		"Patient Token", {"status": ("not in", ["Exited", "Expired"]), "posting_date": ["<", getdate()]}
	)

	for token in tokens:
		token_doc = frappe.get_doc("Patient Token", token.name)
		if token_doc.patient_journey_stops and len(token_doc.patient_journey_stops) > 0:
			for i in token_doc.patient_journey_stops:
				if not i.entry_time:
					i.entry_time = now_datetime()
				if not i.exit_time:
					i.exit_time = now_datetime()
				if i.status != "Checked Out":
					i.status = "Checked Out"
		if token_doc.status != "Expired":
			token_doc.status = "Expired"
		token_doc.head = 0
		token_doc.save()


def get_last_token_from_service_unit(doc):
	query = f"""
		SELECT
			token.token_number,
			token.name
		FROM
			`tabPatient Token` as token LEFT JOIN
			`tabPatient Journey Stop` as pstop ON pstop.parent = token.name
		WHERE
			pstop.service_unit = {frappe.db.escape(doc.current_service_unit)} and
			Date(token.posting_date) = {frappe.db.escape(getdate(doc.posting_date))}
		ORDER BY
			pstop.creation DESC
		LIMIT 1
	"""

	result = frappe.db.sql(query, as_dict=True)

	if result and len(result) > 0:
		if result[0] and result[0].get("token_number"):
			return result[0].get("token_number")
	else:
		return 0


def checkout_from_journey_stop(doc, method=None):
	"""
	To checkout from the currently attending journey stop on submitting any of the permitted_doctypes
	doc: document being submitted
	"""
	permitted_doctypes = [
		"Vital Signs",
		"Patient Encounter",
	]  # temporary, need to create child Table in Token settings

	if doc.doctype in permitted_doctypes:
		queue_dn = doc.get("service_unit")

		# Check if an active token exists for the patient:
		# token_exists = frappe.db.exists('Patient Token', {"patient": doc.patient, "status": "Checked In"})

		# find the Patient Token	for the patient in the Vital Signs doc:
		if frappe.db.exists("Patient Token", {"patient": doc.patient, "status": "Checked In"}):
			token = frappe.get_doc("Patient Token", {"patient": doc.patient, "status": "Checked In"})

			journey_stop = next(
				(
					stop
					for stop in token.patient_journey_stops
					if stop.get("status") == "In Progress" and stop.get("service_unit") == queue_dn
				),
				None,
			)

			if not journey_stop:
				frappe.msgprint("The Patient is not attending any stops to checkout from", alert=True)
				return

			journey_stop.status = "Checked Out"
			journey_stop.exit_time = now_datetime()

			journey_stop.time_to_complete = time_diff_in_hours(
				journey_stop.exit_time, journey_stop.entry_time
			)

			token.current_service_unit = ""

			token.save(ignore_permissions=True)
			frappe.publish_realtime("update_tokens")
			frappe.publish_realtime("update_status")
			frappe.publish_realtime("reload_practitioner_screen")
		else:
			return
	else:
		return


@frappe.whitelist()
def get_token_to_attend(patient, curr_stop=None):
	queue_dn = None if curr_stop == "undefined" else curr_stop
	active_token = frappe.db.exists("Patient Token", {"patient": patient, "status": "Checked In"})
	if active_token:
		patient_token = frappe.get_doc("Patient Token", active_token)
		patient_token.attend(queue_dn)
	else:
		frappe.throw("Please Check-in before attending")
