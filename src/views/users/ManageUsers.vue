<template>
	<div>
		<NavigationBar />
		<main class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
			<div class="mb-6">
				<h1 class="text-2xl font-bold text-gray-900">Manage Users</h1>
			</div>
			<UserTable />
		</main>
	</div>
</template>

<script setup lang="ts">
	import NavigationBar from "@/components/layout/NavigationBar.vue";
	import UserTable from "@/components/users/UserTable.vue";
</script>
