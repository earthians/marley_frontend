<template>
	<div class="flex h-screen items-center justify-center bg-surface-white">
		<LanguageSelector
			:selectedLanguage="selectedLanguage"
			@change-language="changeLanguage"
		/>

		<div
			class="relative flex flex-col items-center justify-center space-y-4 p-4 sm:p-6 bg-surface-white rounded-lg shadow-lg border w-full min-w-md sm:max-w-lg md:max-w-2xl h-auto">
			<div class="absolute top-4 left-4">
				<Breadcrumbs :items="[
					{
						label: 'Home',
						route: {
							name: 'Kiosk',
						},
					},
					{
						label: 'Register',
						route: '/Register',
					},
				]"
			/>
			</div>
			<h1 class="font-bold text-lg text-center text-ink-gray-8">
				{{ translations.register[selectedLanguage] }}
			</h1>

			<div class="grid grid-cols-3 gap-2">
				<!-- First Name -->
				<div class="p-1">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle"
						:label="translations.firstName[selectedLanguage]" :required="true" :disabled="false"
						v-model="firstname" class="w-full" />
						<ErrorMessage v-if="errors.firstname" :message="errors.firstname" />
				</div>

				<!-- Last Name -->
				<div class="p-1">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle"
						:label="translations.lastName[selectedLanguage]" :disabled="false" v-model="lastname"
						class="w-full" />
				</div>
				<div class="border-b">
					<div class="flex flex-col items-center justify-center gap-4 p-5">
						<Dialog v-model="open_camera" :options="{ title: 'Upload Your Photo', size: '4xl' }">
							<template #body-content>
								<div class="flex">
									<div class="flex-1 flex items-center justify-center">
										<video v-if="!capturedImage" ref="video" autoplay></video>
										<canvas ref="canvas" style="display: none"></canvas>
										<img :src="capturedImage" v-if="capturedImage" />
									</div>
									<div class="flex flex-col justify-center items-center gap-4 ml-4">
										<Button v-if="!capturedImage" :ref_for="true" theme="gray" size="xl"
											label="take_photo" :disabled="false" @click="capture_image">
											<div class="flex items-center truncate">
												<Tooltip :text="'Capture Photo'" placement="top">
													<slot name="icon">
														<FeatherIcon :name="'camera'"
															class="size-7 text-ink-gray-7" />
													</slot>
												</Tooltip>
											</div>
										</Button>
										<Button v-if="capturedImage" :ref_for="true" theme="gray" size="xl"
											label="confirm_photo" :disabled="false" @click="confirm_image">
											<div class="flex items-center truncate">
												<Tooltip :text="'Confirm'" placement="top">
													<slot name="icon">
														<FeatherIcon :name="'check'"
															class="size-7 text-ink-gray-7" />
													</slot>
												</Tooltip>
											</div>
										</Button>
										<Button v-if="capturedImage" :ref_for="true" theme="gray" size="xl"
											label="retake_photo" :disabled="false" @click="clear_image">
											<div class="flex items-center truncate">
												<Tooltip :text="'Change Photo'" placement="top">
													<slot name="icon">
														<FeatherIcon :name="'refresh-cw'"
															class="size-7 text-ink-gray-7" />
													</slot>
												</Tooltip>
											</div>
										</Button>
									</div>
								</div>
							</template>
						</Dialog>
						<div class="flex gap-4 items-center">
							<div class="group relative h-20 w-20">
								<Avatar
									size="6xl"
									class="h-20 w-20"
									:label="'User'"
									:image="profile_image || default_profile_image.value"
								/>
								<component
									:is="profile_image ? Dropdown : 'div'"
									v-bind="
									profile_image
										? {
											options: [
												{
													icon: 'upload',
													label: profile_image
													? 'Change image'
													: 'Upload image',
													onClick: () => open_camera_dialog(),
												},
												{
													icon: 'trash-2',
													label: 'Remove image',
													onClick: () => { profile_image = null; },
												},
											],
										}
										: { onClick: () => open_camera_dialog() }
									"
									class="!absolute bottom-0 left-0 right-0"
								>
									<div
										class="z-1 absolute bottom-0 left-0 right-0 flex h-14 cursor-pointer items-center justify-center rounded-b-full bg-black bg-opacity-40 pt-5 opacity-0 duration-300 ease-in-out group-hover:opacity-100"
										style="
											-webkit-clip-path: inset(22px 0 0 0);
											clip-path: inset(22px 0 0 0);
										"
									>
										<CameraIcon class="h-6 w-6 cursor-pointer text-white" />
									</div>
								</component>
							</div>
						</div>
					</div>
				</div>

				<!-- Gender Select -->
				<div class="p-1">
					<FormControl type="select" :options="genderOptions" size="sm" variant="subtle"
						:label="translations.selectGender[selectedLanguage]" :required="true" :disabled="false"
						v-model="gender" class="w-full" />
						<ErrorMessage v-if="errors.gender" :message="errors.gender" />
				</div>

				<!-- Date of birth  -->
				<div class="p-1">
					<FormControl type="number" v-model="age" label="Age"/>
				</div>
				<div>
					<DatePicker
						v-model="dob"
						variant="subtle"
						placeholder="Date of Birth"
						:disabled="false"
						:required="false"
						label="Date of Birth"
						:formatter="(date) => getFormat(date, '', true)"
					/>
					<ErrorMessage v-if="errors.dob" :message="errors.dob" />
				</div>

				<!-- Mobile -->
				<div class="p-1">
					<FormControl :type="'text'" :ref_for="true" size="sm" variant="subtle"
						:label="translations.mobile[selectedLanguage]" :required="true" :disabled="false"
						v-model="mobile" class="w-full" />
						<ErrorMessage v-if="errors.mobile" :message="errors.mobile" />
				</div>

				<!-- Marital Status -->
				<div class="p-1">
					<FormControl type="select" :options="['Single', 'Married', 'Divorced', 'Widow']"
						v-model="marital_status" label="Marital Status" size="sm" :disabled="false"
						:required="false" class="w-full" />
						<ErrorMessage v-if="errors.marital_status" :message="errors.marital_status" />
				</div>

				<!-- Email -->
				<div class="p-1">
					<FormControl :type="'email'" :ref_for="true" size="sm" variant="subtle"
						:label="translations.email[selectedLanguage]" :disabled="false" v-model="email"
						:required="false" class="w-full" />
						<ErrorMessage v-if="errors.email" :message="errors.email" />
				</div>

				<!-- Country Autocomplete -->
				<div class="p-1">
					<FormControl type="autocomplete" :options="countryOptions" size="sm" variant="subtle"
						:label="translations.nation[selectedLanguage]" :disabled="false" :required="false"
						v-model="country" class="w-full"/>
						<ErrorMessage v-if="errors.country" :message="errors.country" />
				</div>
				<div class="p-1">
					<FormControl label="Address Line 1" v-model="addressLine1" type="text" size="sm"
						variant="subtle" :disabled="false" :required="false" class="w-full" />
						<ErrorMessage v-if="errors.addressLine1" :message="errors.addressLine1" />
				</div>
				<div class="p-1">
					<FormControl label="Address Line 2" v-model="addressLine2" type="text" size="sm"
						variant="subtle" :disabled="false" :required="false" class="w-full" />
						<ErrorMessage v-if="errors.addressLine2" :message="errors.addressLine2" />
				</div>
				<div class="p-1">
					<FormControl label="City/District" v-model="city" type="text" size="sm"
						variant="subtle" :disabled="false" :required="false" class="w-full" />
						<ErrorMessage v-if="errors.city" :message="errors.city" />
				</div>
				<div class="p-1">
					<FormControl label="State/Province" v-model="state" type="text" size="sm"
						variant="subtle" :disabled="false" :required="false" class="w-full" />
						<ErrorMessage v-if="errors.state" :message="errors.state" />
				</div>
				<div class="p-1">
					<FormControl label="ZIP Code" v-model="zip" type="text" size="sm" variant="subtle"
						:disabled="false" :required="false" class="w-full" />
						<ErrorMessage v-if="errors.zip" :message="errors.zip" />
				</div>
			</div>

			<!-- Submit Button -->
			<div class="flex justify-center mt-4">
				<Button
					@click="handleButtonClick"
					class="px-4 py-2 transition-all"
					:variant="'solid'"
					:ref_for="true"
					theme="gray"
					size="lg"
					:disabled="patient_registration.loading"
					:loading="patient_registration.loading"
				>
					{{ translations.submit[selectedLanguage] }}
				</Button>
			</div>
		</div>
		<Footer />

		<!-- error alert boxes -->
		<Dialog :options="{
			title: dialog_title || 'Message',
			message: `${dialog_message}` || 'Error in Fetching Appointments',
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
		}" v-model="error_dialog" @click="error_dialog.value = false" />
	</div>
