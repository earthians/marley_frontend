<template>
	<div class="absolute top-4 right-4 flex space-x-4">
		<a href="#" @click.prevent="$emit('change-language', 'en')"
			:class="[
				selectedLanguage === 'en' ? 'font-bold text-ink-gray-8' : 'text-[gray]',
				'hover:underline'
			]">
			English
		</a>
		<a href="#" @click.prevent="$emit('change-language', 'ar')"
			:class="[
				selectedLanguage === 'ar' ? 'font-bold text-ink-gray-8' : 'text-[gray]',
				'hover:underline'
			]">
			العربية
		</a>
		<a href="#" @click.prevent="$emit('change-language', 'ml')"
			:class="[
				selectedLanguage === 'ml' ? 'font-bold text-ink-gray-8' : 'text-[gray]',
				'hover:underline'
			]">
			മലയാളം
		</a>
	</div>
</template>

<script>
	export default {
		props: {
			selectedLanguage: {
				type: String,
				required: true,
			},
		},
	};
</script>
