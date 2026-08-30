import type { StoreApi, UseBoundStore } from "zustand";
import { create } from "zustand";

export type SessionContext = ReturnType<typeof createSessionStore>;

export interface SessionUser {
	name: string;
}

interface AuthenticatedState {
	user: SessionUser;
	isAuthenticated: true;
}

interface UnauthenticatedState {
	user: undefined;
	isAuthenticated: false;
}

interface Actions {
	setSession: (user: SessionUser) => void;
	clearSession: () => void;
}

type State = AuthenticatedState | UnauthenticatedState;

export type SessionStore = State & Actions;

export function createSessionStore(): UseBoundStore<StoreApi<SessionStore>> {
	return create<SessionStore>((set) => ({
		user: undefined,
		isAuthenticated: false,
		setSession(user) {
			set({ user, isAuthenticated: true });
		},
		clearSession() {
			set({ user: undefined, isAuthenticated: false });
		},
	}));
}
