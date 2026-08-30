import { ZodError } from "zod";

import { Text } from "./text";

interface ErrorProps {
	error: Error;
}

export function ErrorComponent({ error }: ErrorProps) {
	const errors = [];

	console.error("Error:", error.message);
	if (error instanceof ZodError) {
		// console.error("Zod validation error:", error);
		for (const issue of error.issues) {
			// console.log(issue);
			errors.push(`${issue.path.join(".")}: ${issue.message}`);
		}
	}

	return (
		<div>
			<Text as="h1" size="4xl">
				Error
			</Text>
			<Text as="p" size="lg">
				{error.message}
			</Text>
		</div>
	);
}
