import { SessionWatcher } from "@repo/context/session-watcher";
import { Avatar } from "@repo/ui/avatar";
import { Link } from "@tanstack/react-router";

import { useAvatarContext, useSessionContext } from "#/context/admin-context";
import { apiClient } from "#/lib/api-client";

const links = [
	{ name: "Home", href: "/" },
	{ name: "Users", href: "/users" },
];

export function Desktop() {
	return (
		<div>
			<DesktopNavigation />
		</div>
	);
}

export function DesktopNavigation() {
	const sessionContext = useSessionContext();
	const avatarDisclosureContext = useAvatarContext();
	return (
		<div className="bg-primary">
			<SessionWatcher sessionStore={sessionContext} apiClient={apiClient} />
			<div className="mx-auto flex h-navigation w-responsive items-center justify-between">
				<span>Logo</span>
				<div className="flex gap-8">
					{links.map((link) => (
						<Link key={link.name} to={link.href} className="text-white">
							{link.name}
						</Link>
					))}
				</div>
				<Avatar
					sessionContext={sessionContext}
					avatarDisclosureContext={avatarDisclosureContext}
					apiClient={apiClient}
					authorizedLinks={[]}
				/>
			</div>
		</div>
	);
}
