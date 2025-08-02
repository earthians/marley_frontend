import frappe


def execute():
	roles = ["Pharmacist", "Vitals User", "Receptionist", "Kiosk User"]
	for r in roles:
		if not frappe.db.exists("Role", r):
			role_doc = frappe.new_doc("Role")
			role_doc.role_name = r
			role_doc.enabled = 1
			role_doc.save(ignore_permissions=True)
