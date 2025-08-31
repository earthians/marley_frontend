<template>
	<div class="w-10 h-10">
		<img :src="logo" alt="Logo" class="w-full h-full object-contain" />
	</div>
</template>

<script setup>
	import { ref } from 'vue';
	import { createResource } from 'frappe-ui';
	import defaultLogo from '@/assets/MH-logo.svg'

	const logo = ref(defaultLogo);

	const getLogo = createResource({
		url: "/api/method/marley_frontend.api.get_logo_image",
		method: "GET",
		makeParams: () => ({}),
		onSuccess(response) {
			if (response) {
				logo.value = response;
			}
		}
	});

	getLogo.fetch();
</script>
