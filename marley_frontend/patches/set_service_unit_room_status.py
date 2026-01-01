import frappe


def execute():
	units = frappe.db.get_all(
		"Healthcare Service Unit", filters={"inpatient_occupancy": 1}, fields=["name", "occupancy_status"]
	)
	for i in units:
		if i.occupancy_status:
			frappe.db.set_value("Healthcare Service Unit", i.name, "room_status", i.occupancy_status)
