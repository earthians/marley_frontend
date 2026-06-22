from frappe.custom.doctype.custom_field.custom_field import create_custom_fields


def execute():
	custom_fields = {
		"Patient Appointment": [
			{
				"fieldname": "is_called",
				"label": "Called",
				"fieldtype": "Check",
				"read_only": 1,
				"insert_after": "appointment_date",
				"no_copy": 1,
				"hidden": 1,
			},
			{
				"fieldname": "custom_registration_fee_paid",
				"label": "Registration Fee Paid",
				"fieldtype": "Check",
				"read_only": 1,
				"default": "0",
				"hidden": 1,
				"insert_after": "patient_age",
			},
			{
				"fieldname": "custom_registration_fee_invoiced",
				"label": "Registration Fee Invoiced",
				"fieldtype": "Check",
				"read_only": 1,
				"default": "0",
				"hidden": 1,
				"insert_after": "custom_registration_fee_paid",
			},
			{
				"fieldname": "custom_consultation_paid",
				"label": "Consultation Paid",
				"fieldtype": "Check",
				"read_only": 1,
				"default": "0",
				"hidden": 1,
				"insert_after": "invoiced",
			},
			{
				"fieldname": "custom_reschedule_reason",
				"label": "Reschedule Reason",
				"fieldtype": "Small Text",
				"insert_after": "google_meet_link",
			},
			{
				"fieldname": "custom_cancel_reason",
				"label": "Cancel Reason",
				"fieldtype": "Small Text",
				"insert_after": "custom_reschedule_reason",
			},
		],
		"Healthcare Settings": [
			{
				"fieldname": "token_limit",
				"label": "Token Limit",
				"fieldtype": "Int",
				"read_only": 0,
				"insert_after": "token_series",
				"no_copy": 1,
				"default": "5",
			},
		],
		"Healthcare Service Unit": [
			{
				"fieldname": "room_status",
				"label": "Room Status",
				"fieldtype": "Select",
				"read_only": 1,
				"insert_after": "occupancy_status",
				"no_copy": 1,
				"options": "Vacant\nOccupied\nCleaning\nUnder Maintenance",
				"depends_on": "eval:doc.inpatient_occupancy == 1",
			},
			{
				"fieldname": "custom_slot_based_token",
				"label": "Slot Based Token",
				"fieldtype": "Check",
				"insert_after": "checked_in",
			},
		],
		"Patient": [
			{
				"fieldname": "invoiced",
				"label": "Registration Paid",
				"fieldtype": "Check",
				"read_only": 1,
				"insert_after": "consent_for_aadhaar_use",
				"no_copy": 1,
			},
			{
				"fieldname": "payment_entry_created",
				"label": "Paid",
				"fieldtype": "Check",
				"read_only": 1,
				"insert_after": "invoiced",
				"no_copy": 1,
			},
			{
				"fieldname": "custom_age",
				"label": "Age",
				"fieldtype": "Data",
				"read_only": 1,
				"insert_after": "dob",
			},
			{
				"fieldname": "custom_last_visit_date",
				"label": "Last Visit Date",
				"fieldtype": "Date",
				"read_only": 1,
				"insert_after": "custom_age",
			},
			{
				"fieldname": "custom_source",
				"label": "Source",
				"fieldtype": "Select",
				"options": "\nDirect\nEmployee\nReferral",
				"insert_after": "source",
			},
			{
				"fieldname": "custom_employee",
				"label": "Employee",
				"fieldtype": "Link",
				"options": "Employee",
				"insert_after": "custom_source",
				"depends_on": "eval:doc.custom_source == 'Employee'",
			},
		],
		"Payment Entry": [
			{
				"fieldname": "register_paid",
				"label": "Registration Paid",
				"fieldtype": "Check",
				"insert_after": "paid_amount",
				"no_copy": 1,
			},
			{
				"fieldname": "custom_reference_appointment",
				"label": "Reference Appointment",
				"fieldtype": "Link",
				"options": "Patient Appointment",
				"insert_after": "register_paid",
			},
		],
		"Therapy Plan Detail": [
			{
				"fieldname": "custom_booked_sessions",
				"label": "Booked Sessions",
				"fieldtype": "Int",
				"insert_after": "no_of_sessions",
			},
		],
	}

	create_custom_fields(custom_fields, update=True)
