<template>
	<div class="w-full h-full bg-surface-white">
		<div class="flex p-4 items-center border-b border">
			<div class="p-4 w-1/4">
				<Autocomplete :options=type_options placeholder="Room Type" v-model="room_type_filter" size="sm">
					<template #prefix>
					</template>
					<template #item-prefix="{ option }">
					</template>
				</Autocomplete>
			</div>
			<div class="p-3 w-1/4">
				<Autocomplete :options=service_unit_options placeholder="Bed" v-model="bed_filter" size="sm">
					<template #prefix>
					</template>
					<template #item-prefix="{ option }">
					</template>
				</Autocomplete>
			</div>
			<div class="p-3 w-1/4">
				<Autocomplete :options=patient_options placeholder="Patient" v-model="patient_filter" size="sm">
					<template #prefix>
					</template>
					<template #item-prefix="{ option }">
					</template>
				</Autocomplete>
			</div>
			<div class="p-3 w-1/4">
				<FormControl type="select" :options="room_status_options" placeholder="Room Status"
					v-model="status_filter" size="sm" />
			</div>
			<div class="w-1/5">
				<DatePicker v-model="date_filter" variant="subtle" placeholder="Date" :disabled="false" :formatter="(date) => getFormat(date, '', true)" />
			</div>
			<div class="p-1">
				<Button :ref_for="true" theme="gray" label="Clear Filters" :disabled="false" @click="clear_filters()">
					<div class="flex items-center truncate">
						<Tooltip :text="'Clear Filter'" placement="top">
							<slot name="icon">
								<FeatherIcon :name="'x'" class="size-4 text-ink-gray-7" />
							</slot>
						</Tooltip>
					</div>
				</Button>
			</div>
		</div>

		<div class="h-[calc(95vh-64px)] flex">
			<!-- Left Panel: Bed Layout -->
			<div class="w-full md:w-3/4 p-4 md:p-6 overflow-y-auto">
				<div v-for="(ward, index) in item_list" :key="index" class="mb-6">
					<h2 class="text-gray-500 font-bold text-base md:text-lg mb-3">{{ ward.room_type_details }}</h2>

					<!-- Responsive grid -->
					<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3">
						<div
							v-for="bed in ward.rooms"
							:key="bed.name"
							class="cursor-pointer flex flex-col items-center justify-center rounded-lg p-3 sm:p-4 shadow-sm transition-all border text-center"
							:class="{
								'bg-red-200 border-red-400 text-red-900': bed.room_status === 'Occupied' && bed.name != selectedBed?.name,
								'bg-green-200 border-green-400 text-green-900': bed.room_status === 'Vacant' && bed.name != selectedBed?.name,
								'bg-blue-200 border-blue-400 text-blue-900': bed.room_status === 'Cleaning' && bed.name != selectedBed?.name,
								'bg-violet-200 border-violet-400 text-violet-900': bed.room_status === 'Under Maintenance' && bed.name != selectedBed?.name,
								'!bg-gray-300 !text-gray-900 border-gray-400 !shadow-md': bed.name === selectedBed?.name,
							}"
							@click="open_room_details(bed)"
						>
							<!-- Bed Icon -->
							<Bed class="w-6 h-6 sm:w-8 sm:h-8 mb-2" />

							<!-- Bed Name -->
							<span
								class="text-xs sm:text-sm font-medium truncate w-full max-w-[80px] sm:max-w-[100px] block overflow-hidden text-ellipsis whitespace-nowrap"
								:title="bed.healthcare_service_unit_name"
							>
								{{ bed.healthcare_service_unit_name }}
							</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Right Panel: Bed Details & Allocation -->
			<div class="w-full md:w-1/3 lg:w-1/4 h-auto md:h-[calc(96vh-64px)] p-4 sm:p-6 shadow-lg border rounded-lg mt-4 md:mt-0">
				<div v-if="selectedBed.name">
					<!-- Status Badges -->
					<div class="flex flex-wrap items-center mt-4 gap-2">
						<span
							class="px-3 py-1 text-xs font-bold rounded-md"
							:class="{
								'bg-green-200 text-green-700': selectedBed.room_status === 'Vacant',
								'bg-red-200 text-red-700': selectedBed.room_status === 'Occupied',
								'bg-blue-200 text-gray-700': selectedBed.room_status === 'Cleaning',
								'bg-violet-700 text-white': selectedBed.room_status === 'Under Maintenance',
							}"
						>
							{{ selectedBed.room_status.toUpperCase() }}
						</span>

						<span
							v-if="['Admission Scheduled', 'Admitted'].includes(selectedBed.ip_status) && selectedBed.room_status === 'Cleaning'"
							class="px-3 py-1 text-xs font-bold rounded-md bg-red-200 text-red-700"
						>
							{{ selectedBed.ip_status.toUpperCase() }}
						</span>
					</div>

					<!-- Bed Details -->
					<h3 class="mt-3 font-semibold text-lg sm:text-xl break-words">
						{{ selectedBed.healthcare_service_unit_name }}
					</h3>
					<p class="text-gray-600 mt-1 text-sm sm:text-base">
						₹{{ selectedBed.rate }} / {{ selectedBed.uom }}
					</p>

					<!-- Occupancy Details -->
					<div
						v-if="selectedBed.room_status == 'Occupied' || ['Admission Scheduled', 'Admitted'].includes(selectedBed.ip_status)"
						class="mt-6"
					>
						<h3 class="font-semibold text-base sm:text-xl py-2 border-b border-gray-200">Occupancy Details</h3>

						<div class="space-y-1 text-gray-600 text-sm sm:text-base mt-2">
							<p><b>Patient: </b> {{ selectedBed.patient_name }}</p>
							<p class="mt-1"><b>Encounter: </b> {{ selectedBed.admission_encounter }}</p>
							<p class="mt-1"><b>Practitioner: </b> {{ selectedBed.primary_practitioner }}</p>
							<p class="mt-1">
								<b>IPD: </b>
								<button class="text-blue-600 underline" @click="navigate_to_ip(selectedBed.ip_record)">
									{{ selectedBed.ip_record }}
								</button>
							</p>
							<p class="mt-1"><b>IP Status: </b> {{ selectedBed.ip_status }}</p>
							<p class="mt-1"><b>Checked In Time: </b> {{ formatDatetime(selectedBed.check_in) }}</p>
							<p class="mt-1"><b>Admission Ordered For: </b> {{ formatDate(selectedBed.admission_ordered_for) }}</p>
							<p class="mt-1"><b>Expected Discharge: </b> {{ formatDate(selectedBed.expected_discharge) }}</p>
							<p class="mt-1"><b>Admitted On: </b> {{ formatDatetime(selectedBed.admitted_datetime) }}</p>
							<p class="mt-1"><b>Discharged On: </b> {{ formatDatetime(selectedBed.discharge_datetime) }}</p>
						</div>
					</div>

					<!-- Actions Section -->
					<div class="mt-6 py-6 px-3 border-t border-gray-200">
						<h3 class="flex justify-center text-base sm:text-lg font-semibold">Actions</h3>

						<div class="flex flex-wrap justify-center gap-3 mt-4">
							<!-- Each button shrinks and wraps properly on small screens -->
							<Button
								v-if="selectedBed.room_status == 'Vacant'"
								variant="outline"
								theme="gray"
								size="xl"
								label="Schedule Admission"
								:disabled="selectedBed.disable_schedule"
								@click="schedule_admission_dialog(selectedBed)"
								class="px-3 py-4 sm:px-4 sm:py-6 rounded-md flex-shrink"
							>
								<Tooltip :text="'Schedule Admission'" placement="top">
									<slot name="icon">
										<FeatherIcon :name="'plus'" class="size-8 sm:size-10 text-ink-gray-7" />
									</slot>
								</Tooltip>
							</Button>

							<Button
								v-if="selectedBed.ip_status == 'Admission Scheduled'"
								variant="outline"
								theme="gray"
								size="xl"
								label="Admit"
								@click="admit_confirm = true"
								class="px-3 py-4 sm:px-4 sm:py-6 rounded-md flex-shrink"
							>
								<Tooltip :text="'Admit'" placement="top">
									<slot name="icon">
										<FeatherIcon :name="'user-plus'" class="size-8 sm:size-10 text-ink-gray-7" />
									</slot>
								</Tooltip>
							</Button>

							<Button
								v-if="selectedBed.room_status == 'Under Maintenance'"
								variant="outline"
								theme="gray"
								size="xl"
								label="Set as Vacant"
								@click="set_status(selectedBed, 'Vacant')"
								class="px-3 py-4 sm:px-4 sm:py-6 rounded-md flex-shrink"
							>
								<Tooltip :text="'Set as Vacant'" placement="top">
									<slot name="icon">
										<FeatherIcon :name="'check'" class="size-8 sm:size-10 text-ink-gray-7" />
									</slot>
								</Tooltip>
							</Button>

							<Button
								v-if="selectedBed.room_status == 'Occupied' && selectedBed.ip_status == 'Admitted'"
								variant="outline"
								theme="gray"
								size="xl"
								label="Transfer"
								@click="transfer_dialog(selectedBed)"
								class="px-3 py-4 sm:px-4 sm:py-6 rounded-md flex-shrink"
							>
								<Tooltip :text="'Transfer'" placement="top">
									<slot name="icon">
										<FeatherIcon :name="'repeat'" class="size-8 sm:size-10 text-ink-gray-7" />
									</slot>
								</Tooltip>
							</Button>

							<Button
								v-if="selectedBed.room_status == 'Vacant'"
								variant="outline"
								theme="gray"
								size="xl"
								label="Under Maintenance"
								@click="set_status(selectedBed, 'Under Maintenance')"
								class="px-3 py-4 sm:px-4 sm:py-6 rounded-md flex-shrink"
							>
								<Tooltip :text="'Under Maintenance'" placement="top">
									<slot name="icon">
										<FeatherIcon :name="'alert-triangle'" class="size-8 sm:size-10 text-ink-gray-7" />
									</slot>
								</Tooltip>
							</Button>

							<Button
								v-if="['Under Maintenance', 'Occupied', 'Vacant'].includes(selectedBed.room_status)"
								variant="outline"
								theme="gray"
								size="xl"
								label="Cleaning"
								@click="set_status(selectedBed, 'Cleaning')"
								class="px-3 py-4 sm:px-4 sm:py-6 rounded-md flex-shrink"
							>
								<Tooltip :text="'Cleaning'" placement="top">
									<slot name="icon">
										<FeatherIcon :name="'zap'" class="size-8 sm:size-10 text-ink-gray-7" />
									</slot>
								</Tooltip>
							</Button>

							<Button
								v-if="selectedBed.room_status == 'Cleaning'"
								variant="outline"
								theme="gray"
								size="xl"
								label="Cleaning Completed"
								@click="set_status(selectedBed, 'Cleaning Completed')"
								class="px-3 py-4 sm:px-4 sm:py-6 rounded-md flex-shrink"
							>
								<Tooltip :text="'Cleaning Completed'" placement="top">
									<slot name="icon">
										<FeatherIcon :name="'check'" class="size-8 sm:size-10 text-ink-gray-7" />
									</slot>
								</Tooltip>
							</Button>
						</div>
					</div>
				</div>

				<!-- Fallback -->
				<div v-else class="text-gray-500 text-center mt-10 text-sm sm:text-base">Select a bed</div>
			</div>

		</div>

		<!-- alert dialog -->
		<Dialog :options="{
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
		}" v-model="alert_dialog" @click="alert_dialog.value = false" />

		<!-- success dialog -->
		<Dialog :options="{
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
		}" v-model="success_dialog" @click="success_dialog.value = false" />

		<!-- Allocate bed dialog -->
		<Dialog v-model="allocate_bed_dialog" :options="{
			size: '2xl',
		}">
			<template #body-title>
				<h3 class="font-bold">Allocate Bed</h3>
			</template>
			<template #body-content>
				<div class="mb-4">
					<div class="grid grid-cols-3 gap-2">
						<div class="py-1 w-full">
							<FormControl type="autocomplete" :options="allocate_patient_options" label="Patient"
								v-model="allocate_patient" size="sm" variant="subtle" :disabled="false"
								:required="true" />
							<ErrorMessage v-if="errors.allocate_patient" :message="errors.allocate_patient" />
						</div>
						<div class="py-1 w-full">
							<FormControl type="text" label="Patient ID" v-model="allocate_patient_id" size="sm"
								variant="subtle" :disabled="true" />
						</div>
						<div class="py-1 w-full">
							<FormControl type="autocomplete" :options="allocate_encounter_options" label="Encounter"
								v-model="allocate_encounter" size="sm" variant="subtle" :disabled="false" />
						</div>
						<div class="py-1 w-full">
							<DateTimePicker v-model="allocate_admission_date" variant="subtle"
								placeholder="Admission Date" label="Admission Date" :disabled="false"
								:required="true" :formatter="(date) => getFormat(date, '', true, true)" />
							<ErrorMessage v-if="errors.allocate_admission_date"
								:message="errors.allocate_admission_date" />
						</div>
						<div class="py-1 w-full">
							<FormControl type="autocomplete" :options="allocate_primary_consultant_options"
								label="Primary Consultant" v-model="allocate_primary_consultant" size="sm"
								variant="subtle" :disabled="false" :required="true" />
							<ErrorMessage v-if="errors.allocate_primary_consultant"
								:message="errors.allocate_primary_consultant" />
						</div>
						<div class="py-1 w-full">
							<FormControl type="autocomplete" :options="allocate_secondary_consultant_options"
								label="Secondary Consultant" v-model="allocate_secondary_consultant" size="sm"
								variant="subtle" :disabled="false" :required="false" />
						</div>
						<div class="py-1 w-full">
							<FormControl type="text" label="Expected Length of Stay"
								v-model="allocate_expected_length_of_stay" size="sm" variant="subtle"
								:disabled="false" :required="true" />
							<ErrorMessage v-if="errors.allocate_expected_length_of_stay"
								:message="errors.allocate_expected_length_of_stay" />
						</div>
					</div>
					<div class="grid grid-cols-3 gap-2 py-4">
						<div class="py-1 w-full">
							<FormControl type="text" label="Bed Type" v-model="allocate_bed_type" size="sm"
								variant="subtle" :disabled="true" />
						</div>
						<div class="py-1 w-full">
							<FormControl type="autocomplete" :options="allocate_rooms_options" label="Bed"
								v-model="allocate_bed" size="sm" variant="subtle" :disabled="true" />
						</div>
					</div>
				</div>
				<div>
					<ErrorMessage v-if="errors.allocation_error" :message="errors.allocation_error" />
				</div>
			</template>
			<template #actions>
				<Button variant="solid" @click="schedule_admission()" :disabled="can_admit">Order Admission</Button>
			</template>
		</Dialog>

		<!-- transfer bed dialog -->
		<Dialog v-model="transfer_bed_dialog" :options="{
			size: '2xl',
		}">
			<template #body-title>
				<h3 class="font-bold">Transfer Bed</h3>
			</template>
			<template #body-content>
				<div class="mb-4">
					<div class="flex gap-2 mb-4">
						<Switch
							label="For Procedure"
							:disabled="false"
							v-model="for_procedure"
						/>
					</div>
					<div class="grid grid-cols-3 gap-2">
						<div class="py-1 w-full">
							<FormControl type="text" label="Patient" v-model="transfer_patient" size="sm" variant="subtle"
								:disabled="true" />
						</div>
						<div class="py-1 w-full">
							<FormControl type="text" label="Patient ID" v-model="transfer_patient_id" size="sm"
								variant="subtle" :disabled="true" />
						</div>
						<div class="py-1 w-full">
							<FormControl type="text" label="IPD No" v-model="transfer_ipd" size="sm"
								variant="subtle" :disabled="true" />
						</div>
						<div class="py-1 w-full">
							<FormControl type="text" label="Leave From"
								v-model="transfer_leave_from" size="sm" variant="subtle" :disabled="true" />
						</div>
					</div>
					<div class="grid grid-cols-3 gap-2 py-4">
						<div class="py-1 w-full">
							<FormControl type="autocomplete" :options="type_options" label="Transfer Bed Type"
								v-model="transfer_bed_type" size="sm" variant="subtle" :disabled="true" :required="true" />
							<ErrorMessage v-if="errors.transfer_bed_type"
								:message="errors.transfer_bed_type" />
						</div>
						<div class="py-1 w-full">
							<FormControl type="autocomplete" :options="transfer_rooms_options" label="Transfer To"
								v-model="transfer_bed" size="sm" variant="subtle" :disabled="true" :required="true" />
							<ErrorMessage v-if="errors.transfer_bed"
								:message="errors.transfer_bed" />
						</div>
					</div>
				</div>
				<div>
					<ErrorMessage v-if="errors.transfer_error" :message="errors.transfer_error" />
				</div>
			</template>
			<template #actions>
				<Button :loading="admission_loader" :disabled="admission_loader" variant="solid" @click="transfer_patient_bed()">Transfer Patient</Button>
			</template>
		</Dialog>

		<Dialog v-model="admit_confirm" :options="{
			size: '2xl',
			icon: {
				name: 'alert-triangle',
				appearance: 'warning',
			},
		}">
			<template #body-title>
				<h3 class="font-bold">Confirm</h3>
			</template>
			<template #body-content>
				<div class="mb-4">
					<div class="flex gap-2 mb-4">
						<p>Are you sure you want to admit this patient?</p>
					</div>
					<div class="grid grid-cols-2 gap-2">
						<div class="py-1 w-full">
							<FormControl type="text" label="Patient" v-model="admit_patient_name" size="sm"
								variant="subtle" :disabled="true" />
						</div>
						<div class="py-1 w-full">
							<FormControl type="text" label="Room" v-model="admit_su_name" size="sm" variant="subtle"
								:disabled="true" />
						</div>
						<div class="py-1 w-full">
							<DateTimePicker
								v-model="admit_checkin"
								variant="subtle"
								placeholder="Checkin"
								:disabled="false"
								label="Checkin"
							/>
						</div>
					</div>
				</div>
				<div>
					<ErrorMessage v-if="errors.admit_error" :message="errors.admit_error" />
				</div>
			</template>
			<template #actions>
				<Button :loading="admission_loader" :disabled="admission_loader" variant="solid" @click="admit_patient.submit(), admission_loader=true">Confirm</Button>
			</template>
		</Dialog>

		<Dialog :options="{
			title: 'Confirm',
			message: 'Click confirm to go to Home page',
			size: 'xl',
			icon: {
				name: 'alert-triangle',
				appearance: 'warning',
			},
			actions: [
				{
					label: 'Confirm',
					variant: 'solid',
					onClick: () => {
						return go_to_desk_page();
					},
				},
				{
					label: 'Cancel',
					onClick: () => {
						return confirm_to_desk_dialog = false;
					},
				},
			],
		}" v-model="confirm_to_desk_dialog"/>
	</div>
