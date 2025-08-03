<template>
	<div class="w-full h-full">
		<Tabs as="div" v-model="activeTab" :tabs="appointmentTabs">
			<template #tab-panel="{ tab }">
				<ListView
					class="h-[75vh]"
					:columns="columns"
					:rows="tab?.appointments || []"
					:options="{
						selectable: false,
						showTooltip: true,
						resizeColumn: true,
						rowHeight: 90,
					}"
					row-key="name"
				>
					<ListHeader>
						<ListHeaderItem v-for="column in columns" :key="column.key" :item="column">
							<template #prefix>
								<FeatherIcon v-if="column.icon" :name="column.icon" class="h-4 w-4" />
							</template>
						</ListHeaderItem>
					</ListHeader>
					<ListRows>
						<ListRow v-if="tab?.appointments || []" v-for="row in tab?.appointments || []" :key="row.name"
							v-slot="{ idx, column, item }" :row="row">
							<ListRowItem :item="item" :align="column.align">
								<template #default="{ label }">
									<!-- patient_details column -->
									<div v-if="column.key == 'patient_details'">
										<div class="flex-1 px-1 text-center flex space-x-1">
											<Avatar v-if="row.image" class="flex items-center" :image="row.image"
												:label="''" size="md" />
											<div v-else>
												<FeatherIcon :name="'user'" class="h-5 w-5" />
											</div>
											<Tooltip :text="'Patient: ' + row.patient_name" placement="top">
												<Button :ref_for="true" size="md" label="patient_button" :disabled="false"  :variant="'ghost'"
													@click="open_patient_desk(row)">
													{{ row.patient_name }}
												</Button>
											</Tooltip>
										</div>
										<div class="flex-1 px-3 text-center flex space-x-1">
											<div class="flex items-center">
												<FeatherIcon :name="'hash'" class="h-3 w-3" />
											</div>
											<Tooltip :text="'Patient ID: ' + row.patient_id" placement="top">
												<div class="py-1 px-1 text-center text-base">
													{{ row.patient_id }}
												</div>
											</Tooltip>
										</div>
										<div class="flex-1 px-3 text-center flex space-x-1">
											<div class="flex items-center">
												<FeatherIcon :name="'phone'" class="h-3 w-3" />
											</div>
											<Tooltip :text="'Contact: ' + row.mobile" placement="top">
												<div class="py-1 px-1 text-center text-base">
													{{ row.mobile }}
												</div>
											</Tooltip>
										</div>
									</div>
									<!-- appointment_details column -->
									<div v-if="column.key == 'appointment_details'">
										<div class="flex-1 px-1 text-center flex space-x-1">
											<Avatar v-if="row.practitioner_image" class="flex items-center"
												:image="row.practitioner_image" :label="row.practitioner_name"
												size="sm" />
											<div v-else>
												<FeatherIcon :name="'user'" class="h-3 w-3" />
											</div>
											<Tooltip :text="'Practitioner: ' + row.practitioner_name" placement="top">
												<div class="py-1 px-1 text-center text-base">
													{{ row.practitioner_name }}
												</div>
											</Tooltip>
										</div>
										<div class="flex-1 px-1 text-center flex space-x-1">
											<div class="flex items-center">
												<FeatherIcon :name="'type'" class="h-3 w-3" />
											</div>
											<Tooltip :text="'Appointment Type: ' + row.appointment_type" placement="top">
												<div class="py-1 px-1 text-center text-base">
													{{ row.appointment_type }}
												</div>
											</Tooltip>
										</div>
										<div class="flex-1 px-1 text-center flex space-x-2">
											<div class="flex items-center">
												<FeatherIcon :name="'file-text'" class="h-3 w-3" />
											</div>
											<Tooltip :text="'Appointment ID: ' + row.name" placement="top">
												<div class="py-1 px-1 text-center text-base">
													{{ row.name }}
												</div>
											</Tooltip>
										</div>
									</div>
									<!--  -->
									<div v-if="column.key == 'appointment_time_'">
										<div class="flex-1 px-1 py-1 text-center flex space-x-1">
											<div class="flex items-center">
												<FeatherIcon :name="'clock'" class="h-4 w-4" />
											</div>
											<Tooltip :text="'Appointment Time: ' + row.booked_time" placement="top">
												<div class="px-1 text-center text-base">
													{{ row.booked_time }}
												</div>
											</Tooltip>
										</div>
										<div class="flex-1 px-1 py-1 text-center flex space-x-1">
											<div class="flex items-center">
												<FeatherIcon :name="'log-in'" class="h-4 w-4" />
											</div>
											<Tooltip :text="'Checkin Time: ' + row.checkin_time" placement="top">
												<div class="py-1 px-1 text-center text-base">
													{{ row.checkin_time || 'Not Checked In' }}
												</div>
											</Tooltip>
										</div>
									</div>
									<div v-if="column.key == 'patient_token_number'">
										<div class="px-1 py-1 text-center place-content-center">
											<div class="space-x-2">
												{{ row.patient_token_number }}
											</div>
											<div v-if="row.token_status == 'Expired'"
												class="px-1 py-1 text-xss place-content-center !text-red-600">
												({{ row.token_status }})
											</div>
										</div>
									</div>
									<div v-if="column.key === 'status'">
										<div class="px-1 py-1 text-center place-content-center">
											<div class="px-1 py-1 text-xs !text-green-600 place-content-center"
												v-if="row.consulted">
												Consulted
											</div>
											<div class="space-x-2">
												<Button :variant="'outline'" size="sm" :label="row.status"
													:class="row.statusClass" @click="statusopened(row)">
													{{ row.status }}
												</Button>
											</div>
											<div class="px-1 py-1 text-xss !text-green-500 place-content-center"
												v-if="row.token_su_name">
												{{ row.token_su_name }}
											</div>
											<div class="px-1 py-1 text-xss !text-red-400 place-content-center"
												v-if="row.custom_cancel_reason">
												Reason: {{ row.custom_cancel_reason }}
											</div>
											<div class="px-1 py-1 text-xss !text-orange-400 place-content-center"
												v-else-if="row.custom_reschedule_reason">
												Reason: {{ row.custom_reschedule_reason }}
											</div>
										</div>
									</div>
									<div v-if="column.key === 'actions'">
										<div class="flex-1 px-1 py-2 justify-center items-center flex space-x-1">
											<Button :variant="'outline'" :ref_for="true" theme="gray" size="sm"
												label="vitals_button" :disabled="row.has_token" @click="opendialogue(row)">
												<div class="flex items-center truncate">
													<Tooltip :text="'Add Vitals'" placement="top">
														<slot name="icon">
															<FeatherIcon :name="'activity'"
																class="size-4 text-ink-gray-7" />
														</slot>
													</Tooltip>
												</div>
											</Button>
											<Button :variant="'outline'"
												:ref_for="true" theme="gray" size="sm" label="encounter_button"
												:loading="false" :loadingText="null" :disabled="row.has_encounter" :link="null"
												@click="navigateToDoctype(row.name)">
												<Tooltip :text="'Go to Encounter'" placement="top">
													<slot name="icon">
														<FeatherIcon :name="'plus-square'"
															class="size-4 text-ink-gray-7" />
													</slot>
												</Tooltip>
											</Button>
											<Button :variant="'outline'"
												:ref_for="true" theme="gray" size="sm" label="payment_button"
												:loading="false" :loadingText="null" :link="null" @click="open_payment_dialog(row)">
												<Tooltip :text="'Consultation Payment'" placement="top">
													<slot name="icon">
														<FeatherIcon :name="'credit-card'"
															class="size-4 text-ink-gray-7" />
													</slot>
												</Tooltip>
											</Button>
											<Button :variant="'outline'" :ref_for="true" theme="gray" size="sm"
												label="reschedule_button" :disabled="false"
												@click="rescheduleAppointment(row)">
												<Tooltip :text="'Reschedule'" placement="top">
													<FeatherIcon :name="'calendar'" class="size-4 text-ink-gray-7" />
												</Tooltip>
											</Button>
											<Button :variant="'outline'" :ref_for="true" theme="gray" size="sm"
												label="Print Boarding Pass" :disabled="row.has_token" @click="print_boarding_pass(row)">
												<div class="flex items-center truncate">
													<Tooltip :text="'Print Boarding Pass'" placement="top">
														<slot name="icon">
															<FeatherIcon :name="'printer'"
																class="size-4 text-ink-gray-7" />
														</slot>
													</Tooltip>
												</div>
											</Button>
										</div>
										<hr>
										<div class="flex-1 px-1 py-2 flex justify-center items-center space-x-2">
											<Button :variant="'outline'"
												:ref_for="true" theme="gray" size="sm" label="service_pay_button"
												:loading="false" :loadingText="null" :disabled="false" :link="null"
												@click="open_healthcare_service(row)">
												<Tooltip :text="'Bill services'" placement="top">
													<slot name="icon">
														<FeatherIcon :name="'dollar-sign'"
															class="size-4 text-ink-gray-7" />
													</slot>
												</Tooltip>
											</Button>
											<Button :variant="'outline'" :ref_for="true" theme="gray" size="sm"
												label="prescription_button" :disabled="false" @click="open_prescription_dialog(row)">
												<div class="flex items-center truncate">
													<Tooltip :text="'Bill Prescriptions'" placement="top">
														<slot name="icon">
															<FeatherIcon :name="'link'"
																class="size-4 text-ink-gray-7" />
														</slot>
													</Tooltip>
												</div>
											</Button>
										</div>
									</div>
									<div v-if="column.key == 'patient_balance'">
										<Tooltip :text="'Patient Balance: ' + String(row.balance_with_currency)" placement="top">
											<div v-if="row.balance <= 0" class="sm items-center text-green-600">
												{{ row.balance_with_currency }}
											</div>
											<div v-else class="sm items-center text-red-600">
												{{ row.balance_with_currency }}
											</div>
										</Tooltip>
									</div>
								</template>
							</ListRowItem>
						</ListRow>
					</ListRows>
				</ListView>
				<!-- <ListFooter
					v-model="pageLengthCount"
					:options="{
						rowCount: String(tab?.appointments?.length || 0),
						totalCount: String(tab?.appointments?.length || 0),
					}"
				/> -->
			</template>
		</Tabs>
	</div>
