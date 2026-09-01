import { Buffer } from "node:buffer";
import { randomUUID } from "node:crypto";

import { decodeProtectedHeader, EncryptJWT, jwtDecrypt } from "jose";
import { z } from "zod";

import { getEnv } from "#/env";

const ISSUER = "kappler-quotes";
const AUDIENCE = "quote-response";
const ALGORITHM = "dir";
const ENCRYPTION = "A256GCM";
const TOKEN_LIFETIME_SECONDS = 7 * 24 * 60 * 60;

export const quoteActions = ["cancel", "extend", "already_ordered"] as const;
export const quoteActionSchema = z.enum(quoteActions);
export type QuoteAction = z.infer<typeof quoteActionSchema>;

const normalizedEmailSchema = z.string().trim().toLowerCase().pipe(z.email());

export const quoteTokenClaimsSchema = z.object({
  v: z.literal(1),
  quoteId: z.string().regex(/^SQN\d+$/u),
  action: quoteActionSchema,
  returnEmail: normalizedEmailSchema,
  iat: z.number().int().nonnegative(),
  exp: z.number().int().positive(),
  jti: z.uuid(),
});

export type QuoteTokenClaims = z.infer<typeof quoteTokenClaimsSchema>;

export type TokenConfig = {
  key: Uint8Array;
  now?: Date;
};

function decodeKey(value: string) {
  return new Uint8Array(Buffer.from(value, "base64url"));
}

function getTokenConfig(): TokenConfig {
  const env = getEnv();
  return {
    key: decodeKey(env.QUOTE_JWT_ENCRYPTION_KEY),
  };
}

export async function createQuoteToken(
  input: Pick<QuoteTokenClaims, "quoteId" | "action" | "returnEmail">,
  config = getTokenConfig(),
) {
  const issuedAt = Math.floor((config.now ?? new Date()).getTime() / 1000);
  const claims = quoteTokenClaimsSchema.parse({
    ...input,
    returnEmail: normalizedEmailSchema.parse(input.returnEmail),
    v: 1,
    iat: issuedAt,
    exp: issuedAt + TOKEN_LIFETIME_SECONDS,
    jti: randomUUID(),
  });

  const token = await new EncryptJWT({
    v: claims.v,
    quoteId: claims.quoteId,
    action: claims.action,
    returnEmail: claims.returnEmail,
    jti: claims.jti,
  })
    .setProtectedHeader({ alg: ALGORITHM, enc: ENCRYPTION })
    .setIssuedAt(claims.iat)
    .setExpirationTime(claims.exp)
    .setIssuer(ISSUER)
    .setAudience(AUDIENCE)
    .encrypt(config.key);
  return token;
}

export async function verifyQuoteToken(token: string, config = getTokenConfig()) {
  const header = decodeProtectedHeader(token);
  if (header.alg !== ALGORITHM || header.enc !== ENCRYPTION) {
    throw new Error("Invalid quote token header");
  }

  const { payload, protectedHeader } = await jwtDecrypt(token, config.key, {
    issuer: ISSUER,
    audience: AUDIENCE,
    keyManagementAlgorithms: [ALGORITHM],
    contentEncryptionAlgorithms: [ENCRYPTION],
    currentDate: config.now,
  });

  if (protectedHeader.alg !== ALGORITHM || protectedHeader.enc !== ENCRYPTION) {
    throw new Error("Invalid quote token header");
  }

  return quoteTokenClaimsSchema.parse(payload);
}
