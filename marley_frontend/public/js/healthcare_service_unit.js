// Copyright (c) 2023, info@earthianslive.com and contributors
// For license information, please see license.txt

frappe.ui.form.on("Healthcare Service Unit", {
	refresh: function (frm) {
		if (frm.doc.is_group == 0) {
			if (!frm.doc.checked_in) {
				frm.add_custom_button(__("Start Queue"), () => {
					frappe.call({
						method: "marley_frontend.events.healthcare_service_unit.check_in",
						args: { service_unit: frm.doc.name },
						callback: function (r) {
							if (!r.exc) {
								frm.reload_doc();
							}
						},
					});
				});
			}
			if (frm.doc.checked_in) {
				frm.add_custom_button(__("Stop Queue"), () => {
					frappe.call({
						method: "marley_frontend.events.healthcare_service_unit.check_out",
						args: { service_unit: frm.doc.name },
						callback: function (r) {
							if (!r.exc) {
								frm.reload_doc();
							}
						},
					});
				});
			}
		}
	},
});
