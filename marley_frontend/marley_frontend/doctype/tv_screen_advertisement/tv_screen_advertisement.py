# Copyright (c) 2024, earthians and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import getdate


class TVScreenAdvertisement(Document):
	def validate(self):
		if self.default:
			if frappe.db.exists("TV Screen Advertisement", {"default": True, "name": ["!=", self.name]}):
				frappe.throw("Default file already exists")
		overlap = frappe.db.get_all(
			"TV Screen Advertisement",
			filters={"name": ["!=", self.name], "enabled": True},
			or_filters=[
				["from_date", "between", [getdate(self.from_date), getdate(self.to_date)]],
				["to_date", "between", [getdate(self.from_date), getdate(self.to_date)]],
			],
			pluck="file_name",
		)
		if overlap:
			frappe.throw(f"Date range overlaps with {overlap}")
		return "No overlap detected."
