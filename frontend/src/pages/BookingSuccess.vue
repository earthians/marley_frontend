<template>
	<div class="flex h-screen items-center justify-center bg-surface-white">
		<LanguageSelector
			:selectedLanguage="selectedLanguage"
			@change-language="changeLanguage"
		/>

		<!-- Centered Box -->
		<div
			class="relative flex flex-col items-center justify-center space-y-6 p-10 bg-surface-white rounded-xl shadow-xl border w-[800px] min-h-[600px] max-h-[600px]">
			<div class="absolute top-4 left-4">
				<Breadcrumbs :items="[
					{
						label: 'Home',
						route: {
							name: 'Kiosk',
						},
					},
					{
						label: 'Book Appointment',
						route: '/Appointment',
					},
					{
						label: 'Success',
						route: '/BookingSuccess',
					},
				]"
				/>
			</div>
			<!-- Success Icon/Image -->
			<img src="/src/assets/Success.png" alt="Success Icon" class="h-24 w-24 object-contain" />

			<!-- Success Message -->
			<p class="text-2xl font-bold text-center text-ink-gray-8">
				{{ translations[selectedLanguage].appointmentBooked }}
			</p>
			<p class="text-sm text-gray-600 text-center text-ink-gray-8">
				{{ translations[selectedLanguage].appointmentBookedMessage }}
			</p>

			<!-- Action Buttons -->
			<div class="flex space-x-2">
				<Button
					@click="bookAnother"
					:variant="'solid'"
					:ref_for="true"
					theme="gray"
					size="lg"
				>
					{{ translations[selectedLanguage].book }}
				</Button>
				<Button
					@click="goToHome"
					:variant="'subtle'"
					:ref_for="true"
					theme="gray"
					size="lg"
				>
					{{ translations[selectedLanguage].leave }}
				</Button>
			</div>
		</div>
		<Footer />
	</div>
</template>


<script setup>
	import { useRouter } from "vue-router";
	import { Breadcrumbs } from "frappe-ui";
	import { ref } from "vue";
	import LanguageSelector from '@/components/LanguageSelector.vue';
	import Footer from '@/components/Footer.vue';

	const router = useRouter();

	// Define translations
	const translations = {
		en: {
			appointmentBooked: "Appointment Booked",
			appointmentBookedMessage: "The Appointment has been successfully booked.",
			leave: "I'm Done",
			book: "Book another Appointment"
		},
		ar: {
			appointmentBooked: "تم حجز الموعد",
			appointmentBookedMessage: "تم حجز الموعد بنجاح.",
			leave: "مغادرة",
			book: "حجز موعد آخر"
		},
		ml: {
			appointmentBooked: "അപ്പോയിന്റ് ബുക്ക് ചെയ്തു",
			appointmentBookedMessage: "അപ്പോയിന്റ് വിജയകരമായി ബുക്ക് ചെയ്യപ്പെട്ടു.",
			leave: "തിരിച്ച് പോവുക",
			book: "മറ്റൊരു അപ്പോയിൻ്റ്മെൻ്റ് ബുക്ക് ചെയ്യുക"
		},
	};

	const selectedLanguage = ref(localStorage.getItem("selectedLanguage") || "en");

	// Function to change language and save it in local storage
	const changeLanguage = (language) => {
		selectedLanguage.value = language;
		localStorage.setItem("selectedLanguage", language);
	};

	function goToHome() {
		localStorage.clear();
		router.push({ name: "Kiosk" });
	}

	function bookAnother() {
		router.push("Appointment");
	}
</script>
