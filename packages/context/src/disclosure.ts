import type { StoreApi, UseBoundStore } from "zustand";
import { create } from "zustand";

export type DisclosureContext = ReturnType<typeof createDisclosureStore>;

interface State {
	isOpen: boolean;
}

interface Actions {
	open: () => void;
	close: () => void;
	toggle: () => void;
}

export interface DisclosureStore extends State, Actions {}

export function createDisclosureStore(): UseBoundStore<StoreApi<DisclosureStore>> {
	return create<DisclosureStore>((set) => ({
		isOpen: false,
		open() {
			set({ isOpen: true });
		},
		close() {
			set({ isOpen: false });
		},
		toggle() {
			set((state) => ({ isOpen: !state.isOpen }));
		},
	}));
}
