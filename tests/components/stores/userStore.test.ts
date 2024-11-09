// tests/components/stores/userStore.test.ts
import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useUserStore } from "../../../src/stores/userStore";

describe("UserStore", () => {
	beforeEach(() => {
		// Clear localStorage and reset store before each test
		localStorage.clear();
		setActivePinia(createPinia());

		// Mock the initial mock data load
		vi.mock("@/data/mockUsers", () => ({
			initialMockUsers: [],
		}));
	});

	it("adds a new user", async () => {
		const store = useUserStore();
		const newUser = {
			name: "Test User",
			email: "test@example.com",
			role: "User" as const,
			status: "Active" as const,
		};

		const addedUser = await store.addUser(newUser);
		expect(store.users).toHaveLength(1);
		expect(store.users[0]).toMatchObject(newUser);
	});

	it("toggles user status", async () => {
		const store = useUserStore();
		const user = {
			name: "Test User",
			email: "test@example.com",
			role: "User" as const,
			status: "Active" as const,
		};

		const addedUser = await store.addUser(user);
		await store.toggleUserStatus(addedUser.id);
		const updatedUser = store.users.find((u) => u.id === addedUser.id);
		expect(updatedUser?.status).toBe("Inactive");
	});
});
