import { cn } from "@repo/ui/cn";
import { ErrorComponent } from "@repo/ui/error-component";
import { paginationSchema } from "@repo/validation/pagination";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import { getIsomorphicAPIClient } from "#/lib/api-client";

export const Route = createFileRoute("/users")({
  component: RouteComponent,
  validateSearch: zodValidator(paginationSchema),
  loaderDeps: ({ search: { page, limit } }) => ({ page, limit }),
  loader: async ({ deps }) => {
    const apiClient = await getIsomorphicAPIClient();

    const response = await apiClient.users.list({ query: deps });
    if (response.status === 401) throw redirect({ to: "/unauthorized" });
    if (response.status === 403) throw redirect({ to: "/forbidden" });

    return { users: response.body.payload };
  },
  errorComponent: ({ error }) => <ErrorComponent error={error} />,
});

function RouteComponent() {
  const { users } = Route.useLoaderData();

  return (
    <>
      <p>Hello there</p>
      <UsersList users={users} />
    </>
  );
}

const cardStyle = cn("flex w-80 flex-col gap-4 border p-6");

type UsersList = { users: { id: string; firstName: string; lastName: string }[] };
function UsersList({ users }: UsersList) {
  return (
    <div className="space-y-2 p-6">
      {users.map((user) => (
        <div key={user.id} className={cardStyle}>
          <span>{user.firstName}</span> <span>{user.lastName}</span>
        </div>
      ))}
    </div>
  );
}
