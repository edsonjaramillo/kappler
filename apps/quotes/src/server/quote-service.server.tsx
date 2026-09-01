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

const completedResponses = new Map<string, QuoteAction>();

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

export async function sendQuoteEmail(input: { quoteId: string; email: string }) {
  const quote = findQuote(input.quoteId);
  const email = destinationEmailSchema.parse(input.email);
  const env = getEnv();
  const responseEmail = destinationEmailSchema.parse(env.QUOTE_EMAIL_FROM);
  const [extend, alreadyOrdered, cancel] = await Promise.all([
    createResponseUrl(quote.id, "extend", responseEmail),
    createResponseUrl(quote.id, "already_ordered", responseEmail),
    createResponseUrl(quote.id, "cancel", responseEmail),
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
  const completedAction = completedResponses.get(quote.id);

  if (completedAction && completedAction !== claims.action) {
    throw new Error("Quote already has a different response");
  }

  return {
    quoteId: quote.id,
    companyName: quote.companyName,
    action: claims.action,
    actionLabel: actionLabels[claims.action],
    completed: completedAction === claims.action,
  };
}

async function sendResponseNotification(claims: QuoteTokenClaims) {
  const env = getEnv();
  const resend = new Resend(env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: env.QUOTE_EMAIL_FROM,
    to: "me@edsonjaramillo.com",
    subject: `Response received for quote ${claims.quoteId}`,
    text: `The response “${actionLabels[claims.action]}” was recorded for quote ${claims.quoteId}.`,
  });

  if (error) throw new Error(`Unable to send response notification: ${error.message}`);
}

export async function submitQuoteResponse(token: string) {
  const claims = await verifyQuoteToken(token);
  findQuote(claims.quoteId);

  const completedAction = completedResponses.get(claims.quoteId);
  if (completedAction) {
    if (completedAction !== claims.action)
      throw new Error("Quote already has a different response");
    return { status: "already-completed" as const, action: claims.action };
  }

  // This sample has no quote database. Keep the mutation idempotent for this server process.
  // Production should persist this transition atomically with the canonical quote record.
  completedResponses.set(claims.quoteId, claims.action);
  try {
    await sendResponseNotification(claims);
  } catch (error) {
    completedResponses.delete(claims.quoteId);
    throw error;
  }

  return { status: "success" as const, action: claims.action };
}