</template>

<style scoped>
	::v-deep(.bg-green-100) {
		color: #379420 !important;
	}
</style>

<script>
	export default {
		methods: {
			formatDatetime(dateString) {
				if (!dateString) return "";

				return new Date(dateString).toLocaleString("en-GB", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
					hour: "2-digit",
					minute: "2-digit",
					hour12: true,
				}).replace(",", "");
			},
			formatDate(dateString) {
				if (!dateString) return "";

				return new Date(dateString).toLocaleString("en-GB", {
					day: "2-digit",
					month: "2-digit",
					year: "numeric",
				}).replace(",", "");
			},
		},
	};
</script>

<script setup>
	import { ref, watch } from "vue";
	import {
		createResource,
		Tooltip,
		DatePicker,
		DateTimePicker,
		Autocomplete,
		Button,
		Dialog,
		FormControl,
		ErrorMessage,
		Switch,
	} from "frappe-ui";
	import { getFormat } from '@/utils'
	import { Bed } from 'lucide-vue-next'

	// master options
	let service_unit_options = ref([]);
	let type_options = ref([]);
	let patient_options = ref([]);
	let allocate_patient_options = ref([]);
	let allocate_primary_consultant_options = ref([]);
	let allocate_secondary_consultant_options = ref([]);
	let allocate_encounter_options = ref([]);
	let allocate_rooms_options = ref([]);
	let transfer_rooms_options = ref([]);
	let room_status_options = ref([]);

	// filter fields
	let bed_filter = ref("");
	let room_type_filter = ref("");
	let patient_filter = ref("");
	let status_filter = ref("");
	let date_filter = ref(new Date().toISOString().split('T')[0]);

	let item_list = ref([]);
	let selectedBed = ref({});
	let errors = ref({});

	// dialog fields
	let allocate_admission_date = ref(new Date().toLocaleString('sv-SE').replace('T', ' '));
	let allocate_patient_id = ref("");
	let allocate_patient = ref({label: '', value: ''});
	let allocate_primary_consultant = ref({label: '', value: ''});
	let allocate_secondary_consultant = ref({label: '', value: ''});
	let allocate_bed_type = ref("");
	let allocate_bed = ref({label: '', value: ''});
	let allocate_encounter = ref({label: '', value: ''});
	let allocate_expected_length_of_stay = ref(0);
	let transfer_patient = ref({label: '', value: ''});
	let transfer_patient_id = ref("");
	let transfer_leave_from = ref("");
	let transfer_bed_type = ref({label: '', value: ''});
	let transfer_bed = ref({label: '', value: ''});
	let transfer_ipd = ref("");
	let for_procedure = ref(false);
	let admit_patient_name = ref("");
	let admit_su_name = ref("");
	let admit_checkin = ref(new Date().toLocaleString('sv-SE').replace('T', ' '));

	// dialogs
	let alert_dialog = ref(false);
	let allocate_bed_dialog = ref(false);
	let transfer_bed_dialog = ref(false);
	let success_dialog = ref(false);
	let admit_confirm = ref(false);
	let dialog_title = ref("");
	let dialog_message = ref("");

	let logo = ref("");
	let confirm_to_desk_dialog = ref(false);
	let can_admit = ref(false);
	let admission_loader = ref(false);

	let get_logo = createResource({
		url: "/api/method/marley_frontend.api.get_logo_image",
		method: "GET",
		makeParams() {
			return {};
		},
		onSuccess(response) {
			if (response) {
				logo.value = response;
			}
			else {
				logo.value = "https://raw.githubusercontent.com/frappe/healthcare/develop/healthcare/public/images/healthcare.svg";
			}
		},
	});
	get_logo.fetch();

	let get_filter_options = createResource({
		url: "/api/method/marley_frontend.bed_management.get_filter_options",
		method: "GET",
		makeParams() {
			return {
				room_type_filter: room_type_filter.value?.value || null
			}
		},
		onSuccess(response) {
			if (response) {
				console.log(response.allocate_patient_options)
				type_options.value = response.type_options;
				service_unit_options.value = response.service_unit_options;
				patient_options.value = response.patient_options;
				allocate_patient_options.value = response.allocate_patient_options;
				allocate_primary_consultant_options.value = response.consultant_options;
				allocate_secondary_consultant_options.value = response.consultant_options;
				allocate_rooms_options.value = response.allocate_rooms_options;
				room_status_options.value = response.room_status_options;
			}
		},
		onError: (error) => {
			dialog_message = error.messages?.[0] || error;
			dialog_title = "Filter Data Fetching Failed";
			alert_dialog.value = true;
		},
	});
	get_filter_options.fetch();

	let get_room_details = createResource({
		url: '/api/method/marley_frontend.bed_management.get_room_details',
		method: 'GET',
		makeParams() {
			return {
				room_type_filter: room_type_filter.value?.value || null,
				bed_filter: bed_filter.value?.value || null,
				date_filter: date_filter.value || null,
				patient_filter: patient_filter.value?.value || null,
				status_filter: status_filter.value || null
			};
		},
		onSuccess(response) {
			item_list.value = response || [];
		},
		onError(error) {
			dialog_message = error;
			dialog_title = "Rooms Fetching Failed";
			alert_dialog.value = true;
		}
	});
	get_room_details.fetch();

	watch(bed_filter, () => {
		get_room_details.fetch();
	});

	watch(room_type_filter, () => {
		get_filter_options.fetch();
		get_room_details.fetch();
	});

	watch(status_filter, () => {
		get_room_details.fetch();
	});

	watch(patient_filter, () => {
		get_room_details.fetch();
	});

	watch(date_filter, () => {
		selectedBed.value = {};
		get_room_details.fetch();
	});

	watch(allocate_patient, (value) => {
		if (value) {
			allocate_patient_id.value = value.value;
			get_encounters(value.value);
		}
	});

	watch(transfer_bed_type, (value) => {
		get_filter_rooms(value);
	});

	watch(allocate_expected_length_of_stay, (value) => {
		if (value && allocate_admission_date.value) {
			validate_room_vacancy(allocate_admission_date.value, value, selectedBed.value.admission_ordered_for, selectedBed.value.ip_record, selectedBed.value.ip_status)
		}
	});

	watch(allocate_admission_date, (value) => {
		if (value && allocate_expected_length_of_stay.value) {
			validate_room_vacancy(value, allocate_expected_length_of_stay.value, selectedBed.value.admission_ordered_for, selectedBed.value.ip_record, selectedBed.value.ip_status)
		}
	});

	function validate_room_vacancy(allocate_admission_date, length_of_stay, admission_ordered_for, ip_record, status) {
		if (length_of_stay && allocate_admission_date && status == "Admission Scheduled") {
			const exp_discharge = new Date(allocate_admission_date);
			exp_discharge.setDate(exp_discharge.getDate() + Number(length_of_stay));

			const admission_ordered_date = new Date(admission_ordered_for);

			if (selectedBed.value.admission_ordered_for && admission_ordered_date < exp_discharge) {
				errors.value.allocation_error = `Length of stay overlaps with IP Record ${ip_record} ordered for Date: ${admission_ordered_for}`
				can_admit.value = true;
			} else {
				errors.value.allocation_error = ""
				can_admit.value = false;
			}
		}
	}

	function get_filter_rooms(room_type) {
		let get_filter_room = createResource({
			url: "/api/method/marley_frontend.bed_management.get_filter_room",
			method: "GET",
			makeParams() {
				return {
					room_type: room_type?.value || null
				}
			},
			onSuccess(response) {
				if (response) {
					transfer_rooms_options.value = response;
				}
			},
			onError: (error) => {
				dialog_message = error.messages?.[0] || error;
				dialog_title = "Rooms Fetching Failed";
				alert_dialog.value = true;
			},
		});
		get_filter_room.fetch();
	}

	function clear_filters() {
		bed_filter.value = {label: '', value: ''};
		room_type_filter.value = {label: '', value: ''};
		status_filter.value = null;
		patient_filter.value = {label: '', value: ''};
		date_filter.value = new Date().toISOString().split('T')[0];
		selectedBed.value = {label: '', value: ''};
	};

	function open_room_details(room) {
		selectedBed.value = room;
		admit_patient_name.value = selectedBed.value.patient_name;
		admit_su_name.value = selectedBed.value.healthcare_service_unit_name;
		errors.value.admit_error = "";
	};

	function schedule_admission_dialog(room) {
		get_encounters();
		allocate_encounter.value = {label: '', value: ''};;
		allocate_patient.value = {label: '', value: ''};;
		allocate_patient_id.value = null;
		allocate_primary_consultant.value = {label: '', value: ''};;
		allocate_secondary_consultant.value = {label: '', value: ''};;
		allocate_expected_length_of_stay.value = 0;
		allocate_bed_type.value = room.service_unit_type;
		allocate_bed.value = { "label": room.healthcare_service_unit_name, "value": room.name };
		allocate_bed_dialog.value = true;
	};

	let admit_patient = createResource({
		url: "/api/method/marley_frontend.bed_management.admit_patient",
		method: "GET",
		makeParams() {
			return {
				ip_record: selectedBed.value?.ip_record || null,
				service_unit: selectedBed.value?.name || null,
				check_in: admit_checkin?.value || null,
				expected_discharge: selectedBed.value?.expected_discharge || null,
			}
		},
		onSuccess(response) {
			admission_loader.value = false;
			get_room_details.fetch();
			selectedBed.value = {};
			errors.value.admit_error = "";
			admit_confirm.value =false;
			dialog_message = "Patient Admitted Successfully";
			dialog_title = "Admitted successfully";
			success_dialog.value = true;
		},
		onError(error) {
			admission_loader.value = false;
			errors.value.admit_error = error.messages?.[0] || error
		}
	});

	function set_status(room, status) {
		let change_status = createResource({
			url: "/api/method/marley_frontend.bed_management.change_status",
			method: "GET",
			makeParams() {
				return {
					status: status,
					room: room.name,
					ip_status: room.ip_status
				}
			},
			onSuccess(response) {
				if (response) {
					selectedBed.value = {};
					get_room_details.reload();
					dialog_message = "Room status changed to " + status;
					dialog_title = "Room status changed successfully";
					success_dialog.value = true;
				}
			},
			onError: (error) => {
				dialog_message = error.messages?.[0] || error;
				dialog_title = "Status change failed";
				alert_dialog.value = true;
			},
		});

		change_status.fetch();
	};

	function get_encounters(patient) {
		let get_encounter_options = createResource({
			url: "/api/method/marley_frontend.bed_management.get_encounter_options",
			method: "GET",
			makeParams() {
				return {
					patient: patient || null
				}
			},
			onSuccess(response) {
				if (response) {
					errors.value.allocation_error = ""
					allocate_encounter_options.value = response;
				}
			},
			onError: (error) => {
				errors.value.allocation_error = error.messages?.[0] || error;
			},
		});
		get_encounter_options.fetch();
	};

	function schedule_admission() {
		let order_admission = createResource({
			url: "/api/method/marley_frontend.bed_management.order_admission",
			method: "GET",
			makeParams() {
				return {
					patient: allocate_patient_id?.value || null,
					encounter: allocate_encounter.value?.value || null,
					primary_consultant: allocate_primary_consultant.value?.value || null,
					secondary_consultant: allocate_secondary_consultant.value?.value || null,
					bed_type: allocate_bed_type?.value || null,
					bed: allocate_bed.value?.value || null,
					admission_date: allocate_admission_date?.value || null,
					expected_length_of_stay: allocate_expected_length_of_stay?.value || 0
				}
			},
			onSuccess(response) {
				if (response) {
					errors.value.allocation_error = ""
					if (response) {
						allocate_bed_dialog.value = false;
						selectedBed.value = {};
						get_room_details.reload();
						dialog_message = `Admission schedulled for patient ${allocate_patient.value.label}. Inpatient Record No: ${response}`;
						dialog_title = "Admission Schedulled";
						success_dialog.value = true;
					}
				}
			},
			onError: (error) => {
				errors.value.allocation_error = error.messages?.[0] || error;
			},
		});

		if (!allocate_patient.value) {
			errors.value.allocate_patient = "This field is required";
		} else {
			errors.value.allocate_patient = "";
		}
		if (!allocate_admission_date.value) {
			errors.value.allocate_admission_date = "This field is required";
		} else {
			errors.value.allocate_admission_date = "";
		}
		if (!allocate_primary_consultant.value) {
			errors.value.allocate_primary_consultant = "This field is required";
		} else {
			errors.value.allocate_primary_consultant = "";
		}
		if (!allocate_expected_length_of_stay.value > 0) {
			errors.value.allocate_expected_length_of_stay = "This field is required";
		} else {
			errors.value.allocate_expected_length_of_stay = "";
		}
		if (!allocate_patient.value || !allocate_admission_date.value || !allocate_primary_consultant.value || !allocate_expected_length_of_stay.value > 0) {
			return
		} else {
			order_admission.fetch();
		}
	};

	function transfer_patient_bed() {
		let order_bed_transfer = createResource({
			url: "/api/method/marley_frontend.bed_management.order_bed_transfer",
			method: "GET",
			makeParams() {
				return {
					patient: transfer_patient_id?.value || null,
					ipd: transfer_ipd?.value || null,
					leave_from: transfer_leave_from?.value || null,
					transfer_to: transfer_bed.value?.value || null,
					for_procedure: for_procedure?.value || null,
				}
			},
			onSuccess(response) {
				admission_loader.value = false;
				if (response) {
					errors.value.transfer_error = ""
					if (response) {
						transfer_bed_dialog.value = false;
						selectedBed.value = {};
						get_room_details.reload();
						dialog_message = `Patient has transferred to ${transfer_bed.value.label}`;
						dialog_title = "Patient Transfer Successfull";
						success_dialog.value = true;
					}
				}
			},
			onError: (error) => {
				admission_loader.value = false;
				errors.value.transfer_error = error.messages?.[0] || error;
			},
		});

		if (!transfer_bed_type.value) {
			errors.value.transfer_bed_type = "This field is required";
		} else {
			errors.value.transfer_bed_type = "";
		}
		if (!transfer_bed.value) {
			errors.value.transfer_bed = "This field is required";
		} else {
			errors.value.transfer_bed = "";
		}
		if (!transfer_bed_type.value || !transfer_bed.value) {
			return
		} else {
			admission_loader.value = true;
			order_bed_transfer.fetch();
		}
	};

	function transfer_dialog(bed) {
		transfer_bed_dialog.value = true;
		transfer_patient.value = bed.patient_name;
		transfer_patient_id.value = bed.patient;
		transfer_leave_from.value = bed.name;
		transfer_ipd.value = bed.ip_record;
		transfer_bed_type.value = {label: '', value: ''};
		transfer_bed.value = {label: '', value: ''};
	}

	function go_to_desk_page(){
		window.location.href = "/app";
	}

	function navigate_to_ip(ip_record) {
		window.location.href = "/app/inpatient-record/" + ip_record;
	}
</script>