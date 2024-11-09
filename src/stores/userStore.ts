import { defineStore } from "pinia";
import { ref } from "vue";
import type { User } from "../types/user";
import { initialMockUsers } from "../data/mockUsers";
import { v4 as uuidv4 } from "uuid";

export const useUserStore = defineStore("users", () => {
	const users = ref<User[]>([]);
	const loading = ref(false);
	const error = ref<string | null>(null);

	// Initialize function
	function initializeMockData() {
		const storedUsers = localStorage.getItem("users");
		if (storedUsers) {
			users.value = JSON.parse(storedUsers);
		} else {
			users.value = initialMockUsers;
			localStorage.setItem("users", JSON.stringify(initialMockUsers));
		}
		console.log("Store initialized with users:", users.value);
	}

	// Initialize on store creation
	initializeMockData();

	const addUser = async (userData: Omit<User, "id">) => {
		loading.value = true;
		error.value = null;

		try {
			const newUser = {
				...userData,
				id: uuidv4(),
			};

			users.value.push(newUser);
			localStorage.setItem("users", JSON.stringify(users.value));
			return newUser;
		} catch (e) {
			error.value = "Failed to add user";
			throw e;
		} finally {
			loading.value = false;
		}
	};

	const updateUser = async (userId: string, updates: Partial<User>) => {
		loading.value = true;
		error.value = null;

		try {
			const userIndex = users.value.findIndex((u) => u.id === userId);
			if (userIndex === -1) throw new Error("User not found");

			users.value[userIndex] = {
				...users.value[userIndex],
				...updates,
			};

			localStorage.setItem("users", JSON.stringify(users.value));
			return users.value[userIndex];
		} catch (err) {
			error.value = "Failed to update user";
			throw err;
		} finally {
			loading.value = false;
		}
	};

	const deleteUser = async (userId: string) => {
		loading.value = true;
		error.value = null;

		try {
			users.value = users.value.filter((user) => user.id !== userId);
			localStorage.setItem("users", JSON.stringify(users.value));
		} catch (e) {
			error.value = "Failed to delete user";
			throw e;
		} finally {
			loading.value = false;
		}
	};

	const toggleUserStatus = async (userId: string) => {
		loading.value = true;
		error.value = null;

		try {
			const user = users.value.find((u) => u.id === userId);
			if (!user) throw new Error("User not found");

			user.status = user.status === "Active" ? "Inactive" : "Active";
			localStorage.setItem("users", JSON.stringify(users.value));
		} catch (e) {
			error.value = "Failed to toggle user status";
			throw e;
		} finally {
			loading.value = false;
		}
	};

	return {
		// State
		users,
		loading,
		error,

		// Actions
		initializeMockData,
		addUser,
		updateUser,
		deleteUser,
		toggleUserStatus,
	};
});
