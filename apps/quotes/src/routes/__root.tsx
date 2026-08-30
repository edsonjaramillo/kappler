import { NotFound } from "@repo/ui/not-found";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { Desktop } from "#/components/admin-desktop";

import adminCss from "../admin.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "TanStack Start Starter" },
		],
		links: [{ rel: "stylesheet", href: adminCss }],
	}),
	shellComponent: RootDocument,
	notFoundComponent: NotFound,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body className="relative">
				<Desktop />
				{children}
				<TanStackDevtools
					config={{ position: "bottom-right" }}
					plugins={[{ name: "Tanstack Router", render: <TanStackRouterDevtoolsPanel /> }]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
