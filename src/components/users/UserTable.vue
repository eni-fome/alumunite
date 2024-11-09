// src/components/users/UserTable.vue
<template>
	<div
		class="rounded-xl bg-white shadow-xl overflow-hidden border border-gray-100">
		<!-- Table Controls -->
		<div
			class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-6">
			<div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
				<!-- Search with icon -->
				<div class="relative w-full sm:w-64">
					<input
						type="text"
						v-model="searchQuery"
						placeholder="Search users..."
						class="w-full pl-10 pr-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50" />
					<svg
						class="absolute left-3 top-2.5 h-5 w-5 text-white/70"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
					</svg>
				</div>

				<!-- Filters -->
				<div class="flex gap-4">
					<select
						v-model="roleFilter"
						class="rounded-lg bg-white/10 border border-white/20 text-white py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-white/50">
						<option
							value=""
							class="text-gray-900">
							All Roles
						</option>
						<option
							value="Admin"
							class="text-gray-900">
							Admin
						</option>
						<option
							value="User"
							class="text-gray-900">
							User
						</option>
						<option
							value="Guest"
							class="text-gray-900">
							Guest
						</option>
					</select>

					<select
						v-model="statusFilter"
						class="rounded-lg bg-white/10 border border-white/20 text-white py-2 pl-3 pr-8 focus:outline-none focus:ring-2 focus:ring-white/50">
						<option
							value=""
							class="text-gray-900">
							All Status
						</option>
						<option
							value="Active"
							class="text-gray-900">
							Active
						</option>
						<option
							value="Inactive"
							class="text-gray-900">
							Inactive
						</option>
					</select>
				</div>
			</div>

			<!-- Stats -->
			<div class="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
				<div class="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
					<div class="text-white/70 text-sm">Total Users</div>
					<div class="text-white text-2xl font-semibold">
						{{ userStore.users.length }}
					</div>
				</div>
				<div class="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
					<div class="text-white/70 text-sm">Active Users</div>
					<div class="text-white text-2xl font-semibold">
						{{ userStore.users.filter((u) => u.status === "Active").length }}
					</div>
				</div>
				<div class="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
					<div class="text-white/70 text-sm">Admins</div>
					<div class="text-white text-2xl font-semibold">
						{{ userStore.users.filter((u) => u.role === "Admin").length }}
					</div>
				</div>
				<div class="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
					<div class="text-white/70 text-sm">Regular Users</div>
					<div class="text-white text-2xl font-semibold">
						{{ userStore.users.filter((u) => u.role === "User").length }}
					</div>
				</div>
			</div>
		</div>

		<!-- Loading Overlay -->
		<div
			v-if="userStore.loading"
			class="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
			<div
				class="animate-spin rounded-full h-16 w-16 border-4 border-indigo-600 border-t-transparent"></div>
		</div>

		<!-- Table Content -->
		<div class="overflow-x-auto">
			<table class="min-w-full divide-y divide-gray-200">
				<thead class="bg-gray-50">
					<tr>
						<th
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
							<input
								type="checkbox"
								v-model="selectAll"
								class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer" />
						</th>
						<th
							v-for="header in tableHeaders"
							:key="header.key"
							scope="col"
							class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer group"
							@click="sortBy(header.key)">
							<div class="flex items-center gap-2">
								<span>{{ header.label }}</span>
								<svg
									v-if="sortKey === header.key"
									class="w-4 h-4 text-indigo-500"
									:class="{ 'rotate-180': sortOrder === 'desc' }"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 15l7-7 7 7" />
								</svg>
								<svg
									v-else
									class="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M5 15l7-7 7 7" />
								</svg>
							</div>
						</th>
						<th
							scope="col"
							class="relative px-6 py-3">
							<span class="sr-only">Actions</span>
						</th>
					</tr>
				</thead>

				<tbody class="bg-white divide-y divide-gray-200">
					<tr v-if="filteredAndSortedUsers.length === 0">
						<td
							colspan="5"
							class="px-6 py-12 text-center text-gray-500">
							<svg
								class="mx-auto h-12 w-12 text-gray-400 mb-3"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24">
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
							</svg>
							<p class="text-gray-500 text-base">
								No users found matching your criteria.
							</p>
							<p class="text-gray-400 text-sm mt-1">
								Try adjusting your search or filters.
							</p>
						</td>
					</tr>

					<tr
						v-for="user in filteredAndSortedUsers"
						:key="user.id"
						:class="[
							selectedUsers.includes(user.id) ? 'bg-indigo-50' : '',
							'hover:bg-gray-50 transition-colors duration-200',
						]">
						<td class="px-6 py-4 whitespace-nowrap">
							<input
								type="checkbox"
								:value="user.id"
								v-model="selectedUsers"
								class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer" />
						</td>

						<td class="px-6 py-4 whitespace-nowrap">
							<div class="flex items-center">
								<div class="h-10 w-10 flex-shrink-0">
									<img
										:src="
											user.profilePhoto || 'https://via.placeholder.com/150'
										"
										:alt="`${user.name}'s profile`"
										class="h-10 w-10 rounded-full object-cover ring-2 ring-white" />
								</div>
								<div class="ml-4">
									<div class="text-sm font-medium text-gray-900">
										{{ user.name }}
									</div>
									<div class="text-sm text-gray-500">{{ user.email }}</div>
								</div>
							</div>
						</td>

						<td class="px-6 py-4 whitespace-nowrap">
							<span
								class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
								:class="getRoleClass(user.role)">
								<span
									class="w-1.5 h-1.5 rounded-full mr-1.5"
									:class="getRoleDotClass(user.role)"></span>
								{{ user.role }}
							</span>
						</td>

						<td class="px-6 py-4 whitespace-nowrap">
							<span
								class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
								:class="getStatusClass(user.status)">
								<span
									class="w-1.5 h-1.5 rounded-full mr-1.5"
									:class="
										user.status === 'Active' ? 'bg-green-500' : 'bg-gray-500'
									"></span>
								{{ user.status }}
							</span>
						</td>

						<td class="px-6 py-4 whitespace-nowrap text-right text-sm">
							<button
								@click="confirmToggleStatus(user.id)"
								class="text-indigo-600 hover:text-indigo-900 font-medium mr-3 focus:outline-none focus:underline">
								{{ user.status === "Active" ? "Deactivate" : "Activate" }}
							</button>
							<button
								@click="confirmDelete(user.id)"
								class="text-red-600 hover:text-red-900 font-medium focus:outline-none focus:underline">
								Delete
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<!-- Bulk Actions -->
		<div
			v-if="selectedUsers.length > 0"
			class="bg-indigo-50 px-6 py-4 border-t border-indigo-100">
			<div class="flex justify-between items-center">
				<span class="text-indigo-700 font-medium flex items-center gap-2">
					<svg
						class="w-5 h-5"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
					</svg>
					{{ selectedUsers.length }} users selected
				</span>
				<div class="flex gap-3">
					<button
						@click="confirmBulkToggle"
						class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors">
						<svg
							class="w-4 h-4 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
						</svg>
						Toggle Status
					</button>
					<button
						@click="confirmBulkDelete"
						class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors">
						<svg
							class="w-4 h-4 mr-2"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
						</svg>
						Delete Selected
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import { ref, computed } from "vue";
	import { useUserStore } from "@/stores/userStore";
	import { useToast } from "@/composables/useToast";
	import { useConfirmDialog } from "@/composables/useConfirmDialog";
	import type { User } from "@/types/user";

	const userStore = useUserStore();
	const { addToast } = useToast();
	const { confirm } = useConfirmDialog();

	// State
	const searchQuery = ref("");
	const roleFilter = ref("");
	const statusFilter = ref("");
	const sortKey = ref<keyof User>("name");
	const sortOrder = ref<"asc" | "desc">("asc");
	const selectedUsers = ref<string[]>([]);

	// Table configuration
	const tableHeaders = [
		{ key: "name" as const, label: "User" },
		{ key: "role" as const, label: "Role" },
		{ key: "status" as const, label: "Status" },
	];

	// Computed properties
	const filteredAndSortedUsers = computed(() => {
		let users = [...userStore.users];

		// Apply search filter
		if (searchQuery.value) {
			const query = searchQuery.value.toLowerCase();
			users = users.filter(
				(user) =>
					user.name.toLowerCase().includes(query) ||
					user.email.toLowerCase().includes(query)
			);
		}

		// Apply role filter
		if (roleFilter.value) {
			users = users.filter((user) => user.role === roleFilter.value);
		}

		// Apply status filter
		if (statusFilter.value) {
			users = users.filter((user) => user.status === statusFilter.value);
		}

		// Apply sorting
		users.sort((a, b) => {
			const aValue = a[sortKey.value];
			const bValue = b[sortKey.value];

			if (aValue < bValue) return sortOrder.value === "asc" ? -1 : 1;
			if (aValue > bValue) return sortOrder.value === "asc" ? 1 : -1;
			return 0;
		});

		return users;
	});

	const selectAll = computed({
		get: () => {
			return (
				userStore.users.length > 0 &&
				selectedUsers.value.length === userStore.users.length
			);
		},
		set: (value: boolean) => {
			selectedUsers.value = value ? userStore.users.map((user) => user.id) : [];
		},
	});

	// Utility functions
	const getRoleClass = (role: string) => {
		const classes = {
			Admin: "bg-purple-100 text-purple-800",
			User: "bg-blue-100 text-blue-800",
			Guest: "bg-gray-100 text-gray-800",
		};
		return classes[role as keyof typeof classes] || classes.Guest;
	};

	const getRoleDotClass = (role: string) => {
		const classes = {
			Admin: "bg-purple-500",
			User: "bg-blue-500",
			Guest: "bg-gray-500",
		};
		return classes[role as keyof typeof classes] || classes.Guest;
	};

	const getStatusClass = (status: string) => {
		return status === "Active"
			? "bg-green-100 text-green-800"
			: "bg-gray-100 text-gray-800";
	};

	// Sorting
	const sortBy = (key: keyof User) => {
		if (sortKey.value === key) {
			sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
		} else {
			sortKey.value = key;
			sortOrder.value = "asc";
		}
	};

	// Actions with confirmations
	const confirmDelete = async (userId: string) => {
		const confirmed = await confirm({
			title: "Delete User",
			message:
				"Are you sure you want to delete this user? This action cannot be undone.",
			confirmText: "Delete",
			confirmButtonClass: "bg-red-600 hover:bg-red-700",
		});

		if (confirmed) {
			try {
				await userStore.deleteUser(userId);
				addToast("User deleted successfully", "success");
			} catch (error) {
				addToast("Failed to delete user", "error");
			}
		}
	};

	const confirmToggleStatus = async (userId: string) => {
		const user = userStore.users.find((u) => u.id === userId);
		if (!user) return;

		const newStatus = user.status === "Active" ? "Inactive" : "Active";
		const confirmed = await confirm({
			title: `${newStatus === "Active" ? "Activate" : "Deactivate"} User`,
			message: `Are you sure you want to ${
				newStatus === "Active" ? "activate" : "deactivate"
			} this user?`,
			confirmText: newStatus === "Active" ? "Activate" : "Deactivate",
			confirmButtonClass:
				newStatus === "Active"
					? "bg-green-600 hover:bg-green-700"
					: "bg-gray-600 hover:bg-gray-700",
		});

		if (confirmed) {
			try {
				await userStore.toggleUserStatus(userId);
				addToast(`User ${newStatus.toLowerCase()} successfully`, "success");
			} catch (error) {
				addToast(`Failed to update user status`, "error");
			}
		}
	};

	const confirmBulkDelete = async () => {
		const confirmed = await confirm({
			title: "Delete Selected Users",
			message: `Are you sure you want to delete ${selectedUsers.value.length} users? This action cannot be undone.`,
			confirmText: "Delete All",
			confirmButtonClass: "bg-red-600 hover:bg-red-700",
		});

		if (confirmed) {
			try {
				await Promise.all(
					selectedUsers.value.map((id) => userStore.deleteUser(id))
				);
				selectedUsers.value = [];
				addToast("Selected users deleted successfully", "success");
			} catch (error) {
				addToast("Failed to delete some users", "error");
			}
		}
	};

	const confirmBulkToggle = async () => {
		const confirmed = await confirm({
			title: "Toggle User Status",
			message: `Are you sure you want to toggle the status of ${selectedUsers.value.length} users?`,
			confirmText: "Toggle Status",
			confirmButtonClass: "bg-indigo-600 hover:bg-indigo-700",
		});

		if (confirmed) {
			try {
				await Promise.all(
					selectedUsers.value.map((id) => userStore.toggleUserStatus(id))
				);
				selectedUsers.value = [];
				addToast("Successfully updated selected users", "success");
			} catch (error) {
				addToast("Failed to update some users", "error");
			}
		}
	};
</script>
