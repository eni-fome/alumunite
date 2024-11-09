<template>
	<div class="min-h-screen bg-gray-50">
		<router-view></router-view>
		<ToastContainer />
		<ConfirmDialog />
	</div>
</template>

<script setup lang="ts">
	import ToastContainer from "./components/common/ToastContainer.vue";
	import ConfirmDialog from "./components/common/ConfirmDialog.vue";
</script>
