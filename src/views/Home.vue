// src/views/Home.vue
<template>
	<div>
		<NavigationBar />
		<main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
			<!-- Header with gradient -->
			<div
				class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl p-8 mb-8 text-white shadow-xl">
				<div class="flex flex-col md:flex-row justify-between items-center">
					<div>
						<h1 class="text-3xl font-bold">Welcome to AlumUnite</h1>
						<p class="text-white/80 mt-2">
							Manage and monitor your user community
						</p>
					</div>
					<router-link
						to="/add-user"
						class="mt-4 md:mt-0 inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-600 focus:ring-white transition-colors">
						<svg
							class="-ml-1 mr-3 h-5 w-5"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M12 4v16m8-8H4" />
						</svg>
						Add New User
					</router-link>
				</div>

				<!-- Stats Cards -->
				<div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
					<div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
						<div class="flex items-center">
							<div class="p-3 rounded-lg bg-white/10">
								<svg
									class="h-6 w-6 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
								</svg>
							</div>
							<div class="ml-4">
								<div class="text-sm text-white/70">Total Users</div>
								<div class="text-2xl font-bold">
									{{ userStore.users.length }}
								</div>
							</div>
						</div>
					</div>

					<div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
						<div class="flex items-center">
							<div class="p-3 rounded-lg bg-white/10">
								<svg
									class="h-6 w-6 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
								</svg>
							</div>
							<div class="ml-4">
								<div class="text-sm text-white/70">Active Users</div>
								<div class="text-2xl font-bold">{{ activeUsersCount }}</div>
							</div>
						</div>
					</div>

					<div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
						<div class="flex items-center">
							<div class="p-3 rounded-lg bg-white/10">
								<svg
									class="h-6 w-6 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
								</svg>
							</div>
							<div class="ml-4">
								<div class="text-sm text-white/70">Admins</div>
								<div class="text-2xl font-bold">{{ adminCount }}</div>
							</div>
						</div>
					</div>

					<div class="bg-white/10 backdrop-blur-sm rounded-lg p-4">
						<div class="flex items-center">
							<div class="p-3 rounded-lg bg-white/10">
								<svg
									class="h-6 w-6 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
								</svg>
							</div>
							<div class="ml-4">
								<div class="text-sm text-white/70">Guest Access</div>
								<div class="text-2xl font-bold">{{ guestCount }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Quick Actions -->
			<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<router-link
					v-for="action in quickActions"
					:key="action.name"
					:to="action.to"
					class="flex items-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
					<div :class="`p-3 rounded-lg ${action.bgColor}`">
						<component
							:is="action.icon"
							class="h-6 w-6 text-white" />
					</div>
					<div class="ml-4">
						<h3 class="text-lg font-medium text-gray-900">{{ action.name }}</h3>
						<p class="text-sm text-gray-500">{{ action.description }}</p>
					</div>
				</router-link>
			</div>

			<!-- User Grid -->
			<div class="bg-white rounded-xl shadow-lg p-6">
				<div class="flex justify-between items-center mb-6">
					<h2 class="text-xl font-semibold text-gray-900">Recent Users</h2>
					<router-link
						to="/manage-users"
						class="text-indigo-600 hover:text-indigo-700 font-medium">
						View All →
					</router-link>
				</div>
				<div
					class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
					<UserCard
						v-for="user in recentUsers"
						:key="user.id"
						:user="user" />
				</div>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
	import { computed } from "vue";
	import NavigationBar from "@/components/layout/NavigationBar.vue";
	import UserCard from "@/components/users/UserCard.vue";
	import { useUserStore } from "@/stores/userStore";

	const userStore = useUserStore();

	// Computed properties for stats
	const activeUsersCount = computed(
		() => userStore.users.filter((user) => user.status === "Active").length
	);

	const adminCount = computed(
		() => userStore.users.filter((user) => user.role === "Admin").length
	);

	const guestCount = computed(
		() => userStore.users.filter((user) => user.role === "Guest").length
	);

	// Get only the 8 most recent users
	const recentUsers = computed(() =>
		[...userStore.users].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 8)
	);

	// Quick actions configuration
	const quickActions = [
		{
			name: "Add User",
			description: "Create a new user profile",
			to: "/add-user",
			bgColor: "bg-gradient-to-r from-indigo-500 to-indigo-600",
			icon: "UserPlusIcon",
		},
		{
			name: "Manage Users",
			description: "View and edit all users",
			to: "/manage-users",
			bgColor: "bg-gradient-to-r from-purple-500 to-purple-600",
			icon: "UsersIcon",
		},
		{
			name: "User Settings",
			description: "Configure user permissions",
			to: "/settings",
			bgColor: "bg-gradient-to-r from-pink-500 to-pink-600",
			icon: "CogIcon",
		},
	];
</script>
