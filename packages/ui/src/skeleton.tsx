import { cn } from "./lib/cn";

type SkeletonProps = React.ComponentProps<"div">;

export function Skeleton({ className, ...props }: SkeletonProps) {
	return (
		<div
			data-slot="skeleton"
			className={cn("animate-pulse rounded-base bg-muted", className)}
			{...props}
		/>
	);
}
