import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import { createPinia, setActivePinia } from "pinia";
import UserTable from "../../../src/components/users/UserTable.vue";
import { useUserStore } from "../../../src/stores/userStore";
import type { User } from "../../../src/types/user";

describe("UserTable", () => {
	const mockUsers: User[] = [
		{
			id: "1",
			name: "John Doe",
			email: "john@example.com",
			role: "Admin",
			status: "Active",
		},
		{
			id: "2",
			name: "Jane Smith",
			email: "jane@example.com",
			role: "User",
			status: "Inactive",
		},
	];

	beforeEach(() => {
		setActivePinia(createPinia());
		const store = useUserStore();
		store.$patch({ users: mockUsers });
	});

	const renderComponent = () => {
		return render(UserTable, {
			global: {
				plugins: [createPinia()],
				stubs: {
					RouterLink: true,
				},
			},
		});
	};

	it("renders table with users", async () => {
		renderComponent();

		expect(await screen.findByText("John Doe")).toBeInTheDocument();
		expect(await screen.findByText("jane@example.com")).toBeInTheDocument();
	});

	it("filters users by search query", async () => {
		renderComponent();

		const searchInput = await screen.findByPlaceholderText("Search users...");
		await fireEvent.update(searchInput, "John");

		expect(await screen.findByText("John Doe")).toBeInTheDocument();
		expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
	});

	it("filters users by role", async () => {
		renderComponent();

		const roleSelect = await screen.findByRole("combobox");
		await fireEvent.update(roleSelect, "Admin");

		expect(await screen.findByText("John Doe")).toBeInTheDocument();
		expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument();
	});

	it("handles bulk selection", async () => {
		renderComponent();

		const selectAllCheckbox = await screen.findByRole("checkbox", {
			name: /select all/i,
		});
		await fireEvent.click(selectAllCheckbox);

		expect(await screen.findByText("2 users selected")).toBeInTheDocument();
	});
});
