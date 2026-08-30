import type { ClassNameValue } from "tailwind-merge";
import { twMerge } from "tailwind-merge";

export function cn(...classes: ClassNameValue[]): string {
	return twMerge(classes);
}
