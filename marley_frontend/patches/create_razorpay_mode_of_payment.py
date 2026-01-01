import frappe


def execute():
	exists = frappe.db.exists("Mode of Payment", "RazorPay")

	if not exists:
		mop_doc = frappe.new_doc("Mode of Payment")
		mop_doc.mode_of_payment = "RazorPay"
		mop_doc.type = "Bank"
		mop_doc.enabled = 1
		mop_doc.save(ignore_permissions=True)
