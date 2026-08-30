import { Link } from "@tanstack/react-router";

import { buttonVariants } from "./button";
import { Text } from "./text";

export function NotFound() {
	return (
		<div className="flex h-[80vh] flex-col items-center justify-center gap-6">
			<Text as="h1" size="4xl" tone="danger" className="text-9xl font-bold">
				404
			</Text>
			<Text as="p" size="2xl" tone="gray">
				Page Not Found
			</Text>
			<Link className={buttonVariants()} to={"/"}>
				Return Home
			</Link>
		</div>
	);
}
