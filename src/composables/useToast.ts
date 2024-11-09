import { ref } from "vue";

interface Toast {
	id: number;
	message: string;
	type: "success" | "error" | "info";
}

const toasts = ref<Toast[]>([]);
let counter = 0;

export function useToast() {
	const addToast = (message: string, type: Toast["type"] = "info") => {
		const id = counter++;
		toasts.value.push({ id, message, type });

		// Auto remove after 3 seconds
		setTimeout(() => {
			removeToast(id);
		}, 3000);
	};

	const removeToast = (id: number) => {
		toasts.value = toasts.value.filter((toast) => toast.id !== id);
	};

	return {
		toasts,
		addToast,
		removeToast,
	};
}
