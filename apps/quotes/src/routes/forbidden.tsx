import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/forbidden")({
  head: () => ({ meta: [{ name: "robots", content: "noindex, nofollow" }] }),
  component: ForbiddenPage,
});

function ForbiddenPage() {
  return (
    <main className="bg-slate-100 flex min-h-screen items-center justify-center px-4">
      <section className="rounded-xl shadow-sm max-w-md bg-white p-8 text-center">
        <p className="text-red-600 text-sm font-bold tracking-wider uppercase">Link unavailable</p>
        <h1 className="text-slate-950 mt-2 text-3xl font-bold">This quote link cannot be used</h1>
        <p className="text-slate-600 mt-4">
          The link is invalid, expired, or no longer available. Request a new quote email if you
          still need to respond.
        </p>
        <Link className="text-blue-700 mt-6 inline-block font-semibold hover:underline" to="/">
          Return home
        </Link>
      </section>
    </main>
  );
}
