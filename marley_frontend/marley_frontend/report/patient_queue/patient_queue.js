// Copyright (c) 2023, earthians and contributors
// For license information, please see license.txt

frappe.query_reports["Patient Queue"] = {
	filters: [
		{
			fieldname: "service_unit",
			label: __("Queues"),
			fieldtype: "Link",
			options: "Healthcare Service Unit",
		},
	],
	formatter: function (value, row, column, data, default_formatter) {
		value = default_formatter(value, row, column, data);
		if (data) {
			if (data[column.name + "-priority"] == 1) {
				var $value = $(value).css("color", "red").css("font-weight", "bold");
				value = $value.wrap("<p></p>").parent().html();
			}
		}
		return value;
	},
};
