import { createDisclosureStore } from "@repo/context/disclosure";
import { createSessionStore } from "@repo/context/session";

export const useMobileContext = createDisclosureStore();
export const useAvatarContext = createDisclosureStore();
export const useSessionContext = createSessionStore();
