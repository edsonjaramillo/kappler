import { Button } from "@repo/ui/button";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { z } from "zod";

const tokenInputSchema = z.object({ token: z.string().min(1) });
const searchSchema = z.object({
  token: z.preprocess((value) => (typeof value === "string" ? value : ""), z.string()),
});

const verifyQuoteLink = createServerFn({ method: "GET" })
  .validator(tokenInputSchema)
  .handler(async ({ data }) => {
    const { setResponseHeader } = await import("@tanstack/react-start/server");
    setResponseHeader("Cache-Control", "no-store");
    setResponseHeader("Referrer-Policy", "no-referrer");
    const { getQuoteResponse } = await import("#/server/quote-service.server");
    return getQuoteResponse(data.token);
  });

const respondToQuote = createServerFn({ method: "POST" })
  .validator(tokenInputSchema)
  .handler(async ({ data }) => {
    const { submitQuoteResponse } = await import("#/server/quote-service.server");
    return submitQuoteResponse(data.token);
  });

export const Route = createFileRoute("/respond")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ token: search.token }),
  beforeLoad: async ({ search }) => {
    if (!search.token) throw redirect({ to: "/forbidden" });

    try {
      return { quoteResponse: await verifyQuoteLink({ data: { token: search.token } }) };
    } catch {
      console.warn("Rejected an invalid quote response token");
      throw redirect({ to: "/forbidden" });
    }
  },
  loader: ({ context }) => context.quoteResponse,
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { name: "referrer", content: "no-referrer" },
    ],
  }),
  component: QuoteResponsePage,
});

function QuoteResponsePage() {
  const { token } = Route.useSearch();
  return <QuoteResponseConfirmation key={token} />;
}

function QuoteResponseConfirmation() {
  const response = Route.useLoaderData();
  const { token } = Route.useSearch();
  const submitResponse = useServerFn(respondToQuote);
  const navigate = useNavigate();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "already-completed">(
    response.completed ? "already-completed" : "idle",
  );

  const submit = async () => {
    setStatus("submitting");
    try {
      const result = await submitResponse({ data: { token } });
      setStatus(result.status);
    } catch {
      await navigate({ to: "/forbidden" });
    }
  };

  const isComplete = status === "success" || status === "already-completed";

  return (
    <main className="bg-slate-100 min-h-screen px-4 py-16">
      <section className="rounded-xl shadow-sm mx-auto max-w-xl bg-white p-8">
        <p className="text-blue-700 text-sm font-semibold tracking-wide uppercase">
          Quote {response.quoteId}
        </p>
        <h1 className="text-slate-950 mt-2 text-3xl font-bold">
          {isComplete ? "Response received" : "Confirm your response"}
        </h1>
        <p className="text-slate-600 mt-4">
          {isComplete
            ? `Your request to ${response.actionLabel} has already been recorded.`
            : `Please confirm that you want to ${response.actionLabel} for ${response.companyName}.`}
        </p>
        {!isComplete && (
          <Button
            className="mt-8"
            disabled={status === "submitting"}
            onClick={submit}
            type="button">
            {status === "submitting" ? "Submitting…" : "Confirm response"}
          </Button>
        )}
      </section>
    </main>
  );
}
