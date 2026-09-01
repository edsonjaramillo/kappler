import { Buffer } from "node:buffer";

import { z } from "zod";

function isValidEncodedKey(value: string) {
  if (!/^[A-Za-z0-9+/_-]*={0,2}$/u.test(value)) return false;

  const unpaddedValue = value.replace(/=+$/u, "");
  if (unpaddedValue.length % 4 === 1) return false;

  const normalizedValue = unpaddedValue.replaceAll("+", "-").replaceAll("/", "_");
  return Buffer.from(value, "base64url").toString("base64url") === normalizedValue;
}

const encodedEncryptionKeySchema = z
  .string()
  .refine(isValidEncodedKey, "QUOTE_JWT_ENCRYPTION_KEY must be a valid base64 or base64url value")
  .refine(
    (value) => Buffer.from(value, "base64url").byteLength === 32,
    "QUOTE_JWT_ENCRYPTION_KEY must decode to exactly 32 bytes (256 bits)",
  );

export const envSchema = z.object({
  RESEND_API_KEY: z.string().startsWith("re_"),
  QUOTE_JWT_ENCRYPTION_KEY: encodedEncryptionKeySchema,
});

export const env = envSchema.parse(process.env);
