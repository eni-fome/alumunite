// tests/setup.ts
import "@testing-library/jest-dom";
import { expect, vi } from "vitest";
import matchers from "@testing-library/jest-dom/matchers";

expect.extend(matchers);

// Mock localStorage
const localStorageMock = {
	getItem: vi.fn(() => null),
	setItem: vi.fn(),
	clear: vi.fn(),
	removeItem: vi.fn(),
	length: 0,
	key: vi.fn(),
};
global.localStorage = localStorageMock as Storage;

// Add custom matchers type
declare module "vitest" {
	interface Assertion<T = any> {
		toBeInTheDocument(): void;
		toHaveTextContent(text: string): void;
		toBeVisible(): void;
	}
}
