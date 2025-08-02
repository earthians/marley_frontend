<template>
	<div class="py-1 w-full">
		<FormControl
			:label="label"
			:modelValue="modelValue"
			@update:modelValue="updateValue"
			:type="type"
			:size="'sm'"
			:variant="'subtle'"
			:options="options"
			:disabled="false"
			:required="required"
		/>
		<ErrorMessage v-if="error" :message="error" />
	</div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

// Props
const props = defineProps({
	label: String,
	modelValue: [String, Number],
	error: String,
	type: {
		type: String,
		default: 'text',
	},
	options: {
		type: Array,
		default: () => [],
	},
	required: {
		default:true
	}
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Emit handler
function updateValue(val) {
	emit('update:modelValue', val)
}
</script>
