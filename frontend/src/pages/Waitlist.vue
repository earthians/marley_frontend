<template>
	<div class="flex-1 flex flex-col h-full overflow-auto bg-surface-white">
		<LayoutHeader>
			<template #left-header>
				<ViewBreadcrumbs v-model="viewControls" routeName="Waitlist" routeLabel="Appointment Desk" />
			</template>
			<template #right-header>
				<Button
					variant="solid"
					:label="'Book'"
					@click="onBookClick()"
				>
					<template #prefix><FeatherIcon name="plus" class="h-4" /></template>
				</Button>
			</template>
		</LayoutHeader>
		<div class="px-2 border-b">
			<SearchFilters
				v-model:search="search"
				v-model:patient_search="patient_search"
				v-model:mobile_search="mobile_search"
				v-model:department="department"
				v-model:dateValue="dateValue"
				v-model:practitioner="practitioner"
				v-model:visitType="visitType"
				v-model:sort_by="sort_by"
				:searchOptions="searchOptions"
				@update:v-model:search="val => $emit('update:search', val)"
				@update:v-model:patient_search="val => $emit('update:patient_search', val)"
				@update:v-model:mobile_search="val => $emit('update:mobile_search', val)"
				@update:v-model:department="val => $emit('update:department', val)"
				@update:v-model:dateValue="val => $emit('update:dateValue', val)"
				@update:v-model:practitioner="val => $emit('update:practitioner', val)"
				@update:v-model:visitType="val => $emit('update:visitType', val)"
				@update:v-model:sort_by="val => $emit('update:sort_by', val)"
			/>
		</div>
		
		<WaitlistTabs
			v-model:tab="activeTab"
			:appointment-tabs="appointment_tabs"
			@reload_appointment="Appointmentlist.reload()"
		/>
	</div>
	<AppointmentModal
		v-if="make_appointment_dialog"
		v-model="make_appointment_dialog"
		:defaults="defaults"
		@appointment_booked="Appointmentlist.reload()"
	/>

	<Dialog
		:options="{
		title: `${dialog_title}`,
		message: `${dialog_message}`,
		size: 'xl',
		icon: {
			name: 'alert-triangle',
			appearance: 'warning',
		},
		actions: [
			{
				label: 'OK',
				variant: 'solid',
			},
		],
	}" v-model="alert_dialog" @click="alert_dialog = false"/>

	<Dialog
		:options="{
		title: `${dialog_title}`,
		message: `${dialog_message}`,
		size: 'xl',
		icon: {
			name: 'check',
			appearance: 'success',
		},
		actions: [
			{
				label: 'OK',
				variant: 'solid',
			},
		],
	}" v-model="success_dialog" @click="success_dialog = false"/>
</template>

