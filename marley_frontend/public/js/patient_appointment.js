frappe.ui.form.on("Patient Appointment", {
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
						frappe.model.open_mapped_doc({
							method: "healthcare.healthcare.doctype.patient_appointment.patient_appointment.make_encounter",
							frm: frm,
						});
					},
				});
			});
		}
	},
	onload_post_render: function (frm) {
		frm.remove_custom_button("Vital Signs", "Create");
		frm.add_custom_button(
			"Vital-Signs",
			function () {
				if (!frm.doc.patient) {
					frappe.throw(__("Please select patient"));
				}
				frappe.call({
					method: "marley_frontend.api.check_vitals",
					args: {
						patient: frm.doc.patient,
					},
					callback: function (r) {
						if (r && r.message) {
							frappe.set_route("Form", "Vital Signs", r.message);
						} else {
							frappe.route_options = {
								patient: frm.doc.patient,
								appointment: frm.doc.name,
								company: frm.doc.company,
							};
							frappe.new_doc("Vital Signs");
						}
					},
				});
			},
			"Create"
		);
	},
});
