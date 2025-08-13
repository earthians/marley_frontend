<template>
	<div class="relative min-h-screen bg-gray-100">
		<LanguageSelector
			:selectedLanguage="selectedLanguage"
			@change-language="changeLanguage"
		/>
		<div class="h-full bg-surface-white flex items-center justify-center overflow-hidden">
			<div
				class="w-[80%] h-[80vh] flex gap-4 items-center justify-center"
				:class="{
					'flex-col': isVerticalScreen || !(practitioner.value && appointment_date),
					'flex-row': practitioner.value && appointment_date && !isVerticalScreen,
				}"
			>
				<div
					:class="[
						'relative bg-surface-white p-6 rounded-2xl shadow-xl border flex flex-col justify-center w-full max-w-[800px] mx-auto',
						practitioner.value && appointment_date && !isVerticalScreen ? 'w-1/2 max-h-auto min-h-[600px]' : 'min-h-[600px]'
					]"
				>
					<!-- Breadcrumbs -->
					<div class="absolute top-4 left-4">
						<Breadcrumbs :items="[
							{ label: 'Home', route: { name: 'Kiosk' }},
							{ label: 'Confirm Booking', route: '/Booking_confirmation' },
							{ label: 'Book Appointment', route: '/Appointment' },
						]"
						class="flex flex-wrap items-center text-sm text-gray-600 space-x-1 sm:space-x-2 overflow-x-auto whitespace-nowrap"/>
					</div>

					<div class="text-xl font-bold text-center py-4 text-ink-gray-8">
						Hello {{ patient }}!
					</div>

					<h1 class="text-3xl font-bold text-center mb-8 text-ink-gray-8">
						{{ translations.newAppointment[selectedLanguage] }}
					</h1>

					<div class="space-y-6 sm:space-y-4 px-2 py-15 sm:px-6">
						<FormControl type="autocomplete" :options="departmentOptions" v-model="department"
							:label="translations.selectDepartment[selectedLanguage]" size="md" />
						<FormControl type="autocomplete" :options="practitionerOptions" v-model="practitioner"
							:label="translations.selectPractitioner[selectedLanguage]" :required="true" size="md" />
						<DatePicker
							v-model="appointment_date"
							variant="subtle"
							:placeholder=translations.pickDate[selectedLanguage]
							:disabled="false"
							:required="true"
							:label=translations.pickDate[selectedLanguage]
							:formatter="(date) => getFormat(date, '', true)"
						/>
					</div>
				</div>
				<div v-if="practitioner.value && appointment_date"
					:class="'bg-surface-white p-6 rounded-2xl shadow-xl border flex flex-col justify-center w-full min-w-[400px] max-w-[800px] mx-auto h-[600px]'"
				>
					<h2 class="text-3xl font-bold text-center mb-4 pb-10 text-ink-gray-8">
						{{ translations.choose_a_slot[selectedLanguage] }}
					</h2>

					<div v-if="isLoadingSlots" class="flex justify-center items-center h-48">
						<div class="spinner-border animate-spin inline-block w-12 h-12 border-4 rounded-full"
							style="border-top-color: black;" role="status">
							<span class="sr-only text-ink-gray-8">Loading...</span>
						</div>
					</div>

					<div
						v-else-if="slots.length"
						class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 overflow-y-auto max-h-[400px] pr-1"
					>
						<Button v-for="(slot, index) in slots" :key="index" :label="slot"
							:class="[
								selectedSlot === slot ? '!text-ink-white !bg-surface-gray-7' : '!bg-surface-white-7 hover:!bg-surface-white-5 hover:!text-ink-gray',
								'text-gray-700 font-semibold rounded-lg'
							]"
							@click="selectSlot(slot)" />
					</div>

					<p v-else class="text-gray-500 font-semibold text-lg text-center">
						{{ translations.no_available_slots[selectedLanguage] }}
					</p>

					<div class="flex justify-center pt-10">
						<Button v-if="selectedSlot"
							:loading="isLoadingSlots"
							:disabled="isLoadingSlots"
							@click="confirmBooking"
							:variant="'solid'"
							:ref_for="true"
							theme="gray"
							size="lg"
						>
							{{ translations.confirm_booking[selectedLanguage] }}
						</Button>
					</div>
				</div>
			</div>
		</div>
		<Footer />
	</div>

	<Dialog :options="{
		title: dialog_title || 'Error',
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
	}" v-model="dialog" @click="dialog.value = false" />

	<!-- patient profile completeion before booking -->
	<CompleteProfileDialog
		v-model="complete_profile_dialog"
		:form_firstName="form_firstName"
		:onUpdate:form_firstName="val => form_firstName = val"
		:form_lastName="form_lastName"
		:onUpdate:form_lastName="val => form_lastName = val"
		:form_gender="form_gender"
		:onUpdate:form_gender="val => form_gender = val"
		:form_dob="form_dob"
		:onUpdate:form_dob="val => form_dob = val"
		:form_marital="form_marital"
		:onUpdate:form_marital="val => form_marital = val"
		:form_mobile="form_mobile"
		:onUpdate:form_mobile="val => form_mobile = val"
		:form_addressLine1="form_addressLine1"
		:onUpdate:form_addressLine1="val => form_addressLine1 = val"
		:form_addressLine2="form_addressLine2"
		:onUpdate:form_addressLine2="val => form_addressLine2 = val"
		:form_city="form_city"
		:onUpdate:form_city="val => form_city = val"
		:form_state="form_state"
		:onUpdate:form_state="val => form_state = val"
		:form_zip="form_zip"
		:onUpdate:form_zip="val => form_zip = val"
		:errors="errors"
		:genderOptions="genderOptions"
		@confirm="handleConfirm"
	/>
