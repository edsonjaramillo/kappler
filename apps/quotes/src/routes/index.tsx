import { quotes } from "@repo/data/quotes";
import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { z } from "zod";

const sendQuoteSchema = z.object({
  quoteId: z.string().regex(/^SQN\d+$/u),
});

const sendQuote = createServerFn({ method: "POST" })
  .validator(sendQuoteSchema)
  .handler(async ({ data }) => {
    try {
      const { sendQuoteEmail } = await import("#/server/quote-service.server");
      const result = await sendQuoteEmail(data);
      return { ok: true as const, ...result };
    } catch (error) {
      const errorId = crypto.randomUUID();
      console.error(`[send-quote:${errorId}] Quote ${data.quoteId} could not be sent`, error);

      const message =
        error instanceof z.ZodError
          ? error.issues
              .map((issue) => `${issue.path.join(".") || "configuration"}: ${issue.message}`)
              .join("; ")
          : error instanceof Error
            ? error.message
            : "The server returned an unknown error";

      return { ok: false as const, errorId, message };
    }
  });

export const Route = createFileRoute("/")({ component: Home });

const currency = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });

function Home() {
  const sendQuoteFn = useServerFn(sendQuote);

  const handleSend = (quoteId: string) => {
    void sendQuoteFn({ data: { quoteId } });
  };

  return (
    <main className="bg-slate-100 text-slate-800 min-h-screen px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6">
          <h1 className="text-slate-950 text-2xl font-bold">Quotes</h1>
          <p className="text-slate-500 mt-1 text-sm">Review and send purchaser quotes.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {quotes.map((quote) => {
            const total = quote.lineItems.reduce(
              (sum, item) => sum + item.price * item.quantity,
              0,
            );
            return (
              <article key={quote.id} className="rounded-xl shadow-sm bg-white p-5">
                <div className="border-slate-200 flex items-start justify-between gap-4 border-b pb-4">
                  <div>
                    <h2 className="text-slate-950 text-lg font-bold">{quote.purchaserName}</h2>
                    <p className="text-slate-500 text-xs">{quote.id}</p>
                  </div>
                  <p className="text-slate-950 text-lg font-bold">{currency.format(total)}</p>
                </div>

                <ul className="divide-slate-100 divide-y">
                  {quote.lineItems.map((item) => (
                    <li key={item.product} className="flex justify-between gap-4 py-3 text-sm">
                      <div className="min-w-0">
                        <p className="text-slate-900 truncate font-medium">{item.description}</p>
                        <p className="text-slate-500 text-xs">
                          {item.product} · {item.quantity} × {currency.format(item.price)}
                        </p>
                      </div>
                      <p className="shrink-0 font-medium">
                        {currency.format(item.price * item.quantity)}
                      </p>
                    </li>
                  ))}
                </ul>

                <Button
                  className="mt-4"
                  onClick={() => {
                    handleSend(quote.id);
                  }}
                  type="button"
                  width="full">
                  Send email
                </Button>
              </article>
            );
          })}
        </div>
      </div>
    </main>
  );
}
