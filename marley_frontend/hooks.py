app_name = "marley_frontend"
app_title = "Marley Frontend"
app_publisher = "earthians Health Informatics Pvt. Ltd"
app_description = "Frontend UI application for Marley Healthcare app"
app_email = "info@earthianslive.com"
app_license = "mit"

# Apps
# ------------------

required_apps = ["healthcare"]

# Each item in the list will be shown as an app in the apps page
add_to_apps_screen = [
	{
		"name": "marley_frontend",
		"logo": "/assets/healthcare/images/healthcare.svg",
		"title": "Marley Frontend",
		"route": "/app/marley_frontend",
		"has_permission": "erpnext.check_app_permission",
	}
]

# Includes in <head>
# ------------------

# include js, css files in header of desk.html
# app_include_css = "/assets/marley_frontend/css/marley_frontend.css"
# app_include_js = "/assets/marley_frontend/js/marley_frontend.js"

# include js, css files in header of web template
# web_include_css = "/assets/marley_frontend/css/marley_frontend.css"
# web_include_js = "/assets/marley_frontend/js/marley_frontend.js"

# include custom scss in every website theme (without file extension ".scss")
# website_theme_scss = "marley_frontend/public/scss/website"

# include js, css files in header of web form
# webform_include_js = {"doctype": "public/js/doctype.js"}
# webform_include_css = {"doctype": "public/css/doctype.css"}

# include js in page
# page_js = {"page" : "public/js/file.js"}

# include js in doctype views
doctype_js = {
	"Healthcare Service Unit": "public/js/healthcare_service_unit.js",
	"Vital Signs": "public/js/vital_signs.js",
	"Patient Appointment": "public/js/patient_appointment.js",
}
# doctype_list_js = {"doctype" : "public/js/doctype_list.js"}
# doctype_tree_js = {"doctype" : "public/js/doctype_tree.js"}
# doctype_calendar_js = {"doctype" : "public/js/doctype_calendar.js"}

# Svg Icons
# ------------------
# include app icons in desk
# app_include_icons = "marley_frontend/public/icons.svg"

# Home Pages
# ----------

# application home page (will override Website Settings)
# home_page = "login"

# website user home page (by Role)
# role_home_page = {
# 	"Role": "home_page"
# }

fixtures = [{"dt": "Custom Field", "filters": [["module", "=", "Marley Frontend"]]}]

# Generators
# ----------

# automatically create page for each record of this doctype
# website_generators = ["Web Page"]

# automatically load and sync documents of this doctype from downstream apps
# importable_doctypes = [doctype_1]

# Jinja
# ----------

# add methods and filters to jinja environment
# jinja = {
# 	"methods": "marley_frontend.utils.jinja_methods",
# 	"filters": "marley_frontend.utils.jinja_filters"
# }

# Installation
# ------------

# before_install = "marley_frontend.install.before_install"
after_install = "marley_frontend.install.after_install"

# Uninstallation
# ------------

# before_uninstall = "marley_frontend.uninstall.before_uninstall"
# after_uninstall = "marley_frontend.uninstall.after_uninstall"

# Integration Setup
# ------------------
# To set up dependencies/integrations with other apps
# Name of the app being installed is passed as an argument

# before_app_install = "marley_frontend.utils.before_app_install"
# after_app_install = "marley_frontend.utils.after_app_install"

# Integration Cleanup
# -------------------
# To clean up dependencies/integrations with other apps
# Name of the app being uninstalled is passed as an argument

# before_app_uninstall = "marley_frontend.utils.before_app_uninstall"
# after_app_uninstall = "marley_frontend.utils.after_app_uninstall"

# Desk Notifications
# ------------------
# See frappe.core.notifications.get_notification_config

# notification_config = "marley_frontend.notifications.get_notification_config"

# Permissions
# -----------
# Permissions evaluated in scripted ways

