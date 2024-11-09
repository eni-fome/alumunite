<template>
	<div>
		<NavigationBar />
		<main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
			<!-- Header with gradient -->
			<div
				class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-6 mb-8 text-white shadow-xl">
				<h1 class="text-2xl font-bold">Add New User</h1>
				<p class="text-white/80 mt-2">
					Create a new user profile with their details and permissions.
				</p>
			</div>

			<!-- Form Card -->
			<div class="bg-white rounded-xl shadow-lg p-6 md:p-8">
				<form
					@submit.prevent="onSubmit"
					class="space-y-8">
					<!-- Profile Photo Section -->
					<div class="space-y-4">
						<label class="block text-sm font-medium text-gray-700"
							>Profile Photo</label
						>
						<div class="flex items-start space-x-6">
							<div
								class="relative h-32 w-32 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
								<img
									v-if="imageUrl"
									:src="imageUrl"
									alt="Profile preview"
									class="h-full w-full object-cover" />
								<div
									v-else
									class="h-full w-full flex items-center justify-center">
									<svg
										class="h-12 w-12 text-gray-300"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
									</svg>
								</div>
							</div>
							<div class="space-y-2">
								<input
									type="file"
									ref="fileInput"
									class="hidden"
									accept="image/*"
									@change="handleFileUpload" />
								<button
									type="button"
									@click="() => fileInput?.click()"
									class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
									<svg
										class="-ml-1 mr-2 h-5 w-5 text-gray-400"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24">
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
									</svg>
									Choose Photo
								</button>
								<p class="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
								<p
									v-if="uploadError"
									class="text-sm text-red-600">
									{{ uploadError }}
								</p>
							</div>
						</div>
					</div>

					<!-- Name & Email Section -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div class="space-y-2">
							<label
								for="name"
								class="block text-sm font-medium text-gray-700">
								Full Name
							</label>
							<input
								id="name"
								v-model="values.name"
								type="text"
								:class="[
									'w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-colors',
									errors.name
										? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
										: 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
								]" />
							<p
								v-if="errors.name"
								class="mt-1 text-sm text-red-600">
								{{ errors.name }}
							</p>
						</div>

						<div class="space-y-2">
							<label
								for="email"
								class="block text-sm font-medium text-gray-700">
								Email Address
							</label>
							<input
								id="email"
								v-model="values.email"
								type="email"
								:class="[
									'w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-offset-2 transition-colors',
									errors.email
										? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
										: 'border-gray-300 focus:ring-indigo-500 focus:border-indigo-500',
								]" />
							<p
								v-if="errors.email"
								class="mt-1 text-sm text-red-600">
								{{ errors.email }}
							</p>
						</div>
					</div>

					<!-- Role & Status Section -->
					<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
						<!-- Role Selection -->
						<div class="space-y-2">
							<label class="block text-sm font-medium text-gray-700"
								>Role</label
							>
							<div class="grid grid-cols-3 gap-3">
								<button
									type="button"
									v-for="role in ['Admin', 'User', 'Guest']"
									:key="role"
									@click="values.role = role as any"
									:class="[
										'px-4 py-3 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
										values.role === role
											? getRoleActiveClass(role)
											: 'bg-gray-50 text-gray-700 hover:bg-gray-100',
									]">
									{{ role }}
								</button>
							</div>
							<p
								v-if="errors.role"
								class="mt-1 text-sm text-red-600">
								{{ errors.role }}
							</p>
						</div>

						<!-- Status Toggle -->
						<div class="space-y-2">
							<label class="block text-sm font-medium text-gray-700"
								>Status</label
							>
							<div class="flex space-x-4">
								<button
									type="button"
									@click="values.status = 'Active'"
									:class="[
										'flex-1 px-4 py-3 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
										values.status === 'Active'
											? 'bg-green-100 text-green-800 hover:bg-green-200'
											: 'bg-gray-50 text-gray-700 hover:bg-gray-100',
									]">
									Active
								</button>
								<button
									type="button"
									@click="values.status = 'Inactive'"
									:class="[
										'flex-1 px-4 py-3 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
										values.status === 'Inactive'
											? 'bg-gray-700 text-white hover:bg-gray-800'
											: 'bg-gray-50 text-gray-700 hover:bg-gray-100',
									]">
									Inactive
								</button>
							</div>
							<p
								v-if="errors.status"
								class="mt-1 text-sm text-red-600">
								{{ errors.status }}
							</p>
						</div>
					</div>

					<!-- Submit Button -->
					<div class="flex justify-end">
						<button
							type="submit"
							:disabled="isSubmitting"
							class="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all">
							<svg
								v-if="isSubmitting"
								class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
								fill="none"
								viewBox="0 0 24 24">
								<circle
									class="opacity-25"
									cx="12"
									cy="12"
									r="10"
									stroke="currentColor"
									stroke-width="4" />
								<path
									class="opacity-75"
									fill="currentColor"
									d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
							</svg>
							{{ isSubmitting ? "Creating User..." : "Create User" }}
						</button>
					</div>
				</form>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { useRouter } from "vue-router";
	import NavigationBar from "@/components/layout/NavigationBar.vue";
	import { useUserStore } from "@/stores/userStore";
	import { useToast } from "@/composables/useToast";
	import * as yup from "yup";

	const router = useRouter();
	const userStore = useUserStore();
	const { addToast } = useToast();

	const fileInput = ref<HTMLInputElement | null>(null);
	const imageUrl = ref<string | null>(null);
	const uploadError = ref<string | null>(null);
	const isSubmitting = ref(false);

	const values = ref({
		name: "",
		email: "",
		role: "User" as const,
		status: "Active" as const,
	});

	const errors = ref<Record<string, string>>({});

	const schema = yup.object({
		name: yup
			.string()
			.required("Name is required")
			.min(2, "Name must be at least 2 characters"),
		email: yup
			.string()
			.required("Email is required")
			.email("Must be a valid email"),
		role: yup
			.string()
			.oneOf(["Admin", "User", "Guest"], "Invalid role")
			.required("Role is required"),
		status: yup
			.string()
			.oneOf(["Active", "Inactive"], "Invalid status")
			.required("Status is required"),
	});

	const handleFileUpload = (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (!input.files?.length) return;

		const file = input.files[0];
		const validTypes = ["image/jpeg", "image/png", "image/gif"];
		const maxSize = 5 * 1024 * 1024; // 5MB

		if (!validTypes.includes(file.type)) {
			uploadError.value =
				"Please upload a valid image file (JPEG, PNG, or GIF)";
			return;
		}

		if (file.size > maxSize) {
			uploadError.value = "File size must be less than 5MB";
			return;
		}

		uploadError.value = null;
		const reader = new FileReader();
		reader.onload = (e) => {
			imageUrl.value = e.target?.result as string;
		};
		reader.readAsDataURL(file);
	};

	const getRoleActiveClass = (role: string) => {
		const classes = {
			Admin: "bg-purple-100 text-purple-800 hover:bg-purple-200",
			User: "bg-blue-100 text-blue-800 hover:bg-blue-200",
			Guest: "bg-gray-100 text-gray-800 hover:bg-gray-200",
		};
		return classes[role as keyof typeof classes] || "";
	};

	const onSubmit = async () => {
		try {
			await schema.validate(values.value, { abortEarly: false });
			errors.value = {};
			isSubmitting.value = true;

			await userStore.addUser({
				...values.value,
				profilePhoto: imageUrl.value || undefined,
			});

			addToast("User created successfully", "success");
			router.push("/manage-users");
		} catch (err) {
			if (err instanceof yup.ValidationError) {
				errors.value = err.inner.reduce((acc, curr) => {
					if (curr.path) {
						acc[curr.path] = curr.message;
					}
					return acc;
				}, {} as Record<string, string>);
			} else {
				addToast("Failed to create user", "error");
			}
		} finally {
			isSubmitting.value = false;
		}
	};
</script>
