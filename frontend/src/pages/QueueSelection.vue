<template>
	<div class="flex h-screen items-center justify-center bg-surface-white">
		<div class="flex flex-col items-center justify-center space-y-8 p-8 bg-white rounded-xl shadow-xl border w-[50vw] h-[50vh]">
			<h1 class="text-3xl font-bold">Select the Queues</h1>
			<div class="p-2 w-[30vw]">
				<Autocomplete :options=unit_options placeholder="Service Units" :multiple="true" v-model="units" />
			</div>
			<div>
				<Button
					variant="solid"
					:label="'Submit'"
					@click="goToTokenDisplay"
					size="lg"
				/>
			</div>
		</div>
	</div>
	<div class="absolute bottom-4 right-4 text-gray-600 text-sm">
		Powered by Marley Healthcare
	</div>

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
	}" v-model="warning_dialog" @click="warning_dialog.value = false"/>
</template>

<style scoped>
	body {
		margin: 0;
		font-family: Arial, sans-serif;
	}
</style>

<script setup>
import { ref, watch } from "vue";
import { createResource, Dialog, Autocomplete } from "frappe-ui";
import { useRouter } from "vue-router";

const router = useRouter();

let unit_options = ref([]);
let units = ref([]);
let warning_dialog = ref(false);
let dialog_title = ref("");
let dialog_message = ref("");
let logo = ref("");

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
})
get_logo.fetch()

// fetch all service units
const { fetch } = createResource({
	url: "/api/method/marley_frontend.api.get_units",
	method: "GET",
	onSuccess(response) {
		unit_options.value = response;
	},
	onError: (error) => {
		dialog_title = "Fetching Units Failed";
		dialog_message = error.messages?.[0] || error;
		warning_dialog.value = true;
	},
});
fetch();

const selectedQueues = ref([]);

watch(units, () => {
	selectedQueues.value = [];
	units.value.forEach((unit) => {
		selectedQueues.value.push(unit.value);
	});
});

// Navigate to the token display page
const goToTokenDisplay = () => {
	router.push({ name: "TokenDisplay", query: { queues: JSON.stringify(selectedQueues.value) } });
};
</script>