# permission_query_conditions = {
# 	"Event": "frappe.desk.doctype.event.event.get_permission_query_conditions",
# }
#
# has_permission = {
# 	"Event": "frappe.desk.doctype.event.event.has_permission",
# }

# Document Events
# ---------------
# Hook on document methods and events

# doc_events = {
# 	"*": {
# 		"on_update": "method",
# 		"on_cancel": "method",
# 		"on_trash": "method"
# 	}
# }

# Scheduled Tasks
# ---------------

scheduler_events = {
	"daily": [
		"marley_frontend.marley_frontend.doctype.patient_token.patient_token.update_token_status",
	],
	# 	"all": [
	# 		"marley_frontend.tasks.all"
	# 	],
	# 	"daily": [
	# 		"marley_frontend.tasks.daily"
	# 	],
	# 	"hourly": [
	# 		"marley_frontend.tasks.hourly"
	# 	],
	# 	"weekly": [
	# 		"marley_frontend.tasks.weekly"
	# 	],
	# 	"monthly": [
	# 		"marley_frontend.tasks.monthly"
	# 	],
}

# Testing
# -------

# before_tests = "marley_frontend.install.before_tests"

# Overriding Methods
# ------------------------------
#
# override_whitelisted_methods = {
# 	"frappe.desk.doctype.event.event.get_events": "marley_frontend.event.get_events"
# }
#
# each overriding function accepts a `data` argument;
# generated from the base implementation of the doctype dashboard,
# along with any modifications made in other Frappe apps
# override_doctype_dashboards = {
# 	"Task": "marley_frontend.task.get_dashboard_data"
# }

# exempt linked doctypes from being automatically cancelled
#
# auto_cancel_exempted_doctypes = ["Auto Repeat"]

# Ignore links to specified DocTypes when deleting documents
# -----------------------------------------------------------

# ignore_links_on_delete = ["Communication", "ToDo"]

# Request Events
# ----------------
# before_request = ["marley_frontend.utils.before_request"]
# after_request = ["marley_frontend.utils.after_request"]

# Job Events
# ----------
# before_job = ["marley_frontend.utils.before_job"]
# after_job = ["marley_frontend.utils.after_job"]

# User Data Protection
# --------------------

# user_data_fields = [
# 	{
# 		"doctype": "{doctype_1}",
# 		"filter_by": "{filter_by}",
# 		"redact_fields": ["{field_1}", "{field_2}"],
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_2}",
# 		"filter_by": "{filter_by}",
# 		"partial": 1,
# 	},
# 	{
# 		"doctype": "{doctype_3}",
# 		"strict": False,
# 	},
# 	{
# 		"doctype": "{doctype_4}"
# 	}
# ]

# Authentication and authorization
# --------------------------------

# auth_hooks = [
# 	"marley_frontend.auth.validate"
# ]

# Automatically update python controller files with type annotations for this app.
# export_python_type_annotations = True

# default_log_clearing_doctypes = {
# 	"Logging DocType Name": 30  # days to retain logs
# }

website_route_rules = [
	{"from_route": "/healthcare/<path:app_path>", "to_route": "healthcare"},
]

standard_dropdown_items = [
	{
		"name1": "app_selector",
		"label": "Apps",
		"type": "Route",
		"route": "#",
		"is_standard": 1,
	},
	{
		"name1": "toggle_theme",
		"label": "Toggle theme",
		"type": "Route",
		"icon": "moon",
		"route": "#",
		"is_standard": 1,
	},
	{
		"name1": "about",
		"label": "About",
		"type": "Route",
		"icon": "info",
		"route": "#",
		"is_standard": 1,
	},
	{
		"name1": "separator",
		"label": "",
		"type": "Separator",
		"is_standard": 1,
	},
	{
		"name1": "logout",
		"label": "Log out",
		"type": "Route",
		"icon": "log-out",
		"route": "#",
		"is_standard": 1,
	},
]
