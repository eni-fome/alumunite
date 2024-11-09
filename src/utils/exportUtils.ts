import type { User } from "../types/user";

export const exportToCSV = (users: User[]) => {
	const headers = ["Name", "Email", "Role", "Status"];
	const csvContent = [
		headers.join(","),
		...users.map((user) =>
			[
				`"${user.name}"`,
				`"${user.email}"`,
				`"${user.role}"`,
				`"${user.status}"`,
			].join(",")
		),
	].join("\n");

	const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
	const link = document.createElement("a");
	const url = URL.createObjectURL(blob);

	link.setAttribute("href", url);
	link.setAttribute(
		"download",
		`users-${new Date().toISOString().split("T")[0]}.csv`
	);
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
};
