import { createAPIClient } from "@repo/contracts/api-contracts";
import { createIsomorphicFn } from "@tanstack/react-start";

const baseUrl = "http://localhost:8080";

export const apiClient = createAPIClient(baseUrl);

const getCookieHeader = createIsomorphicFn()
	.client(() => null)
	.server(async () => {
		const { getRequestHeader } = await import("@tanstack/react-start/server");
		return getRequestHeader("cookie");
	});

export async function getIsomorphicAPIClient() {
	const cookie = await getCookieHeader();

	if (typeof cookie !== "string" || cookie === "") {
		return apiClient;
	}

	return createAPIClient(baseUrl, {
		baseHeaders: { cookie },
	});
}
