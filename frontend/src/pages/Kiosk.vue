<template>
	<div class="flex h-screen items-center justify-center bg-surface-white relative">
		<LanguageSelector
			:selectedLanguage="selectedLanguage"
			@change-language="changeLanguage"
		/>

		<div
			class="relative flex flex-col items-center justify-center space-y-6 p-4 bg-surface-white rounded-lg shadow-lg border w-[800px] min-h-[600px] max-h-[600px]">
			<div class="flex flex-col justify-center items-center gap-4 py-8">
				<img :src="brand" alt="Welcome Image" class="w-full max-h-[8vh] object-contain" />
			</div>

			<div class="flex justify-center items-center gap-2 py-4">
				<FormControl
					:type="'text'"
					:ref_for="true"
					size="lg"
					variant="subtle"
					:placeholder="translations[selectedLanguage].placeholder"
					v-model="patient_id"
				/>
				<Button
					@click="handleButtonClick"
					class="px-4 py-2 transition-all"
					:variant="'solid'"
					:ref_for="true"
					theme="gray"
					size="lg"
				>
					{{ translations[selectedLanguage].submit }}
				</Button>
			</div>
		</div>
		<Footer />
	</div>
	<Dialog :options="{
		title: 'Error',
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
				onClick: () => {
					dialog = false;
				},
			},
		],
	}" v-model="dialog" />
	<Dialog :options="{
		title: 'Alert',
		size: '2xl',
		icon: {
			name: 'alert-triangle',
			appearance: 'warning',
		},
	}" v-model="dialogReg">
		<template #body-content>
			<h3 class="text-ink-gray-8">No Patient found for the given Mobile number. Proceed to new Patient registration?</h3>
		</template>
		<template #actions>
			<Button variant="solid" @click="router.push('Register')">
				Confirm
			</Button>
			<Button class="ml-2" @click="dialogReg = false">
				Cancel
			</Button>
		</template>
	</Dialog>

	<Dialog v-model="dialogOtp">
		<template #body-title>
			<h3 class="text-ink-gray-8">Enter OTP</h3>
		</template>
		<template #body-content>
			<FormControl :type="'text'" :ref_for="true" size="md" variant="subtle"
				label="Enter the OTP obtained on mobile number" :disabled="false" v-model="otpInput" />
		</template>
		<template #actions>
			<Button variant="solid" @click="checkOtp">
				Confirm
			</Button>
			<Button class="ml-2" @click="dialogOtp = false">
				Close
			</Button>
		</template>
	</Dialog>

	<Dialog v-model="dialogPatient">
		<template #body-title>
			<h3 class="text-ink-gray-8">Select a Patient</h3>
		</template>
		<template #body-content>
			<div v-if="patientList.length > 0">
				<ul class="space-y-2">
					<li v-for="(patient, index) in patientList" :key="index"
						class="p-2 border rounded-lg flex items-center space-x-4 cursor-pointer"
						:class="{ 'bg-gray-200': selectedPatient === patient.name }" @click="selectPatient(patient.name)">
						<div>
							<strong class="text-ink-gray-7">{{ patient.patient_name }}</strong>
							<p class="text-sm text-gray-600 py-1">ID: {{ patient.name }}</p>
						</div>
					</li>
				</ul>
			</div>
			<div v-else>
				<p>No patients found.</p>
			</div>
		</template>
		<template #actions>
			<Button variant="solid" :disabled="!selectedPatient" @click="confirmSelection">
				Confirm
			</Button>
			<Button class="ml-2" @click="dialogPatient = false">
				Close
			</Button>
			<Button class="ml-2" @click="router.push('Register')">
				Register New Patient
			</Button>
		</template>
	</Dialog>

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
		@skip="handleSkip"
	/>
</template>

