import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/",
			name: "Home",
			component: () => import("../views/Home.vue"),
		},
		{
			path: "/add-user",
			name: "AddUser",
			component: () => import("../views/users/AddUser.vue"),
		},
		{
			path: "/manage-users",
			name: "ManageUsers",
			component: () => import("../views/users/ManageUsers.vue"),
		},
		{
			path: "/settings",
			name: "Settings",
			component: () => import("../views/setting/Settings.vue"),
		},
	],
});

export default router;
