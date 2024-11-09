// tests/components/users/UserCard.test.ts
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/vue";
import { createPinia, setActivePinia } from "pinia";
import UserCard from "../../../src/components/users/UserCard.vue";
import { useUserStore } from "../../../src/stores/userStore";
import type { User } from "../../../src/types/user";

// Create a proper Modal stub
const ModalStub = {
	template: `
    <div v-if="isOpen" data-testid="modal">
      <div class="modal-content">
        <slot></slot>
      </div>
    </div>
  `,
	props: ["isOpen", "title"],
};

describe("UserCard", () => {
	const mockUser: User = {
		id: "1",
		name: "John Doe",
		email: "john@example.com",
		role: "Admin",
		status: "Active",
		profilePhoto: "/path/to/photo.jpg",
	};

	beforeEach(() => {
		// Clear localStorage and reset store
		localStorage.clear();
		setActivePinia(createPinia());

		// Mock initial data
		vi.mock("@/data/mockUsers", () => ({
			initialMockUsers: [],
		}));
	});

	const renderComponent = () => {
		return render(UserCard, {
			props: {
				user: mockUser,
			},
			global: {
				plugins: [createPinia()],
				stubs: {
					Modal: ModalStub,
				},
			},
		});
	};

	it("renders user information correctly", async () => {
		renderComponent();
		expect(await screen.findByText(mockUser.name)).toBeInTheDocument();
		expect(await screen.findByText(mockUser.email)).toBeInTheDocument();
		expect(await screen.findByText(mockUser.role)).toBeInTheDocument();
		expect(await screen.findByText(mockUser.status)).toBeInTheDocument();
	});

	it("calls toggleStatus when status button is clicked", async () => {
		renderComponent();
		const store = useUserStore();
		const toggleSpy = vi.spyOn(store, "toggleUserStatus");

		const button = await screen.findByText("Deactivate");
		await fireEvent.click(button);
		expect(toggleSpy).toHaveBeenCalledWith(mockUser.id);
	});

	it("opens edit modal when edit button is clicked", async () => {
		renderComponent();

		const editButton = await screen.findByText("Edit");
		await fireEvent.click(editButton);

		const modal = await screen.findByTestId("modal");
		expect(modal).toBeInTheDocument();
	});
});