<script setup>
	import { useRouter } from "vue-router";
	import { Button, FormControl, Dialog, createResource } from "frappe-ui";
	import { ref, onMounted } from "vue";
	import LanguageSelector from '@/components/LanguageSelector.vue';
	import Footer from '@/components/Footer.vue';
	import CompleteProfileDialog from '@/components/CompleteProfileDialog.vue';
	import defaultLogo from '@/assets/MH-logo.svg'

	let patient_id = ref("");
	let dialog = ref(false);
	let dialogReg = ref(false);
	let dialogOtp = ref(false);
	let dialogPatient = ref(false);
	let dialog_title = ref("");
	let patientList = ref([]);
	let selectedPatient = ref(null);
	let otpInput = ref("");
	let dialog_message = ref("");
	let error_message = ref("");

	let complete_profile_dialog = ref(false);
	let form_firstName = ref("");
	let form_lastName = ref("");
	let form_mobile = ref("");
	let errors = ref({});
	let form_marital = ref("");
	let form_gender = ref("");
	let form_dob = ref(null);
	let form_addressLine1 = ref("");
	let form_addressLine2 = ref("");
	let form_city = ref("");
	let form_state = ref("");
	let form_zip = ref("");
	let genderOptions = ref([]);

	const brand = ref(defaultLogo);
	let get_brand_image = createResource({
		url:"/api/method/marley_frontend.api.get_brand_image",
		method: "GET",
		makeParams() {
			return {};
		},
		onSuccess(response) {
			if (response) {
				brand.value = response;
			}
		},
	})
	get_brand_image.fetch()

	let genders = createResource({
		url: "/api/method/marley_frontend.api.get_gender",
		method: "GET",
		onSuccess(response) {
			genderOptions.value = response.genders;
		},
		onError(error) {
			dialog_title = "Fetching Gender Failed";
			dialog_message = error.messages?.[0] || error;
			dialog.value = true;
		},
	});
	genders.fetch();

	// Define translations
	const translations = {
		en: {
			placeholder: "Enter Mobile number",
			submit: "Send OTP",
		},
		ar: {
			placeholder: "أدخل رقم الجوال",
			submit: "إرسال OTP",
		},
		ml: {
			placeholder: "മൊബൈൽ നമ്പർ നൽകുക",
			submit: "ഒ.ടി.പി അയയ്ക്കുക",
		},
	};

	const selectedLanguage = ref("en"); // Default language

	// Function to change language and save it in local storage
	const changeLanguage = (language) => {
		selectedLanguage.value = language;
		localStorage.setItem("selectedLanguage", language);
	};

	// Retrieve language from local storage or use default
	onMounted(() => {
		const savedLanguage = localStorage.getItem("selectedLanguage");
		if (savedLanguage) {
			selectedLanguage.value = savedLanguage;
		}
	});

	const router = useRouter();

	let patient_verification = createResource({
		url: "/api/method/marley_frontend.api.get_patient",
		method: "GET",
		makeParams() {
			return {
				patient_id: patient_id.value,
			};
		},
		onSuccess(response) {
			if (response.status === "success" && response.patients) {
				patientList.value = response.patients;
				dialogPatient.value = true;
			} else if (response["error"]) {
				dialog_message = `${response["error"]}. Proceed to New Patient Registration`;
				dialogReg.value = true;
			}
		},
		onError(error) {
			dialog_message = "APIError: Please contact the System Manager."
			dialog.value = true;
			error_message = `Dialog: ${dialog_message}\nError:${error.message}`;
			error_log.submit()
		}
	});

	const selectPatient = (patientId) => {
		selectedPatient.value = patientId;
	};

	let get_appointment = createResource({
		url: "/api/method/marley_frontend.api.get_patient_appointment",
		method: "GET",
		makeParams() {
			return {
				patient: localStorage.getItem("patient_id"),
			};
		},
		onSuccess(response) {
			router.push({
				name: "Booking_confirmation",
				query: {
					appointment: response ? response : null,
				}
			});
		}
	});

	const confirmSelection = () => {
		if (selectedPatient.value) {
			let selectedPatientData = patientList.value.find(
				(patient) => patient.name === selectedPatient.value
			);
			if (selectedPatientData) {
				localStorage.setItem("patient_name", selectedPatientData.patient_name);
				localStorage.setItem("patient_id", selectedPatient.value);
				check_profile_before_checkin(localStorage.getItem("patient_id"));
			}
			dialogPatient.value = false;
		}
	};

	let sendOtp = createResource({
		url: "/api/method/marley_frontend.api.send_otp",
			method: "POST",
			makeParams(){
			return {
				number: patient_id.value,
				otp: localStorage.getItem("otp")
			}
		},
		onSuccess(response) {
			if(response) {
				if (response.status == "Failed") {
					dialog.value = true;
					error_message = response.message;
				} else if (response.status == "Success") {
					if (response.alert) {
						alert(response.message);
					}
				}
				otpInput.value = "";
				dialogOtp.value = true;
			}
		},
		onError(error) {
			dialog.value = true;
			error_message = error.messages?.[0] || error;;
		}
	})

	let error_log = createResource({
		url: "/api/method/marley_frontend.api.new_error_log",
		method: "POST",
		makeParams() {
			return {
				error_message: error_message,
				error_title: "Kiosk Screen: PatientID"
			}
		}
	});

	function handleButtonClick() {
		if (!patient_id.value || patient_id.value.length < 7 || patient_id.value.length > 15 || isNaN(patient_id.value)) {
			dialog_message = "Please enter a valid Mobile Number"
			dialog.value = true;
			return;
		}

		let otp = generateOTP();
		localStorage.setItem("otp", otp)
		sendOtp.submit();
	}

	function generateOTP() {
		let digits = "0123456789";
		let OTP = "";
		let len = digits.length
		for (let i = 0; i < 6; i++) {
			OTP += digits[Math.floor(Math.random() * len)];
		}
		return OTP;
	}

	function checkOtp() {
		dialogOtp.value = false
		if (otpInput.value == localStorage.getItem("otp")) {
			localStorage.setItem("patient_phone", patient_id.value)
			patient_verification.fetch();
		} else {
			dialog_message = "OTP doesn't match";
			dialog.value = true;
		}
	}

	function check_profile_before_checkin(patient) {
		let check_profile = createResource({
			url: '/api/method/marley_frontend.api.get_current_patient_data',
			method: 'GET',
			makeParams() {
				return {
					patient: patient,
				};
			},
			onSuccess(response) {
				if (!response.profile_completed) {
					form_firstName.value = response.doc.first_name || '';
					form_lastName.value = response.doc.last_name || '';
					form_gender.value = response.doc.sex || '';
					form_mobile.value = response.doc.mobile || '';
					form_dob.value = response.doc.dob || '';
					form_addressLine1.value = response.doc.address_line1 || '';
					form_addressLine2.value = response.doc.address_line2 || '';
					form_city.value = response.doc.city || '';
					form_state.value = response.doc.state || '';
					form_zip.value = response.doc.zip_code || '';
					form_marital.value = response.doc.marital_status || '';

					complete_profile_dialog.value = true;
				} else {
					get_appointment.fetch();
				}
			},
			onError(error) {
				dialog_title = "Fetching Profile Failed";
				dialog_message = error.messages?.[0] || error;
				dialog.value = true;
			},
		});
		check_profile.submit();
	};

	const handleConfirm = () => {
		errors.value = {};
		let isValid = true;
		if (!form_lastName.value || !form_mobile.value || !form_dob.value || !form_addressLine1.value || !form_city.value || !form_marital.value || !form_state.value || !form_zip.value) {
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
			if (!form_mobile.value) {
				errors.value.form_mobile = "This field is required.";
				isValid = false;
			}
			if (!form_lastName.value) {
				errors.value.form_lastName = "This field is required.";
				isValid = false;
			}
			if (!form_zip.value) {
				errors.value.form_zip = "This field is required.";
				isValid = false;
			}
		} else {
			updateDetails.submit();
		}
	};

	const handleSkip = () => {
		complete_profile_dialog.value = false;
		get_appointment.fetch();
	};

	// update patient details before booking
	let updateDetails = createResource({
		url: "/api/method/marley_frontend.api.update_patient",
		method: "POST",
		makeParams() {
			return {
				patient_id: localStorage.getItem("patient_id"),
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
		onSuccess(response) {
			complete_profile_dialog.value = false;
			get_appointment.fetch();
		},
		onError(error) {
			dialog_title = "Updating Patient Failed";
			dialog_message = error.messages?.[0] || error;
			dialog.value = true;
		}
	});
</script>
