import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";

import { cn } from "./lib/cn";

type ButtonVariants = VariantProps<typeof buttonVariants>;
interface RequiredButtonProps {
	type: React.ComponentProps<"button">["type"];
}

export type ButtonProps = React.ComponentProps<"button"> & RequiredButtonProps & ButtonVariants;

export const buttonVariants = cva(
	"h-9 gap-2 px-4 py-2 text-sm font-medium [&_svg]:size-4 flex cursor-pointer items-center justify-center rounded-base whitespace-nowrap transition-colors duration-base focus-visible:ring-2 focus-visible:ring-info focus-visible:ring-offset-2 focus-visible:outline-none [&_svg]:pointer-events-none [&_svg]:shrink-0",
	{
		variants: {
			color: {
				primary:
					"bg-primary text-white not-disabled:hover:bg-primary-hover not-disabled:focus:bg-primary-hover not-disabled:active:bg-primary-pressed",
				danger:
					"bg-danger text-white not-disabled:hover:bg-danger-hover not-disabled:focus:bg-danger-hover not-disabled:active:bg-danger-pressed",
				success:
					"bg-success text-white not-disabled:hover:bg-success-hover not-disabled:focus:bg-success-hover not-disabled:active:bg-success-pressed",
			},
			disabled: { true: "cursor-not-allowed bg-muted text-black" },
			width: { fit: "w-fit", full: "w-full" },
		},
		defaultVariants: { color: "primary", width: "fit", disabled: false },
	},
);

export function Button({
	children,
	className,
	color,
	disabled,
	type,
	width,
	...props
}: ButtonProps): React.JSX.Element {
	const buttonStyle = buttonVariants({ color, disabled, width });
	return (
		<button className={cn(buttonStyle, className)} disabled={disabled} type={type} {...props}>
			{children}
		</button>
	);
}
