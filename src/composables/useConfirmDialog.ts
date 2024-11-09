import { ref } from "vue";

interface ConfirmOptions {
	title: string;
	message: string;
	confirmText?: string;
	confirmButtonClass?: string;
}

const isOpen = ref(false);
const options = ref<ConfirmOptions>({
	title: "",
	message: "",
	confirmText: "Confirm",
	confirmButtonClass: "",
});
let resolvePromise: ((value: boolean) => void) | null = null;

export function useConfirmDialog() {
	const confirm = (opts: ConfirmOptions): Promise<boolean> => {
		isOpen.value = true;
		options.value = opts;

		return new Promise((resolve) => {
			resolvePromise = resolve;
		});
	};

	const handleConfirm = () => {
		if (resolvePromise) {
			resolvePromise(true);
		}
		isOpen.value = false;
	};

	const handleCancel = () => {
		if (resolvePromise) {
			resolvePromise(false);
		}
		isOpen.value = false;
	};

	return {
		isOpen,
		options,
		confirm,
		handleConfirm,
		handleCancel,
	};
}
