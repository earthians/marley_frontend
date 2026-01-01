frappe.listview_settings["Patient Token"] = {
	hide_name_column: true,
	get_indicator: function (doc) {
		var colors = {
			"Checked In": "green",
			"Checked Out": "orange",
			"No Show": "red",
			Exited: "orange",
			Active: "blue",
		};
		return [__(doc.status), colors[doc.status], "status,=," + doc.status];
	},
};