</template>


<script setup>
	import { ref, watch, onMounted, onBeforeUnmount } from "vue";
	import { createResource, Breadcrumbs, Dialog, FormControl, ErrorMessage, DatePicker } from "frappe-ui";
	import { useRouter } from "vue-router";
	import LanguageSelector from '@/components/LanguageSelector.vue';
	import Footer from '@/components/Footer.vue';
	import CompleteProfileDialog from '@/components/CompleteProfileDialog.vue';
	import { getFormat } from '@/utils'

	const router = useRouter();
	let selectedLanguage = ref(localStorage.getItem("selectedLanguage") || "en");

	let translations = {
		newAppointment: {
			en: "New Appointment",
			ar: "موعد جديد",
			ml: "പുതിയ അപോയിന്റ്മെന്റ്",
		},
		selectDepartment: {
			en: "Select Department",
			ar: "اختر القسم",
			ml: "ഡിപ്പാർട്ട്‌മെന്റ് തിരഞ്ഞെടുക്കുക"
		},
		selectPractitioner: {
			en: "Select Practitioner",
			ar: "اختر الممارس",
			ml: "പ്രാക്ടിഷണർ തിരഞ്ഞെടുക്കുക",
		},
		pickDate: {
			en: "Pick a Date",
			ar: "اختر التاريخ",
			ml: "തീയതി തിരഞ്ഞെടുക്കുക",
		},
		checkAvailability: {
			en: "Check Availability",
			ar: "تحقق من التوفر",
			ml: "ലഭ്യത പരിശോധിക്കുക",
		},
		choose_a_slot: {
			en: "Choose a Slot",
			ar: "اختر موعداً",
			ml: "സ്ലോട്ട് തിരഞ്ഞടയ്ക്കുക",
		},
		no_available_slots: {
			en: "No available slots for the selected date.",
			ar: "لا توجد مواعيد متاحة في التاريخ المحدد.",
			ml: "തിരഞ്ഞെടുത്ത തീയതിയിൽ പ്രാപ്യമായ സ്ലോട്ടുകൾ ഇല്ല.",
		},
		confirm_booking: {
			en: "Confirm Booking",
			ar: "تأكيد الحجز",
			ml: "ബുക്കിംഗ് സ്ഥിരീകരിക്കുക",
		},
	};

	let practitioner = ref({ label: '', value: '' });
	let department = ref({ label: '', value: '' });
	let practitionerOptions = ref([]);
	let defAppType = ref(null);
	let departmentOptions = ref([]);
	let patient = ref(localStorage.getItem("patient_name") || "");
	let patient_id = ref(localStorage.getItem("patient_id") || "");
	let appointment_date = ref(new Date().toLocaleDateString("en-CA"));
	let dialog = ref(false);
	let complete_profile_dialog = ref(false);
	let dialog_message = ref("");
	let dialog_title = ref(null);
	let error_message = ref("");
	let form_firstName = ref("");
	let form_lastName = ref("");
	let form_mobile = ref("");
	let form_gender = ref("");
	let form_marital = ref("");
	let form_dob = ref(null);
	let form_addressLine1 = ref("");
	let form_addressLine2 = ref("");
	let form_city = ref("");
	let form_state = ref("");
	let form_zip = ref("");
	let genderOptions = ref([]);
	let errors = ref({});

	let slots = ref([]);
	let selectedSlot = ref(null);
	let isSlotsChecked = ref(false);
	let isLoadingSlots = ref(false);
	let logo = ref("");
	let get_logo = createResource({
		url:"/api/method/marley_frontend.api.get_logo_image",
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
	})
	get_logo.fetch()

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const isVerticalScreen = ref(false)

	function checkOrientation() {
		isVerticalScreen.value = window.innerHeight > window.innerWidth
	}

	onMounted(() => {
		checkOrientation()
		window.addEventListener('resize', checkOrientation)
	})

	onBeforeUnmount(() => {
		window.removeEventListener('resize', checkOrientation)
	})

	watch(appointment_date, (newDate) => {
		if (newDate && new Date(newDate) < today) {
			// If the selected date is in the past, clear the date
			appointment_date.value = null;
			dialog_message = "Past dates are not allowed. Please select a valid date."
			dialog.value = true;
		}
		fetchSlots();
	});

	watch(practitioner, (newValue) => {
		if(!newValue) {
			slots.value = []
		}
		fetchSlots();
	})

	const { fetch } = createResource({
		url: "/api/method/marley_frontend.api.get_departments",
		method: "GET",
		onSuccess(response) {
			practitionerOptions.value = response.practitioners;
			departmentOptions.value = response.departments;
			defAppType.value = response["defAppType"]
		},
		onError: (error) => {
			dialog_message = "Failed to load data. Please contact the System Manager.";
			dialog.value = true;
			error_message = `Dialog: ${dialog_message}\nError:${error.message}`
			error_log.submit()
		},
	});
	fetch();

	watch(department, (newValue) => {
		if (newValue != null) {
			department.value = newValue || null;
			practitioners.fetch();
		} else {
			fetch();
		}
	});

	let practitioners = createResource({
		url: "/api/method/marley_frontend.api.get_practitioners",
		method: "GET",
		makeParams() {
			return {
				department: department.value?.value || null
			}
		},
		onSuccess(response) {
			practitionerOptions.value = response.practitioners;
		},
		onError(error) {
			dialog_message = "Failed to load practitioners department-wise. Please contact the System Manager.";
			dialog.value = true;
			error_message = `Dialog: ${dialog_message}\nError:${error.message}`;
			error_log.submit();
		}
	});

	let error_log = createResource({
		url: "/api/method/marley_frontend.api.new_error_log",
		method: "POST",
		makeParams() {
			return {
				error_message: error_message,
				error_title: "Kiosk Screen: Appointment"
			}
		}
	});

	let checkDetails = createResource({
		url: "/api/method/marley_frontend.api.check_patient_details",
		method: "GET",
		makeParams() {
			return {
				patient_id: patient_id.value
			}
		},
		onSuccess(response) {
			if (response == "complete") {
				fetchSlots();
			} else {
				form_firstName.value = response["first_name"] || "";
				form_lastName.value = response["last_name"] || "";
				form_mobile.value = response["mobile"] || "";
				form_gender.value = response["gender"] || "";
				form_dob.value = response["dob"] || null;
				form_addressLine1.value = response["address1"] || "";
				form_addressLine2.value = response["address2"] || "";
				form_city.value = response["city"] || "";
				form_state.value = response["state"] || "";
				form_zip.value = response["zip"] || "";
				form_marital.value = response["marital"] || "";
				get_genders.fetch();
				complete_profile_dialog.value = true;
			}
		},
		onError(error) {
			dialog_message = `API Error: ${error.message}`;
			dialog.value = true;
			error_message = `Dialog: ${dialog_message}\nError:${error.message}`;
			error_log.submit();
		}
	});

	let get_genders = createResource({
		url: "/api/method/marley_frontend.api.get_gender",
		method: "GET",
		onSuccess(response) {
			genderOptions.value = response.genders.map((gender) => ({
				label: gender.label,
				value: gender.value,
			}));
		},
		onError(error) {
			dialog_message = "Unable to fetch from get_gender API. Contact System Manager"
			dialog.value = true;
			error_message = `Dialog: ${dialog_message}\n${error.message}`
			error_log.submit();
		},
	});

	let updateDetails = createResource({
		url: "/api/method/marley_frontend.api.update_patient",
		method: "POST",
		makeParams() {
			return {
				patient_id: patient_id.value,
				firstname: form_firstName.value,
				lastname: form_lastName.value,
				mobile: form_mobile.value,
				gender: form_gender.value,
				dob: form_dob.value,
				address1: form_addressLine1.value,
				address2: form_addressLine2.value,
				city: form_city.value,
				state: form_state.value,
				zip: form_zip.value,
				marital: form_marital.value
			}
		},
		onError(error) {
			dialog_message = "API Error";
			dialog.value = true;
			error_message = `Dialog: ${dialog_message}\nError:${error.message}`;
			error_log.submit();
		}
	});

	const handleConfirm = () => {
		errors.value = {};
		let isValid = true;
		if (!form_marital.value || !form_dob.value || !form_addressLine1.value || !form_city.value || !form_state.value) {
			if (!form_addressLine1.value) {
				errors.value.form_addressLine1 = "This field is required.";
				isValid = false;
			}
			if (!form_city.value) {
				errors.value.form_city = "This field is required.";
				isValid = false;
			}
			if (!form_state.value) {
				errors.value.form_state = "This field is required.";
				isValid = false;
			}
			if (!form_marital.value) {
				errors.value.form_marital = "This field is required.";
				isValid = false;
			}
			if (!form_dob.value) {
				errors.value.form_dob = "This field is required.";
				isValid = false;
			}
		} else {
			complete_profile_dialog.value = false;
			updateDetails.submit()
			fetchSlots();
		}
	};

	const fetchSlots = async () => {
		const get_slots = createResource({
			url: "/api/method/marley_frontend.api.get_slots",
			method: "GET",
			params: {
				date: appointment_date.value,
				practitioner: practitioner.value?.value || null
			},
			onSuccess(response) {
				isSlotsChecked.value = true;
				slots.value = response.slots || [];
			},
			onError(error) {
				dialog_message = "Failed to fetch slots. Contact System Manager"
				dialog.value = true;
				error_message = error_message = `Dialog: ${dialog_message}\nError:${error.message}`
				error_log.submit();
			},
		});

		try {
			isLoadingSlots.value = true;
			if (appointment_date.value && practitioner.value) {
				await get_slots.submit();
			}
		} catch (error) {
			console.error("Error fetching slots:", error);
		} finally {
			isLoadingSlots.value = false;
		}
	};

	const selectSlot = (slot) => {
		selectedSlot.value = slot;
	};

	const confirmBooking = async () => {
		const booking = createResource({
			url: "/api/method/marley_frontend.api.patient_appointment",
			method: "POST",
			makeParams() {
				return {
					practitioner: practitioner.value?.value || null,
					patient: patient_id.value,
					date: appointment_date.value,
					slot: selectedSlot.value,
				};
			},
			onSuccess(response) {
				localStorage.setItem("booking_date", appointment_date.value)
				if (response.status == "success"){
					router.push({
						name: "BookingSuccess",
						query: {}
					});
				}
			},
		});

		try {
			isLoadingSlots.value = true; // Start showing the loading indicator
			await booking.submit();
		} catch (error) {
			if (error.message.includes("OverlapError")) {
				dialog_message = "You have another booking at this slot"
				dialog_title = "Already Booked"
				dialog.value = true;
			} else {
				dialog_message = "APIError: Contact System Manager"
				dialog.value = true;
			}
		} finally {
			isLoadingSlots.value = false; // Stop showing the loading indicator
		}
	};

	// Function to change the language and update local storage
	const changeLanguage = (language) => {
		selectedLanguage.value = language;
		localStorage.setItem("selectedLanguage", language);
	};
</script>