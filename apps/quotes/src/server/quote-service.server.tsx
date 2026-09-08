import { quotes } from "@repo/data/quotes";
import QuoteEmail from "@repo/email/quote-email";
import { Resend } from "resend";
import { z } from "zod";

import { getEnv } from "#/env";
import {
  createQuoteToken,
  type QuoteAction,
  type QuoteTokenClaims,
  verifyQuoteToken,
} from "#/server/quote-token.server";

const destinationEmailSchema = z.string().trim().toLowerCase().pipe(z.email());

const actionLabels: Record<QuoteAction, string> = {
  extend: "extend this quote",
  already_ordered: "mark this quote as already ordered",
  cancel: "close this quote",
};

function findQuote(quoteId: string) {
  const quote = quotes.find(({ id }) => id === quoteId);
  if (!quote) throw new Error("Quote not found");
  return quote;
}

async function createResponseUrl(quoteId: string, action: QuoteAction, returnEmail: string) {
  const token = await createQuoteToken({ quoteId, action, returnEmail });
  const url = new URL("/respond", getEnv().QUOTE_PUBLIC_APP_URL);
  url.searchParams.set("token", token);
  return url.toString();
}

export async function sendQuoteEmail(input: { quoteId: string }) {
  const quote = findQuote(input.quoteId);
  const email = destinationEmailSchema.parse(quote.purchaserEmail);
  const env = getEnv();
  const [extend, alreadyOrdered, cancel] = await Promise.all([
    createResponseUrl(quote.id, "extend", email),
    createResponseUrl(quote.id, "already_ordered", email),
    createResponseUrl(quote.id, "cancel", email),
  ]);

  const resend = new Resend(env.RESEND_API_KEY);
  const { data, error } = await resend.emails.send({
    from: env.QUOTE_EMAIL_FROM,
    to: email,
    subject: `Quote ${quote.id} from ${quote.companyName}`,
    react: <QuoteEmail quote={quote} actionUrls={{ extend, alreadyOrdered, cancel }} />,
  });

  if (error) throw new Error(`Unable to send quote email: ${error.message}`);
  return { id: data?.id ?? null };
}

export async function getQuoteResponse(token: string) {
  const claims = await verifyQuoteToken(token);
  const quote = findQuote(claims.quoteId);
  return {
    quoteId: quote.id,
    companyName: quote.companyName,
    action: claims.action,
    actionLabel: actionLabels[claims.action],
  };
}

async function sendResponseNotification(claims: QuoteTokenClaims) {
  const env = getEnv();
  const resend = new Resend(env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: env.QUOTE_EMAIL_FROM,
    to: "me@edsonjaramillo.com",
    subject: `Response received for quote ${claims.quoteId}`,
    text: `The response “${actionLabels[claims.action]}” was recorded for quote ${claims.quoteId}. The quote was originally sent to ${claims.returnEmail}.`,
  });

  if (error) throw new Error(`Unable to send response notification: ${error.message}`);
}

export async function submitQuoteResponse(token: string) {
  const claims = await verifyQuoteToken(token);
  findQuote(claims.quoteId);
  await sendResponseNotification(claims);

  return { status: "success" as const, action: claims.action };
}
