<template>
	<TransitionRoot
		appear
		:show="isOpen"
		as="template">
		<Dialog
			as="div"
			@close="closeModal"
			class="relative z-50">
			<!-- Backdrop -->
			<TransitionChild
				as="template"
				enter="duration-300 ease-out"
				enter-from="opacity-0"
				enter-to="opacity-100"
				leave="duration-200 ease-in"
				leave-from="opacity-100"
				leave-to="opacity-0">
				<div class="fixed inset-0 bg-gray-900/75 backdrop-blur-sm" />
			</TransitionChild>

			<div class="fixed inset-0 overflow-y-auto">
				<div
					class="flex min-h-full items-center justify-center p-4 text-center">
					<TransitionChild
						as="template"
						enter="duration-300 ease-out"
						enter-from="opacity-0 scale-95"
						enter-to="opacity-100 scale-100"
						leave="duration-200 ease-in"
						leave-from="opacity-100 scale-100"
						leave-to="opacity-0 scale-95">
						<DialogPanel
							class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
							:class="{ 'max-w-lg': size === 'lg', 'max-w-xl': size === 'xl' }">
							<!-- Header -->
							<DialogTitle
								as="h3"
								class="flex items-center justify-between text-lg font-semibold leading-6 text-gray-900 mb-4">
								<span>{{ title }}</span>
								<button
									@click="closeModal"
									class="rounded-full p-1 hover:bg-gray-100 transition-colors">
									<span class="sr-only">Close</span>
									<svg
										class="w-5 h-5"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</DialogTitle>

							<!-- Content -->
							<div class="mt-2">
								<slot></slot>
							</div>

							<!-- Footer -->
							<div
								v-if="showFooter"
								class="mt-6 flex justify-end space-x-3">
								<button
									v-if="showCancel"
									@click="closeModal"
									class="inline-flex justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2">
									Cancel
								</button>
								<button
									v-if="showConfirm"
									@click="confirm"
									class="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
									:class="confirmButtonClass">
									{{ confirmText }}
								</button>
							</div>
						</DialogPanel>
					</TransitionChild>
				</div>
			</div>
		</Dialog>
	</TransitionRoot>
</template>

<script setup lang="ts">
	import {
		Dialog,
		DialogPanel,
		DialogTitle,
		TransitionRoot,
		TransitionChild,
	} from "@headlessui/vue";

	interface Props {
		isOpen: boolean;
		title: string;
		showFooter?: boolean;
		showCancel?: boolean;
		showConfirm?: boolean;
		confirmText?: string;
		confirmButtonClass?: string;
		size?: "md" | "lg" | "xl";
	}

	const props = withDefaults(defineProps<Props>(), {
		showFooter: true,
		showCancel: true,
		showConfirm: true,
		confirmText: "Confirm",
		confirmButtonClass: "",
		size: "md",
	});

	const emit = defineEmits<{
		(e: "close"): void;
		(e: "confirm"): void;
	}>();

	const closeModal = () => {
		emit("close");
	};

	const confirm = () => {
		emit("confirm");
	};
</script>