</template>

<script setup>
	import { ref } from "vue";
	import {
		createResource,
		Tooltip,
		ListView,
		ListHeader,
		ListHeaderItem,
		ListRows,
		ListRow,
		ListRowItem,
		ListFooter,
		Avatar,
		Button,
		Dialog,
		FormControl,
		Tabs
	} from "frappe-ui"

	const activeTab = defineModel('tab');
	defineProps({
		appointmentTabs: Array,
	})
	const pageLengthCount = ref("20");
	let columns = ref([
		{
			label: "Patient Details",
			key: "patient_details",
			icon: "user",
			width: "250px",
			align: "left",
		},
		{
			label: "Appointment Details",
			key: "appointment_details",
			icon: "user",
			width: "280px",
			align: "left",
		},
		{
			label: "Time",
			key: "appointment_time_",
			icon: "clock",
			width: "180px",
			align: "center",
		},
		{
			label: "Token No",
			key: "patient_token_number",
			icon: "log-in",
			width: "200px",
			align: "center",
		},
		{
			label: "Status",
			key: "status",
			icon: "check-circle",
			width: "180px",
			align: "center",
		},
		{
			label: "Actions",
			key: "actions",
			icon: "chevrons-right",
			width: "350px",
			align: "center",
		},
		{
			label: "Patient Balance",
			key: "patient_balance",
			icon: "dollar-sign",
			width: "150px",
			align: "center",
		},
	]);
	function open_patient_desk(row) {
		window.location.href = "/app/patient/" + row.patient;
	};
</script>
