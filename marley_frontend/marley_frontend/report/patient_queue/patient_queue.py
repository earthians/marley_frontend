# Copyright (c) 2023, earthians and contributors
# For license information, please see license.txt

import frappe


def execute(filters=None):
	columns, data = [], []
	service_units = get_service_units()
	columns = get_columns(service_units, filters)
	data = get_data(service_units)

	return columns, data


def get_columns(service_units, filters):
	columns = []
	if service_units:
		if filters and filters.get("service_unit"):
			columns.append(
				{
					"fieldname": filters.get("service_unit"),
					"label": frappe.db.get_value(
						"Healthcare Service Unit",
						filters.get("service_unit"),
						"healthcare_service_unit_name",
					),
					"fieldtype": "Link",
					"width": 250,
					"options": "Patient Token",
				}
			)
		else:
			for service_unit in service_units:
				columns.append(
					{
						"fieldname": service_unit.get("current_service_unit"),
						"label": frappe.db.get_value(
							"Healthcare Service Unit",
							service_unit.get("current_service_unit"),
							"healthcare_service_unit_name",
						),
						"fieldtype": "Link",
						"width": 250,
						"options": "Patient Token",
					}
				)

	return columns


def get_service_units():
	token = frappe.qb.DocType("Patient Token")
	service_units = (
		frappe.qb.from_(token)
		.select(token.current_service_unit)
		.where(token.status == "Checked In")
		.groupby(token.current_service_unit)
	).run(as_dict=1)
	if service_units:
		return service_units


def get_data(service_units):
	out_data = []
	if service_units:
		for service_unit in service_units:
			query = f"""
				WITH RECURSIVE TokenChain AS (
					SELECT
						name as token_number,
						next,
						is_priority
					FROM
						`tabPatient Token`
					WHERE
						head = 1
						and current_service_unit={frappe.db.escape(service_unit.get("current_service_unit"))}

					UNION ALL

					SELECT
						tt.name as token_number,
						tt.next,
						tt.is_priority
					FROM
						`tabPatient Token` tt
						JOIN TokenChain tc ON tt.name = tc.next
				)
				SELECT
					token_number,
					next,
					is_priority
				FROM
					TokenChain
			"""
			tokens = frappe.db.sql(query, as_dict=True)
			n = 0
			if not tokens or len(tokens) < 0:
				return []
			for token in tokens:
				n += 1
				out_data.append(
					{
						"token": [token.get("token_number"), token.get("is_priority")],
						"service_unit": service_unit.get("current_service_unit"),
						"position": n,
						"priority": token.get("is_priority"),
					}
				)

		out_token_list = []
		position = []
		for data in out_data:
			#  to create position wise each row
			service_unit_name = frappe.db.get_value(
				"Healthcare Service Unit",
				data.get("service_unit"),
				"healthcare_service_unit_name",
			)
			if data.get("position") not in position:
				out_token_list.append(
					{
						data.get("service_unit"): data.get("token")[0],
						"position": data.get("position"),
						f"{service_unit_name}-priority": data.get("token")[1],
					}
				)
				position.append(data.get("position"))
			else:
				for j in out_token_list:
					if j.get("position") == data.get("position"):
						j[data.get("service_unit")] = data.get("token")[0]
						j[f"{service_unit_name}-priority"] = data.get("token")[1]
		return out_token_list


@frappe.whitelist()
def get_tokens():
	service_units = get_service_units()
	if service_units and len(service_units) > 0:
		tokens = get_data(service_units)
		if tokens and len(tokens) > 0:
			return tokens, service_units
		else:
			return []
	else:
		return []
