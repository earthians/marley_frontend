import frappe

from marley_frontend.marley_frontend.doctype.patient_token.patient_token import insert_token


def on_update(doc, method):
	if doc.status == "Checked In" and not doc.patient_token and doc.appointment_type:
		insert_token("Patient Appointment", doc.name, doc.get("service_unit"))
