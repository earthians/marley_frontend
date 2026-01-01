// Copyright (c) 2023, earthians and contributors
// For license information, please see license.txt

frappe.ui.form.on("Patient Token", {
	refresh: function (frm) {
		if (frm.doc.status != "Expired") {
			frm.add_custom_button(__("Check In"), () => {
				frappe.prompt(
					{
						label: __("Service Unit"),
						fieldname: "queue_dn",
						fieldtype: "Link",
						default: frm.doc.current_service_unit,
						options: "Healthcare Service Unit",
					},
					values => {
						frm.call("check_in", {
							queue_dn: values.queue_dn,
						}).then(() => {
							frm.refresh();
						});
					}
				);
			});
		}

		frm.add_custom_button(__("Attend"), () => {
			frappe.prompt(
				{
					label: __("Service Unit"),
					fieldname: "queue_dn",
					fieldtype: "Link",
					options: "Healthcare Service Unit",
					default: frm.doc.current_service_unit,
					read_only: 1 ? frm.doc.patient_journey_stops.length == 1 : 0,
				},
				values => {
					frm.call("attend", {
						queue_dn: values.queue_dn,
					}).then(() => {
						frm.refresh();
					});
				}
			);
		});

		frm.add_custom_button(__("Check Out"), () => {
			frappe.prompt(
				{
					label: __("Service Unit"),
					fieldname: "queue_dn",
					fieldtype: "Link",
					options: "Healthcare Service Unit",
					read_only: 1 ? frm.doc.patient_journey_stops.length == 1 : 0,
					default: frm.doc.current_service_unit,
				},
				values => {
					frm.call("check_out", {
						queue_dn: values.queue_dn,
					}).then(() => {
						frm.refresh();
					});
				}
			);
		});

		if (frm.doc.head) {
			frm.add_custom_button(__("No Show"), () => {
				frappe.confirm(
					"Are you sure you want to proceed?",
					() => {
						frm.call("no_show", {}).then(() => {
							frm.refresh();
						});
					},
					() => {}
				);
			});
		}

		if (frm.doc.next) {
			frm.add_custom_button(__("View Next"), () => {
				frappe.set_route("Form", "Patient Token", frm.doc.next);
			});
		}
	},
});
