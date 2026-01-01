# Copyright (c) 2025, earthians Health Informatics Pvt. Ltd and contributors
# For license information, please see license.txt

import frappe
from frappe import _
from frappe.model.document import Document


class MarleyFrontendSettings(Document):
	def validate(self):
		self.do_not_allow_to_delete_if_standard()

	def do_not_allow_to_delete_if_standard(self):
		if not self.has_value_changed("dropdown_items"):
			return
		old_items = self.get_doc_before_save().get("dropdown_items")
		standard_new_items = [d.name1 for d in self.dropdown_items if d.is_standard]
		standard_old_items = [d.name1 for d in old_items if d.is_standard]
		deleted_standard_items = set(standard_old_items) - set(standard_new_items)
		if deleted_standard_items:
			standard_dropdown_items = get_standard_dropdown_items()
			if not deleted_standard_items.intersection(standard_dropdown_items):
				return
			frappe.throw(_("Cannot delete standard items {0}").format(", ".join(deleted_standard_items)))


def get_standard_dropdown_items():
	return [item.get("name1") for item in frappe.get_hooks("standard_dropdown_items")]
