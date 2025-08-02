import frappe

def execute():
	appointments = frappe.db.get_all("Patient Appointment", fields=["name", "patient"])
	for appointment in appointments:
		invoiced, payment_entry_created = frappe.db.get_value("Patient", appointment.patient, ["invoiced", "payment_entry_created"])
		if invoiced or payment_entry_created:
			frappe.db.set_value("Patient Appointment", appointment.name, {
				"custom_registration_fee_paid": payment_entry_created,
				"custom_registration_fee_invoiced": invoiced
			})
