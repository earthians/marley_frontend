<template>
	<div v-if="modelValue">
		<Dialog v-model="dialog" :options="{ size: '3xl' }">
			<template #body-title>
				<h3 class="font-bold">Complete Patient Profile</h3>
			</template>

			<template #body-content>
				<!-- Patient Demography Section -->
				<div class="mb-4">
					<h4 class="py-2 font-semibold text-lg mb-2">Patient Demography</h4>
					<div class="grid grid-cols-3 gap-2">
						<FormControlWrapper
							label="First Name"
							:modelValue="form_firstName"
							@update:modelValue="val => $emit('update:form_firstName', val)"
							:error="errors.form_firstName"
						/>
						<FormControlWrapper
							label="Last Name"
							:modelValue="form_lastName"
							@update:modelValue="val => $emit('update:form_lastName', val)"
							:error="errors.form_lastName"
						/>
						<FormControlWrapper
							label="Gender"
							:type="'autocomplete'"
							:modelValue="form_gender"
							@update:modelValue="val => $emit('update:form_gender', val)"
							:options="genderOptions"
							:error="errors.form_gender"
						/>
						<div class="py-1 w-full">
							<DatePicker
								:modelValue="form_dob"
								variant="subtle"
								placeholder="Date of Birth"
								:disabled="false"
								:required="true"
								:label="'Date of Birth'"
								:formatter="(date) => getFormat(date, '', true)"
							/>
							<ErrorMessage v-if="errors.form_dob" :message="errors.form_dob" />
						</div>
						<FormControlWrapper
							label="Marital Status"
							:modelValue="form_marital"
							:error="errors.form_marital"
							:type="'select'"
							:options="['Single', 'Married', 'Divorced', 'Widow']"
							@update:modelValue="val => $emit('update:form_marital', val)"
						/>
					</div>
				</div>

				<!-- Address & Contact Section -->
				<div>
					<h4 class="py-2 font-semibold text-lg mb-2">Address & Contact</h4>
					<div class="grid grid-cols-2 gap-2">
						<FormControlWrapper label="Mobile" :modelValue="form_mobile" :error="errors.form_mobile" @update:modelValue="val => $emit('update:form_mobile', val)" />
						<FormControlWrapper label="Address Line 1" :modelValue="form_addressLine1" :error="errors.form_addressLine1" @update:modelValue="val => $emit('update:form_addressLine1', val)"/>
						<FormControlWrapper label="City/District" :modelValue="form_city" :error="errors.form_city" @update:modelValue="val => $emit('update:form_city', val)"/>
						<FormControlWrapper label="Address Line 2" :modelValue="form_addressLine2" :error="errors.form_addressLine2" :required="false" @update:modelValue="val => $emit('update:form_addressLine2', val)"/>
						<FormControlWrapper label="State/Province" :modelValue="form_state" :error="errors.form_state" @update:modelValue="val => $emit('update:form_state', val)"/>
						<FormControlWrapper label="ZIP Code" :modelValue="form_zip" :error="errors.form_zip" @update:modelValue="val => $emit('update:form_zip', val)"/>
					</div>
				</div>

				<ErrorMessage v-if="errors.profile_completion_fail" :message="errors.profile_completion_fail" />
			</template>

			<template #actions>
				<Button variant="solid" @click="handleConfirm">Confirm</Button>
				<Button class="ml-2" variant="subtle" @click="handleSkip">Skip</Button>
			</template>
		</Dialog>
	</div>
</template>

<script setup>
	import { Button, DatePicker, Dialog, ErrorMessage } from "frappe-ui";
	import FormControlWrapper  from '@/components/FormControlWrapper.vue';
	import { ref } from "vue";
	import { getFormat } from '@/utils'

	const props = defineProps({
		modelValue: Boolean,
		form_firstName: String,
		form_lastName: String,
		form_gender: String,
		form_dob: String,
		form_marital: String,
		form_mobile: String,
		form_addressLine1: String,
		form_addressLine2: String,
		form_city: String,
		form_state: String,
		form_zip: String,
		errors: Object,
		genderOptions: Array
	});
	const emit = defineEmits([
		'update:modelValue',
		'confirm',
		'skip',
		'update:form_firstName',
		'update:form_lastName',
		'update:form_gender',
		'update:form_dob',
		'update:form_marital',
		'update:form_mobile',
		'update:form_addressLine1',
		'update:form_addressLine2',
		'update:form_city',
		'update:form_state',
		'update:form_zip'
	])

	let dialog = ref(true)

	function handleConfirm() {
		emit('confirm');
	}

	function handleSkip() {
		emit('skip');
	}
</script>
