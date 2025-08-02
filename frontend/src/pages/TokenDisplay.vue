<template>
	<div class="h-full flex">
		<!-- Queue Sections -->
		<div v-for="(queue, index) in queues" :key="index" class="flex-1 border-r p-3 flex flex-col">
			<!-- Header Card -->
			<div class="header-card mb-4">
				<h2 class="text-lg font-bold text-gray-700 text-center">{{ service_units[queue] }}</h2>
				<h2 class="text-lg text-gray-700 text-center">{{ practitioners[queue] }}</h2>
			</div>

			<!-- Token List -->
			<ul class="token-list" :style="{ '--row-count': number_of_rows }">
				<li v-for="(token, idx) in (tokens[queue] || []).slice(0, number_of_rows)" :key="idx"
					class="token-item" :class="{
						'bg-green-200': token.status === 'In Progress',
						'bg-white': token.status !== 'In Progress',
						'blink-animation': token.isBlinking
					}">
					<span>{{ token.token_no }}</span>
				</li>
			</ul>
		</div>

		<!-- Rightmost Section -->
		<div class="right-section border-l p-4 flex items-center justify-center">
			<template v-if="fileContent">
				<img v-if="isImage(fileContent)" :src="fileContent" alt="File Content" class="stretch-image" />
				<div v-else class="p-4 bg-gray-100 border rounded shadow-md text-center w-full h-full">
					<p>{{ fileContent }}</p>
				</div>
			</template>
			<p v-else class="text-gray-500 italic">No file to display</p>
		</div>
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

	h2 {
		font-size: 1.25rem;
	}

	.header-card {
		background-color: #bdd1e9;
		padding-top: 20px;
		min-width: 150px;
		height: 90px;
		padding-bottom: 20px;
		text-wrap: nowrap;
		border-radius: 8px;
		margin-bottom: 16px;
	}

	.token-list {
		display: grid;
		grid-template-rows: repeat(var(--row-count, 3), 1fr); /* Dynamic rows */
		gap: 5px;
		width: 100%;
		height: 100%;
	}

	.token-item {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100%;
		border-radius: 12px;
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
		text-align: center;
		font-size: 2rem;
		font-weight: bold;
	}

	.right-section {
		width: 25%;
		flex-shrink: 0;
		position: relative;
		overflow: hidden;
	}

	.stretch-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.flex-1 {
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
	}

	img {
		border-radius: 8px;
	}

	@keyframes blink {
		0% {
			background-color: white;
		}

		50% {
			background-color: rgb(229, 204, 133);
		}

		100% {
			background-color: rgb(233, 189, 68);
		}
	}

	.blink-animation {
		animation: blink 1s ease-in-out 10;
	}
</style>

<script setup>
import { ref, onMounted, onBeforeUnmount, inject } from "vue";
import { useRoute } from "vue-router";
import { createResource, Dialog } from "frappe-ui";

const route = useRoute();
const queues = ref(JSON.parse(route.query.queues || "[]"));
const tokens = ref({});
let warning_dialog = ref(false);
let dialog_title = ref("");
let dialog_message = ref("");
let practitioners = ref({});
let number_of_rows = ref(3);
let service_units = ref({});
const fileContent = ref(null);
let file = ref('');
const socket = inject("$socket");

if (socket) {
	socket.on("update_tokens", (data) => {
		queues.value.forEach((queue) => {
			fetchTokens(queue);
		});
	});

	socket.on("call", (data) => {
		// Speak the token number
		let utterance = new SpeechSynthesisUtterance(`Token Number ${data.token_number} to ${data.service_unit_name}`);
		speechSynthesis.cancel();
		speechSynthesis.speak(utterance);

		// Find and blink the token card
		triggerBlinkAnimation(data.token_number, data.service_unit);
	});
	onBeforeUnmount(() => {
		socket.off("update_tokens");
		socket.off("call");
	});
}


onMounted(() => {
	fetch_all_tokens();
	const interval = setInterval(fetch_all_tokens, 10000);
	// Independently fetch file for the rightmost section
	fetchFileLocation();
});

function fetch_all_tokens() {
	queues.value.forEach((queue) => {
		fetchTokens(queue);
	});
}

// Trigger the blink animation for a specific token
const triggerBlinkAnimation = (tokenNumber, serviceName) => {
	if (tokens.value[serviceName]) {
		tokens.value[serviceName].forEach(t => {
			if (t.token_no != tokenNumber && t.isBlinking != false) {
				t.isBlinking = false;
			} else if (t.token_no === tokenNumber) {
				t.isBlinking = true;

				setTimeout(() => {
					if (t.status != "In Progress")
					t.isBlinking = false;
				}, 10000);
			}
		});
	}
};

// API call to fetch tokens for a given service unit (queue)
const fetchTokens = (service_unit) => {
	const { fetch } = createResource({
		url: '/api/method/marley_frontend.api.get_tokens',
		method: 'GET',
		params: { service_unit: service_unit },
		onSuccess(response) {
			const newTokens = response["results"] || [];
			number_of_rows.value = response.number_of_rows || 3;
			service_units.value[service_unit] = response.service_unit_name || "";
			tokens.value[service_unit] = newTokens;
			practitioners.value[service_unit] = response["practitioner"] || "";
		},
		onError: (error) => {
			dialog_title = "Fetching Tokens Failed";
			dialog_message = error.messages?.[0] || error;
			warning_dialog.value = true;
		},
	});
	fetch();
};

// Fetch file location first
const fetchFileLocation = () => {
	let getFile = createResource({
		url: '/api/method/marley_frontend.api.get_file',
		method: 'GET',
		onSuccess(response) {
			if (response) {
				file.value = `${response}`;
			}
			// After getting the file URL, fetch the content
			fetchFileContent();
		},
		onError: (error) => {
			dialog_title = "Fetching Advertisement File Failed";
			dialog_message = error.messages?.[0] || error;
			warning_dialog.value = true;
		},
	});
	getFile.fetch();
};

// Fetch file content for the rightmost section
const fetchFileContent = async () => {
	if (!file.value) return; // Ensure that the file URL exists

	try {
		const response = await fetch(file.value); // Use the file URL here
		if (response.headers.get("content-type").startsWith("image/")) {
			// Handle image content
			const blob = await response.blob();
			fileContent.value = URL.createObjectURL(blob);
		} else if (response.headers.get("content-type").startsWith("video/")) {
			// Handle video content
			const blob = await response.blob();
			fileContent.value = URL.createObjectURL(blob);
		} else {
			// Handle text or other content
			const text = await response.text();
			fileContent.value = text;
		}
	} catch (error) {
		dialog_title = "Fetching File Content Failed";
		dialog_message = error.messages?.[0] || error;
		warning_dialog.value = true;
	}
};

const isImage = (file) => file && file.startsWith("blob:");
</script>