</template>

<script setup>
	import { ref, watch, onUnmounted } from "vue";
	import { createResource, ErrorMessage, Breadcrumbs, FormControl, Dialog, Avatar, Dropdown, Checkbox, DatePicker } from "frappe-ui";
	import CameraIcon from '@/components/Icons/CameraIcon.vue'
	import { useRouter } from "vue-router";
	import LanguageSelector from '@/components/LanguageSelector.vue';
	import Footer from '@/components/Footer.vue';
	import { getFormat } from '@/utils'

	const firstname = ref("");
	const lastname = ref("");
	const email = ref("");
	const aadhaar_number = ref("");
	const passport_number = ref("");
	let gender = ref(null);
	let genderOptions = ref([]);
	let country = ref({ "label": "India", "value": "India" });
	let countryOptions = ref([]);
	const router = useRouter();
	const mobile = ref(localStorage.getItem("patient_phone") || "")
	let error_dialog = ref(false);
	let dialog_title = ref("");
	let dialog_message = ref("");
	let error_message = ref("");
	let dob = ref(null);
	let marital_status = ref("");
	let addressLine1 = ref("");
	let city = ref("");
	let addressLine2 = ref("");
	let state = ref("");
	let zip = ref("");
	let age = ref(null);
	let errors = ref({});
	let profile_image = ref("");
	let default_profile_image = ref("");
	let open_camera = ref(false);
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

	const video = ref(null);
	const canvas = ref(null);
	const capturedImage = ref(null);
	function open_camera_dialog() {
		capturedImage.value = null;
		open_camera.value = true;
	};

	const startCamera = async () => {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ video: true });
			if (video.value) {
				video.value.srcObject = stream;
			}
		} catch (error) {
			console.error('Error starting camera:', error);
		}
	};

	const capture_image = () => {
		const context = canvas.value.getContext('2d');
		canvas.value.width = video.value.videoWidth;
		canvas.value.height = video.value.videoHeight;
		context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height);
		capturedImage.value = canvas.value.toDataURL('image/png');
		video.value.srcObject.getTracks().forEach((track) => track.stop());
	};

	watch(open_camera, (newVal) => {
		if (newVal) {
			startCamera();
		}
	});

	watch(age, (age) => {
		if (age) {
			const today = new Date();
			let birthYear = today.getFullYear() - age-1;
			const birthDate = new Date(birthYear, today.getMonth(), today.getDate());
			dob.value = birthDate.toISOString().split('T')[0];
		}
	});

	onUnmounted(() => {
		if (video.value && video.value.srcObject) {
			video.value.srcObject.getTracks().forEach((track) => track.stop());
		}
	});
	function clear_image() {
		capturedImage.value = null;
		startCamera();
	};
	function confirm_image() {
		profile_image.value = capturedImage.value;
		open_camera.value = false;
	};

	let patient_registration = createResource({
		url: "/api/method/marley_frontend.api.patient_registration",
		method: "POST",
		makeParams() {
			return {
				first_name: firstname.value,
				last_name: lastname.value,
				email: email.value,
				gender: gender.value,
				mobile: mobile.value,
				country: country.value ? country.value.value : "",
				aadhaar_number: aadhaar_number.value || "",
				passport_number: passport_number.value || "",
				dob: dob.value || "",
				marital: marital_status.value || "",
				address1: addressLine1.value || "",
				city: city.value || "",
				state: state.value || "",
				address2: addressLine2.value || "",
				zip: zip.value || "",
				file: profile_image.value || null
			};
		},
		onSuccess(response) {
			if (response) {
				localStorage.setItem("patient_name", `${firstname.value} ${lastname.value}`)
				localStorage.setItem("patient_phone", `${mobile.value}`)
				localStorage.setItem("patient_id", response.patient_id);
				profile_image.value = null;
				router.push({ name: "Appointment" })
			}
		},
		onError(error) {
			if(error.message.includes("UniqueValidationError")) {
				if(aadhaar_number.value) {
					dialog_message = "Patient Registration failed. Aadhaar Number Duplication"
				}
				if (passport_number.value) {
					dialog_message = "Patient Registration failed. Passport Number Duplication"
				}
			}
			else {
				dialog_message = error.messages?.[0] || error;
				dialog_title = "Patient Creation Failed";
				error_message = `Dialog: ${dialog_message}.\n ${error.message}`
				error_log.submit();
			}
			error_dialog.value = true;
		},
	});

	const { fetch } = createResource({
		url: "/api/method/marley_frontend.api.get_gender",
		method: "GET",
		onSuccess(response) {
			genderOptions.value = response.genders.map((gender) => ({
				label: gender.label,
				value: gender.value,
			}));
			countryOptions.value = response.countries.map((country) => ({
				label: country.label,
				value: country.value,
			}));
		},
		onError(error) {
			dialog_message = "Unable to fetch from get_gender API. Contact System Manager"
			error_dialog.value = true;
			error_message = `Dialog: ${dialog_message}\n${error.message}`
			error_log.submit();
		},
	});
	fetch();

	// Language Selection logic
	let selectedLanguage = ref(localStorage.getItem("selectedLanguage") || "en");

	let translations = {
		register: {
			en: "Register Yourself",
			ar: "سجل نفسك",
			ml: "സ്വയം രജിസ്റ്റർ ചെയ്യുക",
		},
		firstName: {
			en: "First Name",
			ar: "الاسم الأول",
			ml: "പ്രഥമ നാമം",
		},
		lastName: {
			en: "Last Name",
			ar: "اسم العائلة",
			ml: "അവസാന നാമം",
		},
		email: {
			en: "Email",
			ar: "البريد الإلكتروني",
			ml: "ഇമെയിൽ",
		},
		mobile: {
			en: "Mobile",
			ar: "موبايل",
			ml: "മൊബൈല്",
		},
		selectGender: {
			en: "Select Gender",
			ar: "اختر الجنس",
			ml: "ലിംഗം തിരഞ്ഞെടുക്കുക",
		},
		submit: {
			en: "Submit",
			ar: "إرسال",
			ml: "സബ്മിറ്റ് ചെയ്യുക",
		},
		nation: {
			en: "Nationality",
			ar: "دولة",
			ml: "രാജ്യം",
		},
		aadhaar_number: {
			en: "Aadhaar Number",
			ar: "رقم آدار",
			ml: "ആധാർ നമ്പർ",
		},
		passport_number: {
			en: "Passport Number",
			ar: "رقم جواز السفر",
			ml: "പാസ്പോർട്ട് നമ്പർ",
		}
	};

	let error_log = createResource({
		url: "/api/method/marley_frontend.api.new_error_log",
		method: "POST",
		makeParams() {
			return {
				error_message: error_message,
				error_title: "Kiosk Screen: Register"
			}
		}
	});

	function handleButtonClick() {
		errors.value = {};
		let isValid = true;
		if (!firstname.value || !gender.value || !mobile.value) {
			if (!firstname.value ) {
				errors.value.firstname = "This field is required.";
				isValid = false;
			}
			if (!gender.value) {
				errors.value.gender = "This field is required.";
				isValid = false;
			}
			if (!mobile.value ) {
				errors.value.mobile = "This field is required.";
				isValid = false;
			}
		} else {
			patient_registration.submit();
		}
	}
	const changeLanguage = (language) => {
		selectedLanguage.value = language;
		localStorage.setItem("selectedLanguage", language);
	};
</script>
