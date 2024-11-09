<template>
	<div class="fixed bottom-4 right-4 z-50 space-y-2">
		<transition-group name="toast">
			<div
				v-for="toast in toasts"
				:key="toast.id"
				class="p-4 rounded-md shadow-lg max-w-md transform transition-all duration-300"
				:class="getToastClass(toast.type)">
				<div class="flex justify-between items-center">
					<p class="text-sm font-medium">{{ toast.message }}</p>
					<button
						@click="removeToast(toast.id)"
						class="ml-4 text-sm font-medium opacity-70 hover:opacity-100">
						×
					</button>
				</div>
			</div>
		</transition-group>
	</div>
</template>

<script setup lang="ts">
	import { useToast } from "@/composables/useToast";

	const { toasts, removeToast } = useToast();

	const getToastClass = (type: "success" | "error" | "info") => {
		const classes = {
			success: "bg-green-500 text-white",
			error: "bg-red-500 text-white",
			info: "bg-blue-500 text-white",
		};
		return classes[type];
	};
</script>

<style scoped>
	.toast-enter-active,
	.toast-leave-active {
		transition: all 0.3s ease;
	}
	.toast-enter-from {
		opacity: 0;
		transform: translateY(30px);
	}
	.toast-leave-to {
		opacity: 0;
		transform: translateX(100px);
	}
</style>
