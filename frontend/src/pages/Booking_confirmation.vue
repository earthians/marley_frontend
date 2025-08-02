<template>
	<div class="flex h-full items-center justify-center bg-suface-white">
		<!-- Language Selector -->
		<LanguageSelector
			:selectedLanguage="selectedLanguage"
			@change-language="changeLanguage"
		/>

		<!-- Centered Box -->
		<div
			class="relative flex flex-col items-center justify-center space-y-6 p-4 bg-surface-white rounded-lg shadow-lg border w-[800px] min-h-[600px] max-h-[600px]">
			<!-- Breadcrumbs in the top-left corner -->
			<div class="absolute top-4 left-4">
				<Breadcrumbs :items="[
					{
						label: 'Home',
						route: {
							name: 'Kiosk',
						},
					},
					{
						label: 'Confirm Booking',
						route: '/Booking_confirmation?appointment='+ appointment_id,
					},
				]" />
			</div>
			<!-- Content inside the white box -->
			<img src="/src/assets/bookingconfirm.jpg" alt="Welcome Image" />
			<div v-if="appointment_id">
				<p class="text-center text-md text-ink-gray-8">
					{{ translations[selectedLanguage].have_appointment }}
				</p>
			</div>
			<div v-else>
				<p class="text-center text-md text-ink-gray-8">
					{{ translations[selectedLanguage].no_appointment }}
				</p>
			</div>
			<div class="flex space-x-4 py-4">
				<Button
					@click="goToAppointment"
					class="px-4 py-2 transition-all"
					:variant="'solid'"
					:ref_for="true"
					theme="gray"
					size="lg"
				>
					{{ translations[selectedLanguage].book }}
				</Button>
			</div>
		</div>
		<Footer />
	</div>

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
				onClick: () => {
					route_to_home();
				}
			},
		],
	}" v-model="success_dialog" />

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
	}" v-model="alert_dialog" />

	<Dialog v-model="dialogAppointment">
		<template #body-title>
			<h3>Select your Appointment</h3>
		</template>
		<template #body-content>
			<div v-if="appointmentList.length > 0">
				<ul class="space-y-2">
					<li v-for="(app, index) in appointmentList" :key="index"
						class="p-2 border rounded-lg flex items-center space-x-4 cursor-pointer"
						:class="{ 'bg-gray-200': selectedAppointment === app.name }" @click="selectAppointment(app.name)">
						<div>
							<strong>{{ app.practitioner_name }}</strong>
							<p class="text-sm text-gray-600">ID: {{ app.name }} Time: {{ app.appointment_time }}</p>
						</div>
					</li>
				</ul>
			</div>
			<div v-else>
				<p>No Appointments found.</p>
			</div>
		</template>
		<template #actions>
			<Button variant="solid" :disabled="!selectedAppointment" @click="confirmSelection">
				Confirm
			</Button>
			<Button class="ml-2" @click="dialogAppointment = false">
				Close
			</Button>
		</template>
	</Dialog>
</template>

<script setup>
	import { useRouter, useRoute } from "vue-router";
	import { ref, onMounted } from "vue";
	import { createResource, Dialog, Breadcrumbs } from "frappe-ui";
	import LanguageSelector from '@/components/LanguageSelector.vue';
	import Footer from '@/components/Footer.vue';

	// Define translations
	const translations = {
		en: {
			book: "Book an Appointment",
			have_appointment: "You already have an appointment, want to book another one?",
			no_appointment: "You have no appointments today, want to book one?",
		},
		ar: {
			book: "حجز موعد",
			have_appointment: "لديك موعد بالفعل، هل تريد حجز موعد آخر؟",
			no_appointment: "ليس لديك مواعيد اليوم، هل تريد حجز موعد؟",
		},
		ml: {
			book: "ഒരു അപ്പോയിൻ്റ്മെൻ്റ് ബുക്ക് ചെയ്യുക",
			have_appointment: "നിങ്ങൾക്ക് ഇതിനകം ഒരു അപ്പോയിന്റ്മെന്റ് ഉണ്ട്, മറ്റൊന്ന് ബുക്ക് ചെയ്യണോ?",
			no_appointment: "നിങ്ങൾക്ക് ഇന്ന് അപ്പോയിൻ്റ്‌മെൻ്റുകളൊന്നുമില്ല, ഒരെണ്ണം ബുക്ക് ചെയ്യണോ?",
		},
	};

	// Set the language dynamically based on local storage or default to English
	const selectedLanguage = ref("en");
	const router = useRouter();
	const route = useRoute();
	let patient_id = ref(localStorage.getItem("patient_id") || null);
	let appointment_id = route.query.appointment || null;
	let success_dialog = ref(false);
	let alert_dialog = ref(false);
	let dialog_message = ref("");
	let dialog_title = ref("");
	let dialogAppointment = ref(false);
	let appointmentList = ref([]);
	let selectedAppointment = ref(null);
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

	onMounted(() => {
		const savedLanguage = localStorage.getItem("selectedLanguage");
		if (savedLanguage) {
			selectedLanguage.value = savedLanguage;
		}
	});

	// Function to change the language and update local storage
	const changeLanguage = (language) => {
		selectedLanguage.value = language;
		localStorage.setItem("selectedLanguage", language);
	};

	function goToAppointment() {
		router.push({ name: "Appointment" });
	}

	let checkin = createResource({
		url: "/api/method/marley_frontend.api.check_appointment",
		method: "GET",
		makeParams() {
			return {
				patient_id: patient_id.value,
				appointment_id: appointment_id ? appointment_id : null
			};
		},
		onSuccess(response) {
			if (response["message"]) {
				dialog_message = `${response["message"]}`;
				dialog_title = "Message";
				success_dialog.value = true;
			} else if (response["alert"]) {
				dialog_message = response["alert"];
				dialog_title = "Alert";
				alert_dialog.value = true;
			} else if (response["route"]) {
				dialog_message = response["payment_message"];
				dialog_title = "Complete Payment";
				success_dialog.value = true;
			}
		},
		onError(error) {
			dialog_message = `APIError: ${error.message}`;
			dialog_title = "Error";
			alert_dialog.value = true;
		}
	});

	const selectAppointment = (appId) => {
		selectedAppointment.value = appId;
	};

	const confirmSelection = () => {
		if (selectedAppointment.value) {
			let selectedAppData = appointmentList.value.find(
				(app) => app.name === selectedAppointment.value
			);
			if (selectedAppData) {
				// localStorage.setItem("patient_id", selectedPatient.value);
				localStorage.setItem("booking_date", selectedAppData.appointment_date)
				appointment_id = selectedAppointment.value
				checkin.fetch();
			}
			dialogAppointment.value = false;
		}
	};

	function route_to_home() {
		localStorage.clear();
		router.push({ name: "Kiosk" });
	}
</script>
