frappe.ui.form.on("Vital Signs", {
	refresh: function (frm) {
		if (!frm.is_new() && frappe.user.has_role("System Manager")) {
			frm.add_custom_button("Attend", function () {
				frm.call({
					method: "marley_frontend.marley_frontend.doctype.patient_token.patient_token.get_token_to_attend",
					args: {
						patient: frm.doc.patient,
						curr_stop: frm.doc.service_unit,
					},
					callback: function (r) {
						frappe.show_alert("Attending", 5);
					},
				});
			});
		}
	},
});
