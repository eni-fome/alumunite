import type { User } from "../types/user";

export const initialMockUsers: User[] = [
	{
		id: "1",
		name: "John Smith",
		email: "john.smith@example.com",
		role: "Admin",
		status: "Active",
		profilePhoto: "https://i.pravatar.cc/150?u=1",
	},
	{
		id: "2",
		name: "Sarah Johnson",
		email: "sarah.j@example.com",
		role: "User",
		status: "Active",
		profilePhoto: "https://i.pravatar.cc/150?u=2",
	},
	{
		id: "3",
		name: "Michael Brown",
		email: "michael.b@example.com",
		role: "User",
		status: "Inactive",
		profilePhoto: "https://i.pravatar.cc/150?u=3",
	},
	{
		id: "4",
		name: "Emily Davis",
		email: "emily.d@example.com",
		role: "Guest",
		status: "Active",
		profilePhoto: "https://i.pravatar.cc/150?u=4",
	},
	{
		id: "5",
		name: "David Wilson",
		email: "david.w@example.com",
		role: "Admin",
		status: "Active",
		profilePhoto: "https://i.pravatar.cc/150?u=5",
	},
];
