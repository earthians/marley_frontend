import frappe
from frappe.custom.doctype.custom_field.custom_field import create_custom_fields


def after_install(force=False):
	add_standard_dropdown_items()
	frappe.db.commit()


def add_standard_dropdown_items():
	settings = frappe.get_doc("Marley Frontend Settings", "Marley Frontend Settings")
	settings.dropdown_items = []

	for item in frappe.get_hooks("standard_dropdown_items"):
		settings.append("dropdown_items", item)

	settings.save()
