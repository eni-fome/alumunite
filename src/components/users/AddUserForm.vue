<template>
	<form
		@submit="onSubmit"
		class="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
		<!-- Profile Photo Upload -->
		<div class="mb-6">
			<label class="block text-sm font-medium text-gray-700 mb-2">
				Profile Photo
			</label>
			<div class="flex items-center space-x-4">
				<div class="w-24 h-24 rounded-full overflow-hidden bg-gray-100">
					<img
						v-if="imageUrl"
						:src="imageUrl"
						alt="Profile preview"
						class="w-full h-full object-cover" />
					<div
						v-else
						class="w-full h-full flex items-center justify-center text-gray-400">
						No image
					</div>
				</div>
				<div>
					<input
						type="file"
						ref="fileInput"
						class="hidden"
						accept="image/*"
						@change="handleFileUpload" />
					<button
						type="button"
						@click="$refs.fileInput.click()"
						class="bg-gray-100 px-4 py-2 rounded-md text-sm hover:bg-gray-200 transition-colors">
						Choose Photo
					</button>
					<p
						v-if="uploadError"
						class="mt-1 text-sm text-red-600">
						{{ uploadError }}
					</p>
				</div>
			</div>
		</div>

		<!-- Name Field -->
		<div class="mb-4">
			<label
				for="name"
				class="block text-sm font-medium text-gray-700 mb-1">
				Name
			</label>
			<input
				id="name"
				v-model="values.name"
				type="text"
				:class="[
					'w-full px-3 py-2 border rounded-md',
					errors.name
						? 'border-red-300 focus:border-red-500 focus:ring-red-500'
						: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
				]" />
			<p
				v-if="errors.name"
				class="mt-1 text-sm text-red-600">
				{{ errors.name }}
			</p>
		</div>

		<!-- Email Field -->
		<div class="mb-4">
			<label
				for="email"
				class="block text-sm font-medium text-gray-700 mb-1">
				Email
			</label>
			<input
				id="email"
				v-model="values.email"
				type="email"
				:class="[
					'w-full px-3 py-2 border rounded-md',
					errors.email
						? 'border-red-300 focus:border-red-500 focus:ring-red-500'
						: 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-500',
				]" />
			<p
				v-if="errors.email"
				class="mt-1 text-sm text-red-600">
				{{ errors.email }}
			</p>
		</div>

		<!-- Role Selection -->
		<div class="mb-4">
			<label
				for="role"
				class="block text-sm font-medium text-gray-700 mb-1">
				Role
			</label>
			<select
				id="role"
				v-model="values.role"
				class="w-full px-3 py-2 border border-gray-300 rounded-md focus:border-indigo-500 focus:ring-indigo-500">
				<option value="Admin">Admin</option>
				<option value="User">User</option>
				<option value="Guest">Guest</option>
			</select>
		</div>

		<!-- Status Toggle -->
		<div class="mb-6">
			<label class="block text-sm font-medium text-gray-700 mb-1">
				Status
			</label>
			<div class="flex items-center space-x-2">
				<button
					type="button"
					@click="values.status = 'Active'"
					:class="[
						'px-4 py-2 text-sm font-medium rounded-md',
						values.status === 'Active'
							? 'bg-green-100 text-green-800'
							: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
					]">
					Active
				</button>
				<button
					type="button"
					@click="values.status = 'Inactive'"
					:class="[
						'px-4 py-2 text-sm font-medium rounded-md',
						values.status === 'Inactive'
							? 'bg-gray-600 text-white'
							: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
					]">
					Inactive
				</button>
			</div>
		</div>

		<!-- Submit Button -->
		<div class="flex justify-end">
			<button
				type="submit"
				:disabled="isSubmitting"
				class="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition-colors disabled:opacity-50">
				{{ isSubmitting ? "Adding..." : "Add User" }}
			</button>
		</div>
	</form>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import { useRouter } from "vue-router";
	import { useUserStore } from "@/stores/userStore";
	import { useFileUpload } from "@/composables/useFileUpload";
	import * as yup from "yup";

	const router = useRouter();
	const userStore = useUserStore();
	const { imageUrl, uploadError, handleFileUpload } = useFileUpload();
	const fileInput = ref<HTMLInputElement | null>(null);
	const isSubmitting = ref(false);

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

	const values = ref({
		name: "",
		email: "",
		role: "User" as const,
		status: "Active" as const,
	});

	const errors = ref<Record<string, string>>({});

	const validateForm = async () => {
		try {
			await schema.validate(values.value, { abortEarly: false });
			errors.value = {};
			return true;
		} catch (err) {
			if (err instanceof yup.ValidationError) {
				errors.value = err.inner.reduce((acc, curr) => {
					if (curr.path) {
						acc[curr.path] = curr.message;
					}
					return acc;
				}, {} as Record<string, string>);
			}
			return false;
		}
	};

	const onSubmit = async (event: Event) => {
		event.preventDefault();

		const isValid = await validateForm();
		if (!isValid) return;

		try {
			isSubmitting.value = true;
			await userStore.addUser({
				...values.value,
				profilePhoto: imageUrl.value || undefined,
			});

			router.push("/");
		} catch (error) {
			console.error("Failed to add user:", error);
		} finally {
			isSubmitting.value = false;
		}
	};
</script>
