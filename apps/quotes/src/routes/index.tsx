import { zodResolver } from "@hookform/resolvers/zod";
import { exampleQuote } from "@repo/data/quotes";
import { Button } from "@repo/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn, useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const sendQuoteSchema = z.object({
  quoteId: z.string().regex(/^SQN\d+$/u),
  email: z.string().trim().toLowerCase().pipe(z.email("Enter a valid email address")),
});

type SendQuoteInput = z.infer<typeof sendQuoteSchema>;

const sendQuote = createServerFn({ method: "POST" })
  .validator(sendQuoteSchema)
  .handler(async ({ data }) => {
    console.info("[send-quote] Raw production environment configuration", {
      NODE_ENV: process.env.NODE_ENV,
      QUOTE_EMAIL_FROM: process.env.QUOTE_EMAIL_FROM,
      QUOTE_JWT_ENCRYPTION_KEY: process.env.QUOTE_JWT_ENCRYPTION_KEY,
      QUOTE_PUBLIC_APP_URL: process.env.QUOTE_PUBLIC_APP_URL,
      QUOTE_RESPONSE_EMAIL: process.env.QUOTE_RESPONSE_EMAIL,
      RESEND_API_KEY: process.env.RESEND_API_KEY,
      RESEND_BASE_URL: process.env.RESEND_BASE_URL,
    });

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
  const [result, setResult] = useState<
    { status: "idle" | "sent" } | { status: "error"; message: string; errorId?: string }
  >({ status: "idle" });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SendQuoteInput>({
    resolver: zodResolver(sendQuoteSchema),
    defaultValues: { quoteId: exampleQuote.id, email: exampleQuote.purchaserEmail },
  });

  const total = exampleQuote.lineItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const onSubmit = handleSubmit(async (data) => {
    setResult({ status: "idle" });
    try {
      const response = await sendQuoteFn({ data });
      setResult(
        response.ok
          ? { status: "sent" }
          : { status: "error", message: response.message, errorId: response.errorId },
      );
    } catch (error) {
      setResult({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "The request failed before the server returned a response",
      });
    }
  });

  return (
    <main className="bg-slate-100 text-slate-800 min-h-screen px-4 py-10">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_360px]">
        <section className="rounded-xl shadow-sm bg-white p-8">
          <div className="border-slate-200 flex flex-wrap items-start justify-between gap-4 border-b pb-6">
            <div>
              <p className="text-blue-700 text-sm font-bold tracking-wider uppercase">
                Quote {exampleQuote.id}
              </p>
              <h1 className="text-slate-950 mt-2 text-3xl font-bold">{exampleQuote.companyName}</h1>
              <p className="text-slate-500 mt-1 text-sm">
                Prepared for {exampleQuote.purchaserName} · Valid through{" "}
                {exampleQuote.validityDate}
              </p>
            </div>
            <p className="text-slate-950 text-2xl font-bold">{currency.format(total)}</p>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-slate-500 text-xs tracking-wide uppercase">
                <tr>
                  <th className="pb-3">Product</th>
                  <th className="pb-3 text-right">Qty</th>
                  <th className="pb-3 text-right">Price</th>
                  <th className="pb-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {exampleQuote.lineItems.map((item) => (
                  <tr key={item.product} className="border-slate-100 border-t">
                    <td className="py-4">
                      <span className="text-slate-900 font-semibold">{item.product}</span>
                      <span className="text-slate-500 block">{item.description}</span>
                    </td>
                    <td className="py-4 text-right">{item.quantity}</td>
                    <td className="py-4 text-right">{currency.format(item.price)}</td>
                    <td className="py-4 text-right font-semibold">
                      {currency.format(item.price * item.quantity)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="border-slate-200 text-slate-600 mt-6 border-t pt-6 text-sm">
            <p className="text-slate-900 font-semibold">Ship to</p>
            <p className="mt-1">
              {exampleQuote.shipToAddress.addressLine1}
              {exampleQuote.shipToAddress.addressLine2 === undefined
                ? ""
                : `, ${exampleQuote.shipToAddress.addressLine2}`}
              <br />
              {exampleQuote.shipToAddress.city}, {exampleQuote.shipToAddress.state}{" "}
              {exampleQuote.shipToAddress.postalCode}
            </p>
          </div>
        </section>

        <aside className="rounded-xl shadow-sm h-fit bg-white p-6">
          <h2 className="text-slate-950 text-xl font-bold">Send example quote</h2>
          <p className="text-slate-600 mt-2 text-sm leading-6">
            Enter the email address that should receive this quote and its secure response links.
          </p>
          <form className="mt-6" onSubmit={onSubmit} noValidate>
            <input type="hidden" {...register("quoteId")} />
            <label className="text-slate-800 text-sm font-semibold" htmlFor="email">
              Recipient email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
              className="rounded-md border-slate-300 focus:border-blue-600 focus:ring-blue-100 mt-2 w-full border px-3 py-2 outline-none focus:ring-2"
              {...register("email")}
            />
            {errors.email && <p className="text-red-600 mt-2 text-sm">{errors.email.message}</p>}
            <Button className="mt-5" disabled={isSubmitting} type="submit" width="full">
              {isSubmitting ? "Sending…" : "Send quote"}
            </Button>
            {result.status === "sent" && (
              <p className="text-green-700 mt-4 text-sm font-medium">Quote email sent.</p>
            )}
            {result.status === "error" && (
              <div className="text-red-700 mt-4 text-sm" role="alert">
                <p className="font-medium">The quote could not be sent: {result.message}</p>
                {result.errorId !== undefined && (
                  <p className="mt-1 text-xs">
                    Error reference: <code>{result.errorId}</code>
                  </p>
                )}
              </div>
            )}
          </form>
        </aside>
      </div>
    </main>
  );
}
