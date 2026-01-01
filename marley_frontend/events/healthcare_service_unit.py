import frappe
from frappe import _
from frappe.utils import now_datetime


@frappe.whitelist()
def check_in(service_unit):
	if not frappe.db.exists("Queue Assignment", {"service_unit": service_unit, "status": "Active"}):
		service_unit_doc = frappe.get_doc("Healthcare Service Unit", service_unit)
		queue_assignment = frappe.new_doc("Queue Assignment")
		queue_assignment._from = now_datetime()
		queue_assignment.service_unit = service_unit_doc.name
		# queue_assignment.queue_dt = service_unit_doc.queue_dt
		# queue_assignment.queue_dn = service_unit_doc.queue_dn
		queue_assignment.user = frappe.session.user
		queue_assignment.status = "Active"
		queue_assignment.employee = frappe.db.exists("Employee", {"user_id": queue_assignment.user})
		queue_assignment.save()
		service_unit_doc.db_set("checked_in", 1)
		frappe.msgprint(
			_("Checked in to Queue Assignment"),
			title=_("Warning!"),
			indicator="green",
			alert=1,
		)


@frappe.whitelist()
def check_out(service_unit):
	assigned_queue = frappe.db.exists("Queue Assignment", {"service_unit": service_unit, "status": "Active"})
	if assigned_queue:
		service_unit_doc = frappe.get_doc("Healthcare Service Unit", service_unit)
		queue_assignment = frappe.get_doc("Queue Assignment", assigned_queue)
		queue_assignment.to = now_datetime()
		queue_assignment.status = "Closed"
		queue_assignment.save(ignore_permissions=True)
		service_unit_doc.db_set("checked_in", 0)
		frappe.msgprint(
			_("Checked out from Queue Assignment"),
			title=_("Warning!"),
			indicator="green",
			alert=1,
		)
	if not frappe.db.exists("Queue Assignment", {"service_unit": service_unit}):
		service_unit_doc = frappe.get_doc("Healthcare Service Unit", service_unit)
		service_unit_doc.db_set("checked_in", 0)
