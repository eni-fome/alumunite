<template>
	<div
		class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
		<div class="relative">
			<!-- Profile Photo -->
			<div class="aspect-w-3 aspect-h-2">
				<img
					:src="user.profilePhoto || '/default-avatar.png'"
					:alt="`${user.name}'s profile`"
					class="w-full h-full object-cover" />
			</div>
			<!-- Status Badge -->
			<span
				class="absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium shadow-sm"
				:class="getStatusClass()">
				{{ user.status }}
			</span>
		</div>

		<div class="p-4">
			<div class="text-center">
				<h3 class="text-lg font-semibold text-gray-900">{{ user.name }}</h3>
				<p class="text-sm text-gray-600">{{ user.email }}</p>
				<span
					:class="getRoleClass()"
					class="inline-block px-3 py-1 rounded-full text-xs font-medium mt-2">
					{{ user.role }}
				</span>
			</div>

			<div class="mt-4 flex justify-center space-x-2">
				<button
					@click="openEditModal"
					class="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
					Edit
				</button>
				<button
					@click="toggleStatus"
					:class="[
						'inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md',
						user.status === 'Active'
							? 'text-red-600 bg-red-100 hover:bg-red-200'
							: 'text-green-600 bg-green-100 hover:bg-green-200',
					]">
					{{ user.status === "Active" ? "Deactivate" : "Activate" }}
				</button>
			</div>
		</div>

		<!-- Edit Modal -->
		<Modal
			:is-open="isModalOpen"
			title="Edit User"
			@close="closeEditModal"
			@confirm="saveChanges">
			<div class="space-y-6">
				<!-- Name -->
				<div>
					<label class="block text-sm font-medium text-gray-700"> Name </label>
					<input
						v-model="editForm.name"
						type="text"
						class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
				</div>

				<!-- Email -->
				<div>
					<label class="block text-sm font-medium text-gray-700"> Email </label>
					<input
						v-model="editForm.email"
						type="email"
						class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" />
				</div>

				<!-- Role -->
				<div>
					<label class="block text-sm font-medium text-gray-700"> Role </label>
					<select
						v-model="editForm.role"
						class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500">
						<option value="Admin">Admin</option>
						<option value="User">User</option>
						<option value="Guest">Guest</option>
					</select>
				</div>

				<!-- Status -->
				<div>
					<label class="block text-sm font-medium text-gray-700 mb-2">
						Status
					</label>
					<div class="flex space-x-4">
						<button
							type="button"
							@click="editForm.status = 'Active'"
							:class="[
								'flex-1 px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
								editForm.status === 'Active'
									? 'bg-green-100 text-green-800'
									: 'bg-gray-100 text-gray-700',
							]">
							Active
						</button>
						<button
							type="button"
							@click="editForm.status = 'Inactive'"
							:class="[
								'flex-1 px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
								editForm.status === 'Inactive'
									? 'bg-gray-700 text-white'
									: 'bg-gray-100 text-gray-700',
							]">
							Inactive
						</button>
					</div>
				</div>

				<!-- Profile Photo -->
				<div>
					<label class="block text-sm font-medium text-gray-700">
						Profile Photo
					</label>
					<div class="mt-2 flex items-center space-x-4">
						<img
							:src="editForm.profilePhoto || '/default-avatar.png'"
							alt="Profile preview"
							class="h-12 w-12 rounded-full object-cover" />
						<button
							type="button"
							@click="() => photoInput?.click()"
							class="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
							Change Photo
						</button>
						<input
							ref="photoInput"
							type="file"
							class="hidden"
							accept="image/*"
							@change="handlePhotoChange" />
					</div>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import Modal from "@/components/common/Modal.vue";
	import { useUserStore } from "@/stores/userStore";
	import { useToast } from "@/composables/useToast";
	import type { User } from "@/types/user";

	const props = defineProps<{
		user: User;
	}>();

	const userStore = useUserStore();
	const { addToast } = useToast();
	const photoInput = ref<HTMLInputElement | null>(null);

	// Fixed: Single isModalOpen ref instead of duplicate isEditModalOpen
	const isModalOpen = ref(false);

	const editForm = ref({
		name: "",
		email: "",
		role: "" as "Admin" | "User" | "Guest",
		status: "" as "Active" | "Inactive",
		profilePhoto: "",
	});

	const getRoleClass = () => {
		const classes = {
			Admin: "bg-purple-100 text-purple-800",
			User: "bg-blue-100 text-blue-800",
			Guest: "bg-gray-100 text-gray-800",
		};
		return classes[props.user.role];
	};

	const getStatusClass = () => {
		return props.user.status === "Active"
			? "bg-green-100 text-green-800"
			: "bg-gray-100 text-gray-800";
	};

	const openEditModal = () => {
		// Initialize form with current user data
		editForm.value = {
			name: props.user.name,
			email: props.user.email,
			role: props.user.role,
			status: props.user.status,
			profilePhoto: props.user.profilePhoto || "",
		};
		isModalOpen.value = true;
	};

	const closeEditModal = () => {
		isModalOpen.value = false;
	};

	const handlePhotoChange = (event: Event) => {
		const input = event.target as HTMLInputElement;
		if (!input.files?.length) return;

		const file = input.files[0];
		const reader = new FileReader();
		reader.onload = (e) => {
			if (e.target?.result) {
				editForm.value.profilePhoto = e.target.result as string;
			}
		};
		reader.readAsDataURL(file);
	};

	const toggleStatus = async () => {
		try {
			await userStore.toggleUserStatus(props.user.id);
			addToast(
				`User ${
					props.user.status === "Active" ? "deactivated" : "activated"
				} successfully`,
				"success"
			);
		} catch (error) {
			addToast("Failed to update user status", "error");
		}
	};

	const saveChanges = async () => {
		try {
			await userStore.updateUser(props.user.id, editForm.value);
			addToast("User updated successfully", "success");
			closeEditModal();
		} catch (error) {
			addToast("Failed to update user", "error");
		}
	};
</script>
