// src/components/layout/NavigationBar.vue
<template>
	<nav class="bg-white shadow-lg">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-between h-16">
				<!-- Logo and primary navigation -->
				<div class="flex">
					<div class="flex-shrink-0 flex items-center">
						<router-link
							to="/"
							class="flex items-center space-x-2">
							<div
								class="w-8 h-8 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
								<span class="text-white font-bold text-xl">A</span>
							</div>
							<span
								class="text-xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
								AlumUnite
							</span>
						</router-link>
					</div>

					<!-- Desktop Navigation -->
					<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
						<router-link
							v-for="link in navigationLinks"
							:key="link.path"
							:to="link.path"
							class="inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors"
							:class="[
								$route.path === link.path
									? 'border-indigo-500 text-gray-900'
									: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
							]">
							<component
								:is="link.icon"
								class="h-5 w-5 mr-2" />
							{{ link.name }}
						</router-link>
					</div>
				</div>

				<!-- Mobile menu button -->
				<div class="flex items-center sm:hidden">
					<button
						@click="isOpen = !isOpen"
						class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100">
						<span class="sr-only">Open main menu</span>
						<svg
							class="h-6 w-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24">
							<path
								v-if="!isOpen"
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M4 6h16M4 12h16M4 18h16" />
							<path
								v-else
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12" />
						</svg>
					</button>
				</div>
			</div>
		</div>

		<!-- Mobile menu -->
		<div
			v-show="isOpen"
			class="sm:hidden border-t border-gray-200">
			<div class="pt-2 pb-3 space-y-1">
				<router-link
					v-for="link in navigationLinks"
					:key="link.path"
					:to="link.path"
					class="flex items-center px-4 py-2 text-base font-medium border-l-4"
					:class="[
						$route.path === link.path
							? 'bg-indigo-50 border-indigo-500 text-indigo-700'
							: 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700',
					]"
					@click="isOpen = false">
					<component
						:is="link.icon"
						class="h-5 w-5 mr-2" />
					{{ link.name }}
				</router-link>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts">
	import { ref } from "vue";
	import {
		HomeIcon,
		UserPlusIcon,
		UsersIcon,
		Cog6ToothIcon,
	} from "@heroicons/vue/24/outline";

	const isOpen = ref(false);

	const navigationLinks = [
		{ name: "Home", path: "/", icon: HomeIcon },
		{ name: "Add User", path: "/add-user", icon: UserPlusIcon },
		{ name: "Manage Users", path: "/manage-users", icon: UsersIcon },
		{ name: "Settings", path: "/settings", icon: Cog6ToothIcon },
	];
</script>