<script setup>
	import { ref, computed, watch, reactive, onMounted, inject } from 'vue'
	import LayoutHeader from '@/components/LayoutHeader.vue'
	import ViewBreadcrumbs from '@/components/ViewBreadcrumbs.vue'
	import AppointmentModal from '@/components/AppointmentModal.vue'
	import SearchFilters from '@/components/SearchFilters.vue'
	import WaitlistTabs from '@/components/WaitlistTabs.vue'
	import { createResource } from "frappe-ui"

	const search = ref("");
	const patient_search = ref("");
	const mobile_search = ref("");
	const department = ref("");
	const practitioner = ref("");
	const visitType = ref("");
	const sort_by = ref("Appointment Time");
	const dateValue = ref(new Date().toISOString().split('T')[0]);
	let dialog_message = ref("");
	let dialog_title = ref("");
	let default_appointment_type = ref("");

	const activeTab = ref(0);
	let total_count = ref(0);
	let open_count = ref(0);
	let scheduled_count = ref(0);
	let checkin_count = ref(0);
	let check_out_count = ref(0);
	let confirm_count = ref(0);
	let closed_count = ref(0);
	let cancelled_count = ref(0);
	let no_show_count = ref(0);
	let attending_count = ref(0);

	let success_dialog = ref(false);
	let alert_dialog = ref(false);
	const viewControls = ref(null)
	const make_appointment_dialog = ref(false);

	const searchOptions = ref([]);
	let all_appointments = ref([]);
	let opened_appointments = ref([]);
	let scheduled_appointments = ref([]);
	let Checked_in_appointments = ref([]);
	let Check_out_appointments = ref([]);
	let confirmed_appointments = ref([]);
	let closed_appointments = ref([]);
	let cancelled_appointments = ref([]);
	let No_show_appointments = ref([]);
	let attending_appointments = ref([]);

	const defaults = reactive({})

	const emit = defineEmits([
		'update:search',
		'patient_search',
		'mobile_search',
		'department',
		'dateValue',
		'practitioner',
		'update:visitType',
		'update:sort_by',
	])

	// const socket = inject("$socket");
	// if (socket) {
	// 	onMounted(() => {
	// 		socket.on("reload_waitlist", (data) => {
	// 			Appointmentlist.reload();
	// 		});
	// 	});
	// }

	let appointment_tabs = computed(() => [
		{ label: `All (${total_count.value})`, "name": "All", "appointments": all_appointments.value },
		{ label: `Open (${open_count.value})`, "name": "Open", "appointments": opened_appointments.value },
		{ label: `Scheduled (${scheduled_count.value})`, "name": "Scheduled", "appointments": scheduled_appointments.value },
		{ label: `Confirmed (${confirm_count.value})`, "name": "Confirmed", "appointments": confirmed_appointments.value },
		{ label: `Checked In (${checkin_count.value})`, "name": "Checked In", "appointments": Checked_in_appointments.value },
		{ label: `Attending (${attending_count.value})`, "name": "Attending", "appointments": attending_appointments.value },
		{ label: `Checked Out (${check_out_count.value})`, "name": "Checked Out", "appointments": Check_out_appointments.value },
		{ label: `Consulted (${closed_count.value})`, "name": "Consulted", "appointments": closed_appointments.value },
		{ label: `Cancelled (${cancelled_count.value})`, "name": "Cancelled", "appointments": cancelled_appointments.value },
		{ label: `No Show (${no_show_count.value})`, "name": "No Show", "appointments": No_show_appointments.value }
	]);

	let Appointmentlist = createResource({
		url: "/api/method/marley_frontend.waitlist.get_appointments",
		method: "GET",
		makeParams() {
			return {
				practitioner: practitioner.value ? JSON.stringify([...practitioner.value]) : null,
				appointment_date: dateValue.value,
				appointment_type: visitType.value ? visitType.value.value : null,
				search_by: search.value ? search.value.value : null,
				patient: patient_search.value ? patient_search.value.value : null,
				department: department.value ? department.value.value : null,
				mobile: mobile_search.value,
				sort_by: sort_by?.value || null
			}
		},
		onSuccess(response) {
			if (response) {
				all_appointments.value = response["All"];
				Checked_in_appointments.value = response["Checked In"];
				confirmed_appointments.value = response["Confirmed"];
				attending_appointments.value = response["Attending"];
				Check_out_appointments.value = response["Checked Out"];
				opened_appointments.value = response["Open"];
				scheduled_appointments.value = response["Scheduled"];
				closed_appointments.value = response["Consulted"];
				cancelled_appointments.value = response["Cancelled"];
				No_show_appointments.value = response["No Show"];
				total_count.value = response["All"] ? response["All"].length : 0;
				open_count.value = response["Open"] ? response["Open"].length : 0;
				scheduled_count.value = response["Scheduled"] ? response["Scheduled"].length : 0;
				checkin_count.value = response["Checked In"] ? response["Checked In"].length : 0;
				check_out_count.value = response["Checked Out"] ? response["Checked Out"].length : 0;
				confirm_count.value = response["Confirmed"] ? response["Confirmed"].length : 0;
				closed_count.value = response["Consulted"] ? response["Consulted"].length : 0;
				cancelled_count.value = response["Cancelled"] ? response["Cancelled"].length : 0;
				no_show_count.value = response["No Show"] ? response["No Show"].length : 0;
				attending_count.value = response["Attending"] ? response["Attending"].length : 0;
			}

			searchOptions.value = response["All"].map((search) => ({
				label: search.title,
				value: search.name
			}));
		},
		onError(error) {
			dialog_message = error.messages?.[0] || error;
			dialog_title = "Failed to load appointments";
			alert_dialog.value = true;
		}
	});
	Appointmentlist.fetch();

	watch(mobile_search, () => {
		Appointmentlist.fetch();
	});

	watch(department, () => {
		Appointmentlist.fetch();
	});

	watch(search, () => {
		Appointmentlist.fetch();
	});

	watch(patient_search, () => {
		Appointmentlist.fetch();
	})

	watch(dateValue, () => {
		Appointmentlist.fetch();
	});

	watch(visitType, () => {
		Appointmentlist.fetch();
	});

	watch(practitioner, () => {
		Appointmentlist.fetch()
	});

	watch(sort_by, () => {
		Appointmentlist.fetch();
	});

	function onBookClick() {
		defaults["patient"] = patient_search?.value || {};
		defaults["date"] = dateValue?.value || new Date().toISOString().split('T')[0];
		defaults["practitioner"] = practitioner?.value || {};
		defaults["appointment_type"] = visitType?.value || default_appointment_type.value;

		make_appointment_dialog.value = true;
	};

	let get_default_appointment_type = createResource({
		url: "/api/method/marley_frontend.waitlist.get_default_appointment",
		method: "GET",
		onSuccess(response) {
			default_appointment_type.value = response
		},
		onError: (error) => {
			dialog_message = error.messages?.[0] || error;
			dialog_title = "Appointment Type fetching failed";
			alert_dialog.value = true;
		},
	});
	get_default_appointment_type.fetch();
</script>
