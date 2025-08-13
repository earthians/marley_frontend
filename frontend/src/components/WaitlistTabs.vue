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
										<div class="flex-1 px-3 text-center flex space-x-1" v-if="row.patient_name!=row.patient_id">
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
									<!-- practitioner_details column -->
									<div v-if="column.key == 'practitioner_details'">
										<div class="flex-1 px-1 py-1 text-center flex space-x-1">
											<Avatar v-if="row.practitioner_image" class="flex items-center"
												:image="row.practitioner_image" :label="row.practitioner_name"
												size="sm" />
											<div v-else>
												<FeatherIcon :name="'user'" class="h-3 w-3" />
											</div>
											<Tooltip :text="'Practitioner: ' + row.practitioner_name" placement="top">
												<div class="px-1 text-center text-base">
													{{ row.practitioner_name }}
												</div>
											</Tooltip>
										</div>
										<div class="flex-1 px-1 py-1 text-center flex space-x-2" v-if="row.department">
											<div class="flex items-center">
												<FeatherIcon :name="'bookmark'" class="h-4 w-4" />
											</div>
											<Tooltip :text="'Department: ' + row.name" placement="top">
												<div class="px-1 text-center text-base">
													{{ row.department }}
												</div>
											</Tooltip>
										</div>
									</div>
									<!-- appointment_details column -->
									<div v-if="column.key == 'appointment_details'">
										<div class="flex-1 px-1 py-1 text-center flex space-x-1">
											<div class="flex items-center">
												<FeatherIcon :name="'type'" class="h-4 w-4" />
											</div>
											<Tooltip :text="'Appointment Type: ' + row.appointment_type" placement="top">
												<div class="py-1 px-1 text-center text-base">
													{{ row.appointment_type }}
												</div>
											</Tooltip>
										</div>
										<div class="flex-1 px-1 py-1 text-center flex space-x-2">
											<div class="flex items-center">
												<FeatherIcon :name="'file-text'" class="h-4 w-4" />
											</div>
											<Tooltip :text="'Appointment ID: ' + row.name" placement="top">
												<div class="px-1 text-center text-base">
													{{ row.name }}
												</div>
											</Tooltip>
										</div>
									</div>
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
													:class="row.statusClass" @click="handleStatusClick(row)">
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
										<div class="border rounded-md">
											<div class="flex-1 px-1 py-1 justify-center items-center flex space-x-1">
												<Button :ref_for="true" theme="ghost" size="md"
													label="Create Vitals" :disabled="row.has_token" @click="openVitalsDialogue(row)">
													<div class="flex items-center truncate">
														<Tooltip :text="'Add Vitals'" placement="top">
															<slot name="icon">
																<FeatherIcon :name="'activity'"
																	class="size-5 text-ink-gray-7" />
															</slot>
														</Tooltip>
													</div>
												</Button>
												<Button
													:ref_for="true" theme="ghost" size="md" label="Goto Encounter"
													:disabled="row.has_encounter"
													@click="navigateToDoctype(row.encounter)">
													<Tooltip :text="'Go to Encounter'" placement="top">
														<slot name="icon">
															<FeatherIcon :name="'plus-square'"
																class="size-5 text-ink-gray-7" />
														</slot>
													</Tooltip>
												</Button>
												<!-- <Button
													:ref_for="true" theme="ghost" size="sm" label="payment_button"
													:loading="false" :loadingText="null" :link="null" @click="open_payment_dialog(row)">
													<Tooltip :text="'Consultation Payment'" placement="top">
														<slot name="icon">
															<FeatherIcon :name="'credit-card'"
																class="size-4 text-ink-gray-7" />
														</slot>
													</Tooltip>
												</Button> -->
												<Button :ref_for="true" theme="ghost" size="md"
													label="reschedule_button" :disabled="false"
													@click="rescheduleAppointment(row)">
													<Tooltip :text="'Reschedule'" placement="top">
														<RescheduleIcon class="size-5 text-ink-gray-7"></RescheduleIcon>
													</Tooltip>
												</Button>
												<Button :ref_for="true" theme="ghost" size="md"
													label="Print Boarding Pass" :disabled="row.has_token" @click="print_boarding_pass(row)">
													<div class="flex items-center truncate">
														<Tooltip :text="'Print Boarding Pass'" placement="top">
															<slot name="icon">
																<FeatherIcon :name="'printer'"
																	class="size-5 text-ink-gray-7" />
															</slot>
														</Tooltip>
													</div>
												</Button>
											</div>
											<hr>
											<div class="flex-1 px-1 py-1 flex justify-center items-center space-x-2">
												<Button
													:ref_for="true" theme="ghost" size="md"
													label="Invoice Services" @click="open_healthcare_service(row)">
													<Tooltip :text="'Invoice Services'" placement="top">
														<slot name="icon">
															<FeatherIcon :name="'dollar-sign'"
																class="size-5 text-ink-gray-7" />
														</slot>
													</Tooltip>
												</Button>
												<Button :ref_for="true" theme="ghost" size="md"
													label="Invoice Prescription" @click="open_prescription_dialog(row)">
													<div class="flex items-center truncate">
														<Tooltip :text="'Invoice Prescriptions'" placement="top">
															<slot name="icon">
																<PillIcon class="size-5 text-ink-gray-7"></PillIcon>
															</slot>
														</Tooltip>
													</div>
												</Button>
											</div>
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
						pageLengthOptions: [20, 50, 100]
					}"
				/> -->
			</template>
		</Tabs>
	</div>

	<Dialog
		:options="{
			title: dialog_title,
			message: dialog_message,
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
		}"
		v-model="success_dialog"
		@click="success_dialog = false"
	/>

	<Dialog 
		:options="{
			title: dialog_title,
			message: dialog_message,
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
		}"
		v-model="alert_dialog"
		@click="alert_dialog.value = false"
	/>

	<!-- status Dialog -->
	<Dialog v-model="openStatusDialog" :options="{size: 'xl'}">
		<template #body-title>
			<h5 class="font-bold text-ink-gray-8">Change Status</h5>
		</template>
		<template #body-content>
			<div class="grid grid-cols-3 gap-2">
				<div class="py-1 w-full">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle" placeholder="Patient ID"
						:disabled="true" label="Patient ID" v-model="status_patient_id" />
				</div>
				<div class="py-1 w-full">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle"
						placeholder="Patient Name" :disabled="true" label="Patient Name"
						v-model="status_patient" />
				</div>
				<div class="py-1 w-full">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle" placeholder="Appointment ID"
						:disabled="true" label="Appointment ID" v-model="status_appointment_id" />
				</div>
			</div>
		</template>
		<template #actions>
			<Button variant="solid" v-if="showcheckinButton" @click="updateAppointmentStatus('Checked In')">
				Checkin
			</Button>
			<Button class="ml-2" v-if="showConfirmButton" @click="updateAppointmentStatus('Confirmed')">
				Confirm
			</Button>
			<Button class="ml-2" @click="updateAppointmentStatus('Cancelled')">
				Cancel
			</Button>
		</template>
	</Dialog>

	<!-- Vital signs Dialog-->
	<Dialog
		v-model="createVitalsDialog"
		:options="{
			size: '3xl',
		}"		>
		<template #body-title>
			<h3 class="font-bold text-ink-gray-8">Vital Signs Details</h3>
		</template>
		<template #body-content>
			<div class="grid grid-cols-3 gap-2 py-2">
				<div class="py-1 w-full">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle"
						placeholder="patient name" :disabled="true" label="Patient" v-model="appointment" />
				</div>
				<div class="py-1 w-full">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle" placeholder="id"
						:disabled="true" label="Appointment" v-model="appointmentID" />
				</div>
			</div>
			<div class="grid grid-cols-3 gap-2 py-2">
				<div class="py-1 w-full">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle"
						placeholder="Blood Pressure(systolic)" :disabled="vitals_submitted" label="BP(Systolic)"
						v-model="bp_systolic" />
				</div>
				<div class="py-1 w-full">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle"
						placeholder="Blood Pressure(diastolic)" :disabled="vitals_submitted" label="BP(Diastolic)"
						v-model="bp_diastolic" />
				</div>
				<div class="py-1 w-full">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle"
						placeholder="Respiratory Rate" :disabled="vitals_submitted" label="Respiratory Rate"
						v-model="respiratory_rate" />
				</div>
				<div class="py-1 w-full">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle" placeholder="Pulse Rate"
						:disabled="vitals_submitted" label="Pulse Rate" v-model="pulse" />
				</div>
				<div class="py-1 w-full">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle" placeholder="Weight"
						:disabled="vitals_submitted" label="Weight (in KG)" v-model="weight" />
				</div>
				<div class="py-1 w-full">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle" placeholder="Height"
						:disabled="vitals_submitted" label="Height (in Meter)" v-model="height" />
				</div>
				<div class="py-1 w-full">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle" placeholder="Temperature"
						:disabled="vitals_submitted" label="Temperature (in °C)" v-model="temperature" />
				</div>
			</div>
			<div class="grid grid-cols-2 gap-2 py-2">
				<div class="py-1 w-full">
					<FormControl :type="'textarea'" :ref_for="true" size="sm" variant="subtle" placeholder="Notes"
						:disabled="vitals_submitted" label="Notes" v-model="notes" />
				</div>
			</div>
		</template>
		<template #actions>
			<Dropdown v-if="!vitals_submitted"
				:options="[
					{
						label: vital_update_button,
						onClick: () => {
							create_vitalsigns.submit()
						},
					},
					{
						label: 'Submit',
						variant: 'solid',
						onClick: () => {
							submit_vital.submit()
						},
					},
				]"
				:button="{
					label: 'Save / Submit',
					variant: 'solid',
				}"
			/>
		</template>
	</Dialog>

	<!-- Reschedule appointment -->
	<Dialog
		v-model="scheduleDialog"
		:options="{
			size: '4xl',
		}"
	>
		<template #body-title>
			<h3 class="font-bold text-ink-gray-8">Reschedule Appointment</h3>
		</template>
		<template #body-content>
			<div class="grid grid-cols-2 gap-2">
				<div class="flex-1 w-auto py-2">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle" label="Patient":disabled="true"
						v-model="patient_name_reschedule" />
				</div>
				<div class="flex-1 w-auto py-2">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle" label="Appointment ID":disabled="true"
						v-model="newid" />
				</div>
				<div class="flex-1 w-auto py-2">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle" label="Practitioner":disabled="true"
						v-model="reschedule_practitioner" />
				</div>
				<div class="flex-1 w-auto py-2">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle" label="Practitioner ID":disabled="true"
						v-model="reschedule_practitioner_id" />
				</div>
				<div class="flex-1 w-auto py-2">
					<DatePicker v-model="reschedule_date" variant="subtle" label="Select Date" placeholder="Select Date" :disabled="false"
						:formatter="(date) => getFormat(date, '', true)" />
				</div>
			</div>
			<div v-if="slots.length" class="py-2 px-2">
				<div class="text-xl font-semibold text-ink-gray-8 mb-4">Available Slots</div>
				<div v-if="isLoading" class="flex justify-center items-center h-48">
					<div class="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full" style="border-top-color: #b3bf79;" role="status">
					<span class="sr-only text-ink-gray-8">Loading...</span>
					</div>
				</div>
				<div class="grid grid-cols-2 md:grid-cols-8 gap-4">
					<Button v-for="(slot, index) in slots" :key="index" :label="slot" :class="[
						selectedSlot === slot
							? 'bg-surface-gray-5 text-white'
							: 'bg-surface-white hover:bg-surface-gray-4 border shadow-sm',
						'text-xs font-medium py-0.5 px-1 rounded-md'
					]" :variant="'subtle'" theme="gray" label="Slots" @click="selectedSlot = slot" />
				</div>
			</div>
			<div v-if="errors.fetch_slot_error" class="flex-1 w-auto">
				<ErrorMessage v-if="errors.fetch_slot_error" :message="errors.fetch_slot_error"/>
			</div>
		</template>
		<template #actions>
			<div class="flex justify-center">
				<Button v-if="selectedSlot" :variant="'solid'" theme="gray" label="Confirm" @click="reschedule_booking.submit()" />
			</div>
		</template>
	</Dialog>

	<!-- Dialog box for healthcare services sales invoice  -->
	<Dialog
		:options="{
			size: '5xl'
		}"
		v-model="open_services_sales_invoice"
	>
		<template #body-title>
			<h3 class="text-lg font-semibold text-ink-gray-8"> Invoice Services</h3>
		</template>
		<template #body-content>
			<div class="flex gap-2 mb-4">
				<div class="flex-1 w-auto">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle" placeholder="Patient Name"
						:disabled="true" label="Patient Name" v-model="patient_name" />
				</div>
				<div class="flex-1 w-auto">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle" placeholder="Patient ID"
						:disabled="true" label="Patient ID" v-model="patient_id" />
				</div>
			</div>
			<div class="grid grid-cols-2 gap-2 py-1">
				<div class="py-1 w-full">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle"
						placeholder="customer" :disabled="true" label="Customer" v-model="customer"
						:required="true" />
				</div>
				<div class="py-1 w-full">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle" placeholder="company"
						:disabled="true" label="Company" v-model="company" :required="true" />
				</div>
				<div class="py-1 w-full" v-if="show_advance">
					<div class="sm items-center text-green-600">
						Credit Balance: <span class="font-bold">{{ show_advance }}/-</span>
					</div>
				</div>
				<div class="py-1 w-full" v-else></div>
				<div class="py-2 w-full">
					<Button label="Go To Sales Invoice" :link="null"
						@click="goto_sales_invoices(patient_id)">
						Go to Sales Invoice
					</Button>
				</div>
				<div class="py-1 w-full" v-if="show_advance">
					<FormControl :type="'checkbox'" :ref_for="true" size="sm" variant="subtle" placeholder="Use Advance Amount"
						label="Use Advance Amount" v-model="use_advance_amount" />
				</div>
			</div>
			<div class="pb-5">
				<ListView
					class="flex overflow-y-auto w-full h-[50vh]"
					:columns="columns_service"
					:rows="item_list"
					:options="{
						selectable: true,
						showTooltip: true,
						resizeColumn: true,
						emptyState: {
							title: 'No Data',
							description: 'No data available',
						},
					}"
					row-key="reference_name"
				>
					<ListHeader>
						<ListHeaderItem v-for="column in columns_service" :key="column.key" :item="column">
						</ListHeaderItem>
					</ListHeader>
					<ListRows>
						<ListRow v-for="row,index in item_list" :key="row.reference_name" v-slot="{ column, item }" :row="row">
							<ListRowItem  :item="item" :align="column.align">
								<template #default="{ label }">
								</template>
							</ListRowItem>
						</ListRow>
						<ListSelectBanner>
							<template #actions="{ selections, unselectAll }">
								<Button :variant="'solid'" :ref_for="true" theme="gray" size="sm" label="Add Services" v-model="add_service" :link="null"
									@click="add_healthcare_services(selections)">
									Add
								</Button>
							</template>
						</ListSelectBanner>
					</ListRows>
				</ListView>
				<!-- <ListFooter
					class="border-t px-3 py-2 sm:px-5"
					v-model="pageLengthCount"
					:options="{
						rowCount: item_list.length,
						totalCount: item_list.length,
					}"
				/> -->
			</div>
			<div class="flex gap-4 mb-4">
				<div class="flex-1 w-auto">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle" placeholder="Total Quantity"
						:disabled="true" label="Total Quantity" v-model="quantity" />
				</div>
				<div class="flex-1 w-auto">
					<FormControl :type="'number'" :ref_for="true" size="sm" variant="subtle" :required="true"
						placeholder="Total Amount" :disabled="true" label="Total Amount" v-model="amount" />
					<ErrorMessage v-if="errors.amount" :message="errors.amount"/>
				</div>
			</div>
			<div class="grid grid-cols-3 gap-2 py-1" v-if="amount > 0">
				<div class="py-1 w-full">
					<FormControl type="autocomplete" :options="paymentOptions" size="sm" variant="subtle"
						placeholder="Mode of Payment"label="Mode of Payment"
						v-model="si_payment_mode" />
					<ErrorMessage v-if="errors.si_payment_mode" :message="errors.si_payment_mode"/>
				</div>
				<div class="py-1 w-full">
					<FormControl :type="'number'" :ref_for="true" size="sm" variant="subtle"
						placeholder="Payable Amount" label="Payable Amount" v-model="payable_amount_service" :disabled="!payable_amount_service && !si_payment_mode" />
					<ErrorMessage v-if="errors.payable_amount_service" :message="errors.payable_amount_service"/>
				</div>
				<div class="py-6 w-full">
					<Button :ref_for="true" theme="gray" label="Add payment" :disabled="!payable_amount_service && !si_payment_mode"
						@click="add_to_table(si_payment_mode, payable_amount_service, reference_date_service, reference_id_service)">
						<div class="flex items-center truncate">
							<Tooltip :text="'Add Payment'" placement="top">
								<slot name="icon">
									<FeatherIcon :name="'plus-square'"
										class="size-4 text-ink-gray-7" />
								</slot>
							</Tooltip>
						</div>
					</Button>
				</div>
				<div class="py-1 w-full">
					<DatePicker
						v-model="reference_date_service"
						variant="subtle"
						placeholder="Reference Date"
						:disabled="!is_bank"
						:required="is_bank"
						label="Reference Date"
						:formatter="(date) => getFormat(date, '', true)"
					/>
					<ErrorMessage v-if="errors.reference_date_service" :message="errors.reference_date_service" />
				</div>
				<div class="py-1 w-full">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle" placeholder="Reference ID"
						:disabled="!is_bank" label="Reference Id" v-model="reference_id_service" :required="is_bank" />
					<ErrorMessage v-if="errors.reference_id_service" :message="errors.reference_id_service" />
				</div>
			</div>
			<div class="pb-5" v-if="payments_list.length > 0">
				<ListView
					class="flex overflow-y-auto w-full h-[25vh]"
					:columns="columns_payments"
					:rows="payments_list"
					:options="{
						selectable: true,
						showTooltip: true,
						resizeColumn: true,
					}"
					row-key="idx"
				>
					<ListHeader>
						<ListHeaderItem v-for="column in columns_payments" :key="column.key" :item="column">
							<template #prefix>
								<FeatherIcon v-if="column.icon" :name="column.icon" class="h-4 w-4" />
							</template>
						</ListHeaderItem>
					</ListHeader>
					<ListRows>
						<ListRow v-for="row,index in payments_list" :key="row.idx" v-slot="{ column, item }" :row="row">
							<ListRowItem  :item="item" :align="column.align">
								<template #default="{ label }">
								</template>
							</ListRowItem>
						</ListRow>
						<ListSelectBanner>
							<template #actions="{ selections, unselectAll }">
								<Button :variant="'solid'" :ref_for="true" theme="gray" size="sm" label="Remove Payments" :link="null"
									@click="remove_payments(selections)">
									Remove
								</Button>
							</template>
						</ListSelectBanner>
					</ListRows>
				</ListView>
				<!-- <ListFooter
					class="border-t px-3 py-2 sm:px-5"
					v-model="pageLengthCount"
					:options="{
						rowCount: payments_list.length,
						totalCount: payments_list.length,
					}"
				/> -->
			</div>
			<div class="grid grid-cols-2 gap-2 py-2" v-if="amount > 0">
				<div class="py-1 w-full">
					<FormControl :type="'number'" :ref_for="true" size="sm" variant="subtle" :required="true"
						placeholder="Total Payable Amount" :disabled="true" label="Total Payable Amount" v-model="total_payable_amount_service" />
					<ErrorMessage v-if="errors.total_payable_amount_service" :message="errors.total_payable_amount_service"/>
				</div>
				<div class="py-1 w-full"></div>
			</div>
			<div>
				<ErrorMessage v-if="errors.services_error" :message="errors.services_error" />
			</div>
		</template>
		<template #actions>
			<div class="flex items-center space-x-4 p-2" v-if="total_payable_amount_service > 0">
				<Button class="ml-2" :variant="'solid'" :ref_for="true" theme="gray" @click="create_service_invoice()" v-model="submit_payment">
					Confirm to submit Invoice
				</Button>
			</div>
		</template>
	</Dialog>

	<!-- prescription billing dialog -->
	<Dialog
		:options="{
			size: '4xl'
		}"
		v-model="prescription_dialog"
	>
		<template #body-title>
			<h3 class="text-lg font-semibold text-ink-gray-8">Invoice Prescriptions</h3>
		</template>
		<template #body-content>
			<div class="flex gap-2 mb-4">
				<div class="flex-1 w-auto">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle" placeholder="Patient"
						:disabled="true" label="Patient Name" v-model="patient_name" />
				</div>
				<div class="flex-1 w-auto">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle" placeholder="Patient ID"
						:disabled="true" label="Patient ID" v-model="patient_id_pre" />
				</div>
			</div>
			<div class="flex gap-2 mb-4">
				<div class=" flex-1 w-auto">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle"
						placeholder="customer" :disabled="true" label="Customer" v-model="customer"
						:required="true" />
				</div>
				<div class="flex-1 w-auto">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle" placeholder="company"
						:disabled="true" label="Company" v-model="company" :required="true" />
				</div>
			</div>
			<div class="flex gap-2 mb-4">
				<div class=" flex-1 w-auto">
					<FormControl type="autocomplete" :options="encounteroptions" size="sm" variant="subtle"
						placeholder="Patient Encounter" :disabled="false" label="Patient Encounter"
						v-model="encounter" :required="true" />
				</div>
				<div class="flex-1 w-auto pt-5">
					<Button label="Go To Sales Invoice" :link="null"
						@click="goto_sales_invoices(patient_id_pre)">
						Go to Sales Invoice
					</Button>
				</div>
			</div>
			<div class="pb-5">
				<ListView
					class="flex overflow-y-auto w-full h-[40vh]"
					:columns="columns_prescriptions"
					:rows="prescription_list"
					:options="{
						selectable: true,
						showTooltip: true,
						resizeColumn: true,
						emptyState: {
							title: 'No Data',
							description: 'No data available',
						},
					}"
					row-key="reference_name"
				>
					<ListHeader>
						<ListHeaderItem v-for="column in columns_prescriptions" :key="column.key" :item="column">
						</ListHeaderItem>
					</ListHeader>
					<ListRows>
						<ListRow v-for="row,index in prescription_list" :key="row.reference_name" v-slot="{ column, item }" :row="row">
							<ListRowItem  :item="item" :align="column.align">
								<template #default="{ label }">
								</template>
							</ListRowItem>
						</ListRow>
						<ListSelectBanner>
							<template #actions="{ selections, unselectAll }">
								<Button :variant="'solid'" :ref_for="true" theme="gray" size="sm" label="Add Prescription" v-model="add_prescription" :link="null"
									@click="add_selected_prescriptions(selections)">
									Add
								</Button>
							</template>
						</ListSelectBanner>
					</ListRows>
				</ListView>
				<!-- <ListFooter
					class="border-t px-3 py-2 sm:px-5"
					v-model="pageLengthCount"
					:options="{
						rowCount: prescription_list.length,
						totalCount: prescription_list.length,
					}"
				/> -->
			</div>
			<div class="flex gap-4 mb-4">
				<div class="flex-1 w-auto">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle" placeholder="Total Quantity"
						:disabled="true" label="Total Quantity" v-model="quantity_pre" />
				</div>
				<div class="flex-1 w-auto">
					<FormControl :type="'number'" :ref_for="true" size="sm" variant="subtle" :required="true"
						placeholder="Total Amount" :disabled="true" label="Total Amount" v-model="amount_pre" />
						<ErrorMessage v-if="errors.amount_pre" :message="errors.amount_pre"/>
				</div>
			</div>
			<div class="flex gap-4 mb-4">
				<div class="flex-1 w-auto">
					<FormControl type="autocomplete" :options="paymentOptions" size="sm" variant="subtle"
						placeholder="Mode of Payment" :disabled="false" label="Mode of Payment"
						v-model="pre_payment_mode" :required="true" />
						<ErrorMessage v-if="errors.pre_payment_mode" :message="errors.pre_payment_mode"/>
				</div>
				<div class="flex-1 w-auto"></div>
			</div>
		</template>
		<template #actions>
			<div class="flex items-center space-x-4 p-2">
				<Button class="ml-2" :variant="'solid'" :ref_for="true" theme="gray" @click="create_prescription_invoice()" v-model="submit_payment">
					Confirm to submit Invoice
				</Button>
			</div>
		</template>
	</Dialog>

	<Dialog
		:options="{
			title: 'Invoice Created',
			message: si_message,
			size: 'xl',
			icon: {
				name: 'check',
				appearance: 'success',
			},
		}" v-model="sales_invoice_creation_dialog"
	>
		<template #actions>
			<div class="space-x-2">
				<Button variant="solid" @click="sales_invoice_creation_dialog = false">
					Ok
				</Button>
				<Button v-if="sales_invoice_ref" :ref_for="true" theme="gray" size="md"
					label="print_si" :disabled="false" @click="print_sales_invoice(sales_invoice_ref)">
					<Tooltip :text="'Print'" placement="top">
						<slot name="icon">
							<FeatherIcon :name="'printer'"
								class="size-4 text-ink-gray-7" />
						</slot>
					</Tooltip>
				</Button>
			</div>
		</template>
	</Dialog>
