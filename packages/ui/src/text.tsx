import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import type { ComponentPropsWithoutRef } from "react";
import { createElement } from "react";

import { cn } from "./lib/cn";

export const textVariants = cva("antialiased", {
	variants: {
		size: {
			xs: "text-xs",
			sm: "text-sm",
			base: "text-base",
			lg: "text-lg",
			xl: "text-xl",
			"2xl": "text-2xl",
			"3xl": "text-3xl",
			"4xl": "text-4xl",
		},
		tone: {
			black: "text-black",
			gray: "text-gray",
			muted: "text-muted",
			white: "text-white",
			primary: "text-primary",
			danger: "text-danger",
		},
	},
	compoundVariants: [{ size: ["xl", "2xl", "3xl", "4xl"], className: "tracking-tight" }],
	defaultVariants: { size: "base", tone: "black" },
});

type TextVariants = VariantProps<typeof textVariants>;

type TextTag =
	| "p"
	| "span"
	| "label"
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "h5"
	| "h6"
	| "small"
	| "strong"
	| "em"
	| "blockquote"
	| "code";

type TextOwnProps<T extends TextTag> = { as?: T; className?: string } & TextVariants;

export type TextProps<T extends TextTag = "p"> = TextOwnProps<T> &
	Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps<T>>;

export function Text<T extends TextTag = "p">({
	as,
	children,
	className,
	size,
	tone,
	...props
}: TextProps<T>) {
	const component = as ?? "p";
	const style = cn(textVariants({ size, tone }), className);

	return createElement(component, { ...props, className: style }, children);
}
