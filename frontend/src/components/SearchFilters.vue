<template>
	<div class="flex flex-1 space-x-4 py-4">
		<div class="w-1/5 py-2">
			<Autocomplete
				v-model="search"
				:options="searchOptions"
				placeholder="Appointment"
				size="lg"
				variant="subtle"
				@update:v-model="(val) => emit('update:search', val)"
			/>
		</div>
		<div class="w-1/5 py-2">
			<Autocomplete
				v-model="patientSearch"
				:options="patientSearchOptions"
				placeholder="Patient"
				size="lg"
				variant="subtle"
				@update:v-model="(val) => emit('update:patient_search', val)"
			>
				<template #prefix>
				</template>
				<template #item-prefix="{ option }">
				<img
					:src="option.image.toString()"
					class="h-4 w-4 rounded-full"
				>
				</template>
			</Autocomplete>
		</div>
		<div class="w-1/5 py-2">
			<FormControl
				type="number"
				placeholder="Mobile Number"
				size="sm"
				variant="subtle"
				v-model="mobileSearch"
				@update:v-model="(val) => emit('update:mobile_search', val)"
			/>
		</div>
		<div class="w-1/5 py-2">
			<Autocomplete
				v-model="department"
				:options="departmentOptions"
				placeholder="Department"
				size="lg"
				variant="subtle"
				@update:v-model="(val) => emit('update:department', val)"
			/>
		</div>
		<div class="w-1/5 py-2">
			<DatePicker
				v-model="dateValue"
				variant="subtle"
				placeholder="Date"
				:disabled="false"
				:formatter="(date) => getFormat(date, '', true)"
				@update:v-model="(val) => emit('update:dateValue', val)"
			/>
		</div>
		<div class="w-1/5 py-2">
			<Autocomplete
				:options=practitionerOptions
				v-model="practitioner"
				placeholder="Practitioners"
				:multiple="true"
				@update:v-model="(val) => emit('update:practitioner', val)"
			>
				<template #prefix>
				</template>
				<template #item-prefix="{ option }">
				<img
					:src="option.image.toString()"
					class="h-4 w-4 rounded-full"
				>
				</template>
			</Autocomplete>
		</div>
		<div class="w-1/5 py-2">
			<Autocomplete
				:options=visitypeOptions
				v-model="visitType"
				placeholder="Visit type"
				size="sm"
				@update:v-model="(val) => emit('update:visitType', val)"
			/>
		</div>
		<div class="w-1/5 py-2">
			<FormControl
				type="select"
				:options="[{ label: 'Appointment Time', value: 'Appointment Time' }, { label: 'Checkin Time', value: 'Checkin Time' }]"
				:size="'sm'"
				placeholder="Sort By"
				v-model="sort_by"
				@update:v-model="(val) => emit('update:sort_by', val)"
			/>
		</div>
		<div class="py-2">
			<Button :ref_for="true" theme="gray" size="sm" label="Clear Filters" :disabled="false" @click="clear_filters()">
				<div class="flex items-center truncate">
					<Tooltip :text="'Clear Filter'" placement="top">
						<slot name="icon">
							<FeatherIcon :name="'x'"
								class="size-4 text-ink-gray-7" />
						</slot>
					</Tooltip>
				</div>
			</Button>
		</div>
	</div>
</template>

<script setup>
	import { getFormat } from '@/utils'
	defineProps({
		searchOptions: Array,
	})

	import { createResource, Autocomplete, FormControl, DatePicker } from "frappe-ui"
	import { ref } from 'vue'

	const search = defineModel('search');
	const patientSearch = defineModel('patient_search');
	const mobileSearch = defineModel('mobile_search');
	const department = defineModel('department');
	const dateValue = defineModel('dateValue');
	const practitioner = defineModel('practitioner');
	const visitType = defineModel('visitType');
	const sort_by = defineModel('sort_by');
	let patientSearchOptions = ref([]);
	const practitionerOptions = ref([]);
	const departmentOptions = ref([]);
	const visitypeOptions = ref([]);

	let patients = createResource({
		url: "/api/method/marley_frontend.waitlist.get_patients",
		method: "GET",
		onSuccess(response) {
			patientSearchOptions.value = response.patients;
		},
		onError(error) {
			error_dialog.value = true;
		},
	});
	patients.fetch();

	const { fetch } = createResource({
		url: "/api/method/marley_frontend.waitlist.get_masters",
		method: "GET",
		onSuccess(response) {
			practitionerOptions.value = response.practitioners;
			departmentOptions.value = response.departments;
		},
		onError: (error) => {
			dialog_message = error.messages?.[0] || error;
			dialog_title = "Fetching Masters Failed";
			error_dialog.value = true;
		},
	});

	fetch();

	let get_types = createResource({
		url: "/api/method/marley_frontend.waitlist.get_appointment_types",
		method: "GET",
		onSuccess(response) {
			visitypeOptions.value = response;
		},
	});
	get_types.fetch();

	const emit = defineEmits([
		'update:search',
		'update:patient_search',
		'update:mobile_search',
		'update:department',
		'update:dateValue',
		'update:practitioner',
		'update:visitType',
		'update:sort_by'
	]);

	function clear_filters() {
		search.value = {};
		patientSearch.value = {};
		department.value = {};
		dateValue.value = new Date().toISOString().split('T')[0];
		practitioner.value = null;
		visitType.value = {};
		sort_by.value = "Appointment Time";
	}
</script>