</template>

<script setup>
	import { ref, watch } from "vue";
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
		Tabs,
		DatePicker
	} from "frappe-ui"
	import { getFormat } from '@/utils'

	import RescheduleIcon from '~icons/lucide/calendar-sync'
	import PillIcon from '~icons/lucide/pill'

	const activeTab = defineModel('tab');
	defineProps({
		appointmentTabs: Array,
	})
	const pageLengthCount = defineModel();

	const emit = defineEmits(['reload_appointment'])

	function reload_waitlist() {
		emit('reload_appointment')
	}

	let selectedAppointment = ref(null);
	const reschedule_date = ref(null);
	const selectedSlot = ref(null);
	const add_service = ref(null);
	const add_prescription = ref(null);
	let sales_invoice_ref = ref(null);
	let si_message = ref(null);

	const showConfirmButton = ref(true);
	const showcheckinButton = ref(true);
	const openStatusDialog = ref(false);
	const createVitalsDialog = ref(false);
	const scheduleDialog = ref(false);
	const open_services_sales_invoice = ref(false);
	const prescription_dialog = ref(false);
	let sales_invoice_creation_dialog = ref(false);
	let success_dialog = ref(false);
	let alert_dialog = ref(false);
	let vitals_submitted = ref(false);
	let isLoading = ref(false);
	let is_bank = ref(false);
	let use_advance_amount = ref(false);
	let show_advance = ref(false);
	let pre_payment_mode = ref(false);

	let vital_update_button = ref("Update");
	let reference_date_service = ref(new Date().toISOString().split('T')[0]);

	let dialog_message = ref("");
	let dialog_title = ref("");
	const status_patient = ref("");
	const status_patient_id = ref("");
	const status_appointment_id = ref("");
	let patient_token = ref("");
	const height = ref("");
	const weight = ref("");
	const temperature = ref("");
	const notes = ref("");
	const bp_diastolic = ref("");
	const bp_systolic = ref("");
	const pulse = ref("");
	const respiratory_rate = ref("");
	const appointment = ref("");
	const appointmentID = ref("");
	const patient_name_reschedule =ref("");
	const newid = ref('');
	const reschedule_practitioner = ref("");
	const reschedule_practitioner_id = ref("");
	let mop_type = ref("");
	const patient_id = ref("");
	const patient_id_pre = ref("");
	const patient_name = ref("");
	const company = ref("");
	let reference_id_service = ref("");
	const customer = ref("");
	const encounter = ref("");

	const slots = ref([]);
	let selected_services = ref([]);
	let selected_prescriptions = ref([]);
	let item_list = ref([]);
	let prescription_list = ref([]);
	let paymentOptions = ref([]);
	let encounteroptions = ref([]);
	const submit_payment = ref([])

	let errors = ref({});
	let si_payment_mode = ref(null);

	let customer_advance_amount = ref("0");
	let amount = ref(0);
	let amount_pre = ref(0);
	const quantity = ref(0);
	const quantity_pre = ref(0);
	let payable_amount_service = ref(0);
	let total_payable_amount_service = ref(0);

	let columns = ref([
		{
			label: "Patient Details",
			key: "patient_details",
			icon: "user",
			width: "250px",
			align: "left",
		},
		{
			label: "Practitioner Details",
			key: "practitioner_details",
			icon: "user",
			width: "200px",
			align: "left",
		},
		{
			label: "Appointment Details",
			key: "appointment_details",
			icon: "user",
			width: "220px",
			align: "left",
		},
		{
			label: "Time",
			key: "appointment_time_",
			icon: "clock",
			width: "160px",
			align: "center",
		},
		{
			label: "Token No",
			key: "patient_token_number",
			icon: "log-in",
			width: "180px",
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
			width: "300px",
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

	const columns_service = ref([
		{
			label: 'Service',
			key: 'service',
		},
		{
			label: 'Reference Type',
			key: 'reference_type',
			width: '170px'
		},
		{
			label: 'Posting Date',
			key: 'posting_date',
			width: '120px'
		},
		{
			label:'Qty',
			key: 'qty',
			width: '100px'
		},
		{
			label: 'Price',
			key: 'rate',
			width: '110px',
		},
		{
			label: 'Reference name',
			key: 'reference_name',
			width: '200px'
		},
	]);

	const columns_payments = ref([
		{
			label: 'Mode of Payment',
			key: 'mode_of_payment',
			icon: "credit-card",
		},
		{
			label: 'Amount',
			key: 'amount',
			icon: "dollar-sign",
		},
	]);
	let payments_list = ref([]);

	const columns_prescriptions = ref([
		{
			label: 'Drug code',
			key: 'drug_code',
			width: '200px',
		},
		{
			label: 'Quantity',
			key: 'quantity',
			width: '200px',
		},
		{
			label: 'Price',
			key: 'rate',
			width: '110px',
		},
		{
			label: 'Posting Date',
			key: 'posting_date',
			width: '120px'
		},
		{
			label: 'Description',
			key: 'description',
			width: '200px',
		},
	]);

	function open_patient_desk(row) {
		window.location.href = "/app/patient/" + row.patient;
	};

	function handleStatusClick(row) {
		selectedAppointment.value = row.name;
		if (row.status == "Open") {
			showcheckinButton.value = true;
			showConfirmButton.value = true;
		} else if (row.status == "Checked Out") {
			showConfirmButton.value = false;
			showcheckinButton.value = true;
		} else if (row.status == "Confirmed") {
			showConfirmButton.value = false;
			if (row.is_today){
				showcheckinButton.value = true;
			} else {
				showcheckinButton.value = false;
			}
		} else if (row.status == "Scheduled" && !row.is_today) {
			showConfirmButton.value = true;
			showcheckinButton.value = false;
		} else {
			showcheckinButton.value = false;
			showConfirmButton.value = false;
		}

		if (row.status == "Cancelled" || row.status == "Consulted") {
			openStatusDialog.value = false;
		} else {
			openStatusDialog.value = true;
		}
		status_patient.value = row.patient_name;
		status_patient_id.value = row.patient;
		status_appointment_id.value = row.name;
	};

	function updateAppointmentStatus(status) {
		let set_status = createResource({
			url: "/api/method/marley_frontend.waitlist.set_status",
			method: "POST",
			makeParams() {
				return {
					id: selectedAppointment.value,
					status: status
				};
			},
			onSuccess(response) {
				if (response["message"]) {
					dialog_message = `${response["message"]}`;
					dialog_title = "Success";
					success_dialog.value = true;
				} else if (response["alert"]) {
					dialog_message = response["alert"];
					dialog_title = "Checkin Failed";
					alert_dialog.value = true;
				}
				reload_waitlist();
			},
			onError(error) {
				dialog_message = error.messages?.[0] || error;
				dialog_title = "Failed to set status";
				alert_dialog.value = true;
			}
		});
		set_status.submit();
		openStatusDialog.value = false;
	};

	function openVitalsDialogue(row) {
		let get_vitals = createResource({
			url: "/api/method/marley_frontend.waitlist.get_vitals",
			method: "GET",
			makeParams() {
				return {
					appointment: row.name,
				}
			},
			onSuccess(response) {
				if (response) {
					patient_token.value = row.patient_token;
					respiratory_rate.value = response.respiratory_rate || "";
					height.value = response.height || "";
					weight.value = response.weight || "";
					pulse.value = response.pulse || "";
					temperature.value = response.temperature || "";
					notes.value = response.vital_signs_note || "";
					bp_diastolic.value = response.bp_diastolic || "";
					bp_systolic.value = response.bp_systolic || "";

					if (response.docstatus == 1) {
						vitals_submitted.value = true;
					} else {
						vitals_submitted.value = false;
					}

					if (response.is_new) {
						vital_update_button.value = "Create";
					} else {
						vital_update_button.value = "Update";
					}
				}
			},
			onError(error) {
				dialog_message = error.messages?.[0] || error;
				dialog_title = "Failed to load vital signs";
				alert_dialog.value = true;
			}
		});
		get_vitals.fetch()
		appointment.value = row.patient_name
		appointmentID.value = row.name
		createVitalsDialog.value = true;
	};

	let create_vitalsigns = createResource({
		url: "/api/method/marley_frontend.waitlist.create_vitalsigns",
		method: "POST",
		makeParams() {
			return {
				appointment: appointmentID.value,
				height: height.value,
				weight: weight.value,
				pulse: pulse.value,
				respiratory_rate: respiratory_rate.value,
				temperature: temperature.value,
				bp_diastolic: bp_diastolic.value,
				bp_systolic: bp_systolic.value,
				notes: notes.value,
				patient_token: patient_token.value || null
			};
		},
		onSuccess(response) {
			if (response.status == "Success") {
				createVitalsDialog.value = false
				reload_waitlist();
			} else if (response.status == "Error") {
				dialog_message = response.message;
				dialog_title = "Failed to create vital signs";
				alert_dialog.value = true;
			}
		},
		onError(error) {
			dialog_message = error.messages?.[0] || error;
			dialog_title = "Failed to create vital signs";
			alert_dialog.value = true;
		},
	});

	// Submit vital signs
	let submit_vital = createResource({
		url: "/api/method/marley_frontend.waitlist.submit_vitalsigns",
		method: "POST",
		makeParams() {
			return {
				appointment: appointmentID.value,
				respiratory: respiratory_rate.value,
				height: height.value,
				weight: weight.value,
				pulse: pulse.value,
				temperature: temperature.value,
				notes: notes.value,
				bp_diastolic: bp_diastolic.value,
				bp_systolic: bp_systolic.value,
			}
		},
		onSuccess(response) {
			createVitalsDialog.value = false;
			if (response && response["status"] == "Error") {
				dialog_message = response["message"];
				dialog_title = "Failed to submit vital signs";
				alert_dialog.value = true;

			} else {
				dialog_message = response["message"];
				dialog_title = "Vitals submitted";
				success_dialog.value = true;
			}
			reload_waitlist();
		},
		onError(error) {
			dialog_message = error.messages?.[0] || error;
			dialog_title = "Failed to submit vital signs";
			alert_dialog.value = true;
		}
	});

	// Reschedule Appointment
	function rescheduleAppointment(row) {
		if (["Open", "Scheduled", "Confirmed"].includes(row.status)) {
			slots.value = [];
			scheduleDialog.value = true; 
			newid.value = row.name; 
			reschedule_practitioner.value = row.practitioner_name;
			reschedule_practitioner_id.value = row.practitioner;
			patient_name_reschedule.value = row.patient;
		} else {
			dialog_title = "Warning";
			dialog_message = `You can't reschedule already ${row.status} appointment`
			alert_dialog.value = true;
		}
	};

	watch(reschedule_date, (newValue) => {
		if (newValue) {
			fetchSlots();
		}
	});

	const fetchSlots = async () => {
		if (!reschedule_practitioner_id.value) {
			slots.value = [];
			return;
		}
		try {
			isLoading.value = true;
			if (reschedule_date.value) {
				errors.value.fetch_slot_error = "";
				await fetch_slots_in_dialog.fetch();
			} 
		} catch (error) {
			errors.value.fetch_slot_error = error.message;
			slots.value = [];
		} finally {
			isLoading.value = false;
		}
	};

	// reschedule slots
	let fetch_slots_in_dialog = createResource({
		url: "/api/method/marley_frontend.waitlist.get_slots_in_dialog",
		method: "GET",
		makeParams() {
			return {
				practitioner: reschedule_practitioner_id.value ? reschedule_practitioner_id.value : null,
				date: reschedule_date.value ? reschedule_date.value : null
			};
		},
		onSuccess(response) {
			slots.value = response.slots;
		},
		onError(error) {
			errors.value.fetch_slot_error = error.message;
		},
	});

	// Reschedule appointment booking
	let reschedule_booking = createResource({
		url: '/api/method/marley_frontend.waitlist.reschedule_appointment_booking',
		method: 'POST',
		makeParams() {
			return {
				appointment_date: reschedule_date.value,
				appointment_id: newid.value,
				new_slot: selectedSlot.value,
			};
		},
		onSuccess(response) {
			dialog_message = "Appointment Rescheduled Successfully";
			dialog_title = "Appointment Reschedulled";
			success_dialog.value = true;
			reschedule_date.value = null;
			newid.value = '';
			reschedule_practitioner.value = '';
			reschedule_practitioner_id.value = '';
			selectedSlot.value = null;
			slots.value = [];
			scheduleDialog.value = false
			reload_waitlist();
		},
		onError(error) {
			if (error) {
				if (error.message.includes("OverlapError")) {
					dialog_message = "Selected patient already have an appointment for that day. Please choose another time slot";
					dialog_title = "Appointment Reschedulling Failed";
					alert_dialog.value = true;
				} else {
					dialog_message = error;
					dialog_title = "Appointment Reschedulling Failed";
					alert_dialog.value = true;
				}
				scheduleDialog.value = false;
			}
		},
	});

	// healthcare service button click function
	function open_healthcare_service(row) {
		let get_data = createResource({
			url: '/api/method/marley_frontend.waitlist.get_patient_data_for_services',
			method: 'GET',
			makeParams() {
				return {
					appointment: row.name,
				}
			},
			onSuccess(response) {
				if (response) {
					company.value = response.company;
					customer.value = response.customer;
					if (customer.value && company.value) {
						get_services_list_.fetch();
					}
				}
			},
			onError(error) {
				dialog_message = error.messages?.[0] || error;
				dialog_title = "Failed to fetch Service Details";
				alert_dialog.value = true;
			}
		});

		let get_services_list_ = createResource({
			url: '/api/method/marley_frontend.waitlist.get_service_list',
			method: 'GET',
			makeParams() {
				return {
					patient: row.patient,
					customer: customer?.value || "",
					company: company?.value || "",
				};
			},
			onSuccess(response) {
				item_list.value = response || [];
				amount.value = 0;
				quantity.value = 0;
				errors.value.amount = "";
			},
			onError(error) {
				dialog_message = error.messages?.[0] || error;
				dialog_title = "Failed to fetch healthcare services";
				alert_dialog.value = true;
			}
		});
		patient_name.value = row.patient_name;
		patient_id.value = row.patient;
		get_data.fetch();
		payments_list.value = [];
		si_payment_mode.value = {};
		if (row.advance_amount) {
			show_advance.value = row.advance_amount_with_currency;
			customer_advance_amount.value = row.advance_amount
		} else{
			show_advance.value = false;
		}
		reference_date_service.value = new Date().toISOString().split('T')[0];
		reference_id_service.value = "";
		use_advance_amount.value = false;
		open_services_sales_invoice.value = true;
	}

	function add_healthcare_services(selections) {
		let total_amount = 0;
		let total_qty = 0
		selected_services.value = [];
		Array.from(selections).forEach((name) => {
			if (name){
				item_list.value.forEach((item) => {
					if (item.reference_name == name) {
						total_qty += parseFloat(item.qty);
						total_amount += parseFloat(item.qty) * parseFloat(item.rate);
						selected_services.value.push(item);
					}
				});
			}
		})
		quantity.value = String(total_qty.toFixed(3));
		amount.value = String(total_amount.toFixed(3));
		let total = 0;
		payments_list.value.forEach(function (row) {
			if (row.amount) {
				total += parseFloat(row.amount)
			}
		});
		if (use_advance_amount.value) {
			if (parseFloat(amount.value) > 0) {
				if (parseFloat(customer_advance_amount.value) > parseFloat(amount.value)) {
					payments_list.value = [];
					total_payable_amount_service.value = String(amount.value)
				} else {
					payable_amount_service.value = String(parseFloat(amount.value) - parseFloat(customer_advance_amount.value) - parseFloat(total));
					total_payable_amount_service.value = String(total + parseFloat(customer_advance_amount.value));
				}
			}
		} else {
			payments_list.value = [];
			total_payable_amount_service.value = "0";
			payable_amount_service.value = String(parseFloat(amount.value) - parseFloat(total_payable_amount_service?.value || 0));
		}
	};

	// Invoice for healthcare service
	function create_service_invoice() {
		let create_service_invoice_ = createResource({
			url: '/api/method/marley_frontend.waitlist.create_services_sales_invoice',
			method: 'POST',
			makeParams() {
				return {
					selected_services: selected_services.value || [],
					company: company.value,
					patient: patient_id.value,
					paid_amount: amount.value,
					payments: payments_list?.value || null,
					use_advance_amount: use_advance_amount?.value || false,
					customer_advance_amount: customer_advance_amount?.value || null
				};
			},
			onSuccess(response) {
				if (response) {
					reload_waitlist();
					sales_invoice_ref = response;
					si_message = `Sales invoice has been created for patient id ${patient_id.value}`;
					sales_invoice_creation_dialog.value = true;
				}
			},
			onError(error) {
				dialog_message = error.messages?.[0] || error;
				dialog_title = "Failed to create sales invoice";
				alert_dialog.value = true;
			},
		});
		create_service_invoice_.fetch();
		open_services_sales_invoice.value = false;
	};

	function open_prescription_dialog(row) {
		let get_data = createResource({
			url: '/api/method/marley_frontend.waitlist.get_patient_data_for_services',
			method: 'GET',
			makeParams() {
				return {
					appointment: row.name,
				}
			},
			onSuccess(response) {
				if (response) {
					patient_name.value = response.patient_name;
					patient_id_pre.value = response.patient_id;
					company.value = response.company;
					customer.value = response.customer;

					encounteroptions.value = response.patient_encounters;
				}
			},
			onError(error) {
				dialog_message = error.messages?.[0] || error;
				dialog_title = "Failed to fetch Prescription Details";
				alert_dialog.value = true;
			}
		});
		get_data.fetch();
		prescription_dialog.value = true;
	};

	function get_prescriptions (encounter) {
		let get_prescription_list_ = createResource({
			url: '/api/method/marley_frontend.waitlist.get_prescriptions',
			method: 'GET',
			makeParams() {
				return {
					encounter: encounter,
					customer: customer.value,
					company: company.value,
				};
			},
			onSuccess(response) {
				prescription_list.value = response || [];
				amount_pre.value = 0;
				quantity_pre.value = 0;
				errors.value.amount = null;
			},
			onError(error) {
				dialog_message = error.messages?.[0] || error;
				dialog_title = "Failed to fetch prescriptions";
				alert_dialog.value = true;
			}
		});
		prescription_list.value = [];
		if (encounter) {
			get_prescription_list_.fetch();
		}
	};

	watch(encounter, (encounter) => {
		get_prescriptions(encounter.value);
	});

	function add_selected_prescriptions(selections) {
		let total_amount = 0;
		let total_qty = 0
		selected_prescriptions.value = [];
		Array.from(selections).forEach((name) => {
			if (name){
				prescription_list.value.forEach((item) => {
					if (item.reference_name == name) {
						total_qty += parseFloat(item.quantity);
						total_amount += parseFloat(item.quantity) * parseFloat(item.rate);
						selected_prescriptions.value.push(item);
					}
				});
			}
		})

		quantity_pre.value = total_qty;
		amount_pre.value = total_amount;
	}

	// Invoice for prescription
	function create_prescription_invoice() {
		let create_prescription_invoice_ = createResource({
			url: '/api/method/marley_frontend.waitlist.create_prescription_sales_invoice',
			method: 'POST',
			makeParams() {
				return {
					selected_prescriptions: selected_prescriptions.value || [],
					company: company.value,
					patient: patient_id_pre.value,
					customer: customer.value,
					paid_amount: amount.value,
					mode_of_payment: pre_payment_mode.value ? pre_payment_mode.value.value : null
				};
			},
			onSuccess(response) {
				if (response) {
					prescription_dialog.value = false;
					reload_waitlist();
					sales_invoice_ref = response;
					si_message = `Sales invoice has been created for patient id ${patient_id_pre.value}`;
					sales_invoice_creation_dialog.value = true;
				}
			},
			onError(error) {
				dialog_message = error.messages?.[0] || error;
				dialog_title = "Failed to create sales invoice";
				alert_dialog.value = true;
			},
		});
		if (!pre_payment_mode.value || amount_pre.value == 0) {
			if (!pre_payment_mode.value) {
				errors.value.pre_payment_mode = "This field is required.";
			}
			if (amount_pre.value == 0) {
				errors.value.amount_pre = "Please select and add prescriptions from table";
			}
		} else {
			create_prescription_invoice_.fetch();
		}
	};

	// #mode of payments
	let mode_of_payments = createResource({
		url: "/api/method/marley_frontend.waitlist.get_mode_of_payments",
		method: "GET",
		onSuccess(response) {
			paymentOptions.value = response;
		},
		onError(error) {
			dialog_message = error.messages?.[0] || error;
			dialog_title = "Failed to get mode of payments";
			alert_dialog.value = true;
		}
	});
	mode_of_payments.fetch();

	function goto_sales_invoices (patient) {
		if (patient) {
			window.location.href = "/app/sales-invoice/view/list?patient=" + patient;
		}
	};

	watch(encounter, (encounter) => {
		get_prescriptions(encounter.value);
	});

	function navigateToDoctype(encounter) {
		window.location.href = "/app/patient-encounter/" + encounter;
	}

	function print_boarding_pass(row) {
		let get_boarding_pass_print_format = createResource({
			url: "/api/method/marley_frontend.waitlist.get_boarding_pass_print_format",
			method: "POST",
			onSuccess(response) {
				if (response) {
					const doc_names = JSON.stringify([row.name,]);
					const default_print_format = response;
					const print_format = default_print_format;

					let pdf_options = JSON.stringify({
						"page-size": "A4",
						"margin-top": "5mm",
						"margin-bottom": "5mm",
						"margin-left": "0mm",
						"margin-right": "0mm",
					});

					const w = window.open(
						"/api/method/frappe.utils.print_format.download_multi_pdf?" +
							"doctype=" +
							encodeURIComponent("Patient Appointment") +
							"&name=" +
							encodeURIComponent(doc_names) +
							"&format=" +
							encodeURIComponent(print_format) +
							"&no_letterhead=0" +
							"&letterhead=No Letterhead" +
							"&options=" +
							encodeURIComponent(pdf_options)
					);

					if (!w) {
						error_dialog.value = true;
						dialog_title = "Please enable pop-ups";
						dialog_message = "Please enable pop-ups of your browser to print boarding pass";
						return;
					}
				} else {
					error_dialog.value = true;
					dialog_title = "Configure Boarding Pass Print Format";
					dialog_message = "Please configure default boarding pass print format in Healthcare Settings";
				}
			},
			onError(error) {
				dialog_message = error.messages?.[0] || error;
				dialog_title = "Boarding Pass Printing Failed";
				error_dialog.value = true;
			},
		});
		get_boarding_pass_print_format.fetch();
	}

	function add_to_table(payment_mode, payable_amount, ref_date, ref_id){
		let isValid = true;
		errors.value = {};

		if (parseFloat(total_payable_amount_service.value) == parseFloat(amount.value)) {
			errors.value.payable_amount_service = "You are already added full amount";
			return
		}

		if (parseFloat(payable_amount_service.value) > parseFloat(amount.value)) {
			errors.value.payable_amount_service = `Please add an amount less than ${amount.value}`;
			return
		}

		if (!payment_mode) {
			errors.value.si_payment_mode = "This field is required.";
			isValid = false;
		} else {
			errors.value.si_payment_mode = "";
		}
		if (!payable_amount) {
			errors.value.payable_amount_service = "This field is required.";
			isValid = false;
		} else {
			errors.value.payable_amount_service = "";
		}

		if (is_bank.value) {
			if (!ref_date) {
				errors.value.reference_date_service = "This field is required.";
				isValid = false;
			} else {
				errors.value.reference_date_service = "";
			}
			if (!ref_id) {
				errors.value.reference_id_service = "This field is required.";
				isValid = false;
			} else {
				errors.value.reference_id_service = "";
			}
		}

		if (!isValid) return;

		let idx = (payments_list && payments_list.value.length > 0 ? payments_list.value.at(-1).idx : 0) + 1;
		if (payable_amount > 0 && payment_mode.value){
			payments_list.value.push({
				idx: idx,
				mode_of_payment: payment_mode?.value || "",
				amount: String(parseFloat(payable_amount) || 0),
				ref_date: ref_date || "",
				ref_id: ref_id || ""
			})
			errors.value.services_error = "";
			payable_amount_service.value = "";
			si_payment_mode.value = {};
			reference_id_service.value = "";
			let total = 0;
			payments_list.value.forEach(function (row) {
				if (row.amount) {
					total += parseFloat(row.amount)
				}
			});

			if (use_advance_amount.value) {
				if (parseFloat(amount.value) > 0) {
					if (parseFloat(customer_advance_amount.value) > parseFloat(amount.value)) {
						payments_list.value = [];
						total_payable_amount_service.value = amount.value
					} else {
						payable_amount_service.value = parseFloat(amount.value) - parseFloat(customer_advance_amount.value) - parseFloat(total);
						total_payable_amount_service.value = total + parseFloat(customer_advance_amount.value);
					}
				}
			} else {
				total_payable_amount_service.value = total
			}
		} else {
			errors.value.services_error = "Need payment mode and amount to process"
		}
	};

	function remove_payments (selections) {
		Array.from(selections).forEach((idx) => {
			if (idx){
				payments_list.value = payments_list.value.filter(item => item.idx !== idx);
			}
		});
		let total = 0;
		payments_list.value.forEach(function (row) {
			if (row.amount) {
				total += parseFloat(row.amount)
			}
		});
		if (use_advance_amount.value) {
			if (parseFloat(amount.value) > 0) {
				if (parseFloat(customer_advance_amount.value) > parseFloat(amount.value)) {
					payments_list.value = [];
					total_payable_amount_service.value = amount.value
				} else {
					payable_amount_service.value = parseFloat(amount.value) - parseFloat(customer_advance_amount.value) - parseFloat(total);
					total_payable_amount_service.value = total + parseFloat(customer_advance_amount.value);
				}
			}
		} else {
			total_payable_amount_service.value = total
		}
	};

	watch(si_payment_mode, (mode) => {
		if (mode) {
			let total = 0;
			payments_list.value.forEach(function (row) {
				if (row.amount) {
					total += parseFloat(row.amount)
				}
			});
			if (use_advance_amount.value) {
				if (parseFloat(amount.value) > 0) {
					if (parseFloat(customer_advance_amount.value) > parseFloat(amount.value)) {
						payments_list.value = [];
						total_payable_amount_service.value = amount.value
					} else {
						payable_amount_service.value = parseFloat(amount.value) - parseFloat(customer_advance_amount.value) - parseFloat(total);
						total_payable_amount_service.value = total + parseFloat(customer_advance_amount.value);
					}
				}
			} else {
				total_payable_amount_service.value = total
			}
			fetch_mode_type(mode);
		}
	});


	function fetch_mode_type(mode) {
		let fetch_mode_type = createResource({
			url: "/api/method/marley_frontend.waitlist.fetch_mode_type",
			method: "GET",
			makeParams() {
				return {
					mode: mode?.value || null
				}
			},
			onSuccess(response) {
				if (response) {
					mop_type.value = response.mode_type;
					is_bank.value = response.is_bank;
				}
			},
			onError(error) {
				dialog_message = error.messages?.[0] || error;
				dialog_title = "Type fetching failed";
				error_dialog.value = true;
			}
		});
		fetch_mode_type.fetch();
	}

	function print_sales_invoice(sales_invoice_ref) {
		window.open("/app/print/Sales Invoice/" + sales_invoice_ref, "_blank");
	}
</script>

<style scoped>
::v-deep(.text-blue-600) {
	color: #2563eb !important;
}

::v-deep(.text-purple-400) {
	color: #964dc0 !important;
}
</style>