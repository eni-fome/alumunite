// src/components/users/UserList.vue
<template>
	<div>
		<!-- Loading state -->
		<div
			v-if="userStore.loading"
			class="text-center py-8">
			<div
				class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
		</div>

		<!-- Error state -->
		<div
			v-else-if="userStore.error"
			class="text-center py-8 text-red-600">
			{{ userStore.error }}
		</div>

		<!-- Empty state -->
		<div
			v-else-if="userStore.users.length === 0"
			class="text-center py-8 text-gray-500">
			No users found. Add some users to get started.
		</div>

		<!-- Users grid -->
		<div
			v-else
			class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
			<UserCard
				v-for="user in userStore.users"
				:key="user.id"
				:user="user" />
		</div>
	</div>
</template>

<script setup lang="ts">
	import { onMounted } from "vue";
	import UserCard from "./UserCard.vue";
	import { useUserStore } from "@/stores/userStore";

	const userStore = useUserStore();

	onMounted(() => {
		console.log("UserList mounted, users:", userStore.users);
	});
</script>
