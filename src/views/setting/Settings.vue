// src/views/settings/Settings.vue
<template>
	<div>
		<NavigationBar />
		<main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
			<!-- Header -->
			<div
				class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-6 mb-8 text-white shadow-xl">
				<h1 class="text-2xl font-bold">System Settings</h1>
				<p class="text-white/80 mt-2">
					Configure user permissions and system preferences
				</p>
			</div>

			<!-- Settings Grid -->
			<div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
				<!-- Sidebar Navigation -->
				<div class="lg:col-span-1">
					<nav class="space-y-2">
						<button
							v-for="tab in tabs"
							:key="tab.id"
							@click="currentTab = tab.id"
							:class="[
								'w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors',
								currentTab === tab.id
									? 'bg-indigo-50 text-indigo-700'
									: 'text-gray-600 hover:bg-gray-50',
							]">
							<component
								:is="tab.icon"
								class="h-5 w-5 mr-3" />
							{{ tab.name }}
						</button>
					</nav>
				</div>

				<!-- Settings Content -->
				<div class="lg:col-span-2">
					<div class="bg-white rounded-xl shadow-lg">
						<!-- Role Management -->
						<div
							v-if="currentTab === 'roles'"
							class="p-6">
							<h2 class="text-lg font-medium text-gray-900 mb-6">
								Role Configuration
							</h2>

							<div class="space-y-6">
								<!-- Role Permissions -->
								<div
									v-for="role in roles"
									:key="role.name"
									class="border rounded-lg p-4">
									<div class="flex items-center justify-between mb-4">
										<div class="flex items-center">
											<span
												:class="getRoleClass(role.name)"
												class="px-3 py-1 rounded-full text-sm font-medium">
												{{ role.name }}
											</span>
										</div>
										<button
											@click="toggleRoleEdit(role)"
											class="text-indigo-600 hover:text-indigo-900 text-sm font-medium">
											Edit Permissions
										</button>
									</div>

									<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
										<div
											v-for="permission in role.permissions"
											:key="permission.name"
											class="flex items-center">
											<input
												:id="`${role.name}-${permission.name}`"
												type="checkbox"
												v-model="permission.enabled"
												class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
											<label
												:for="`${role.name}-${permission.name}`"
												class="ml-3 text-sm text-gray-700">
												{{ permission.label }}
											</label>
										</div>
									</div>
								</div>

								<!-- Save Button -->
								<div class="flex justify-end">
									<button
										@click="saveRoleSettings"
										class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
										Save Changes
									</button>
								</div>
							</div>
						</div>

						<!-- User Defaults -->
						<div
							v-if="currentTab === 'defaults'"
							class="p-6">
							<h2 class="text-lg font-medium text-gray-900 mb-6">
								Default User Settings
							</h2>

							<div class="space-y-6">
								<!-- Default Role -->
								<div>
									<label class="block text-sm font-medium text-gray-700 mb-2">
										Default Role for New Users
									</label>
									<select
										v-model="defaultSettings.defaultRole"
										class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-lg">
										<option
											v-for="role in roles"
											:key="role.name"
											:value="role.name">
											{{ role.name }}
										</option>
									</select>
								</div>

								<!-- Default Status -->
								<div>
									<label class="block text-sm font-medium text-gray-700 mb-2">
										Default Status for New Users
									</label>
									<div class="flex space-x-4">
										<button
											@click="defaultSettings.defaultStatus = 'Active'"
											:class="[
												'flex-1 px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
												defaultSettings.defaultStatus === 'Active'
													? 'bg-green-100 text-green-800'
													: 'bg-gray-100 text-gray-700',
											]">
											Active
										</button>
										<button
											@click="defaultSettings.defaultStatus = 'Inactive'"
											:class="[
												'flex-1 px-4 py-2 text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors',
												defaultSettings.defaultStatus === 'Inactive'
													? 'bg-gray-700 text-white'
													: 'bg-gray-100 text-gray-700',
											]">
											Inactive
										</button>
									</div>
								</div>

								<!-- Profile Settings -->
								<div>
									<h3 class="text-sm font-medium text-gray-700 mb-4">
										Profile Requirements
									</h3>
									<div class="space-y-4">
										<label class="flex items-center">
											<input
												type="checkbox"
												v-model="defaultSettings.requireProfilePhoto"
												class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
											<span class="ml-3 text-sm text-gray-700">
												Require Profile Photo
											</span>
										</label>

										<label class="flex items-center">
											<input
												type="checkbox"
												v-model="defaultSettings.emailVerification"
												class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
											<span class="ml-3 text-sm text-gray-700">
												Enable Email Verification
											</span>
										</label>
									</div>
								</div>

								<!-- Save Button -->
								<div class="flex justify-end">
									<button
										@click="saveDefaultSettings"
										class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
										Save Changes
									</button>
								</div>
							</div>
						</div>

						<!-- Notifications -->
						<div
							v-if="currentTab === 'notifications'"
							class="p-6">
							<h2 class="text-lg font-medium text-gray-900 mb-6">
								Notification Settings
							</h2>

							<div class="space-y-6">
								<div
									v-for="notification in notificationSettings"
									:key="notification.id"
									class="flex items-start">
									<div class="flex items-center h-5">
										<input
											:id="notification.id"
											type="checkbox"
											v-model="notification.enabled"
											class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
									</div>
									<div class="ml-3">
										<label
											:for="notification.id"
											class="font-medium text-gray-700">
											{{ notification.title }}
										</label>
										<p class="text-sm text-gray-500">
											{{ notification.description }}
										</p>
									</div>
								</div>

								<!-- Save Button -->
								<div class="flex justify-end">
									<button
										@click="saveNotificationSettings"
										class="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
										Save Changes
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import NavigationBar from "@/components/layout/NavigationBar.vue";
	import { useToast } from "@/composables/useToast";

	const { addToast } = useToast();

	// Tabs Configuration
	const tabs = [
		{ id: "roles", name: "Role Management", icon: "ShieldCheckIcon" },
		{ id: "defaults", name: "User Defaults", icon: "UserIcon" },
		{ id: "notifications", name: "Notifications", icon: "BellIcon" },
	];

	const currentTab = ref("roles");

	// Role Management
	const roles = ref([
		{
			name: "Admin",
			permissions: [
				{ name: "create_user", label: "Create Users", enabled: true },
				{ name: "edit_user", label: "Edit Users", enabled: true },
				{ name: "delete_user", label: "Delete Users", enabled: true },
				{ name: "manage_roles", label: "Manage Roles", enabled: true },
				{ name: "view_analytics", label: "View Analytics", enabled: true },
				{ name: "export_data", label: "Export Data", enabled: true },
			],
		},
		{
			name: "User",
			permissions: [
				{ name: "create_user", label: "Create Users", enabled: false },
				{ name: "edit_user", label: "Edit Users", enabled: false },
				{ name: "delete_user", label: "Delete Users", enabled: false },
				{ name: "manage_roles", label: "Manage Roles", enabled: false },
				{ name: "view_analytics", label: "View Analytics", enabled: true },
				{ name: "export_data", label: "Export Data", enabled: true },
			],
		},
		{
			name: "Guest",
			permissions: [
				{ name: "create_user", label: "Create Users", enabled: false },
				{ name: "edit_user", label: "Edit Users", enabled: false },
				{ name: "delete_user", label: "Delete Users", enabled: false },
				{ name: "manage_roles", label: "Manage Roles", enabled: false },
				{ name: "view_analytics", label: "View Analytics", enabled: false },
				{ name: "export_data", label: "Export Data", enabled: false },
			],
		},
	]);

	// Default Settings
	const defaultSettings = ref({
		defaultRole: "User",
		defaultStatus: "Active",
		requireProfilePhoto: false,
		emailVerification: true,
	});

	// Notification Settings
	const notificationSettings = ref([
		{
			id: "new_user",
			title: "New User Notifications",
			description: "Receive notifications when new users are added",
			enabled: true,
		},
		{
			id: "status_change",
			title: "Status Change Notifications",
			description: "Receive notifications when user status changes",
			enabled: true,
		},
		{
			id: "role_change",
			title: "Role Change Notifications",
			description: "Receive notifications when user roles are modified",
			enabled: true,
		},
		{
			id: "system_updates",
			title: "System Updates",
			description: "Receive notifications about system updates and maintenance",
			enabled: false,
		},
	]);

	// Utility Functions
	const getRoleClass = (role: string) => {
		const classes = {
			Admin: "bg-purple-100 text-purple-800",
			User: "bg-blue-100 text-blue-800",
			Guest: "bg-gray-100 text-gray-800",
		};
		return classes[role as keyof typeof classes] || "";
	};

	// Save Functions
	const saveRoleSettings = () => {
		// Save role settings to localStorage or API
		addToast("Role settings saved successfully", "success");
	};

	const saveDefaultSettings = () => {
		// Save default settings to localStorage or API
		addToast("Default settings saved successfully", "success");
	};

	const saveNotificationSettings = () => {
		// Save notification settings to localStorage or API
		addToast("Notification settings saved successfully", "success");
	};
</script>
