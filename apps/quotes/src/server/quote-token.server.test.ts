import { describe, expect, test } from "bun:test";

import { createQuoteToken, type TokenConfig, verifyQuoteToken } from "./quote-token.server";

const now = new Date("2026-09-01T00:00:00.000Z");
const currentKey = new Uint8Array(32).fill(7);
const otherKey = new Uint8Array(32).fill(9);

const config: TokenConfig = {
  key: currentKey,
  now,
};

const input = {
  quoteId: "SQN0003001",
  action: "extend" as const,
  returnEmail: " Sales@Example.com ",
};

describe("encrypted quote tokens", () => {
  test("round trips valid claims and normalizes the email", async () => {
    const token = await createQuoteToken(input, config);
    const claims = await verifyQuoteToken(token, config);

    expect(claims.quoteId).toBe(input.quoteId);
    expect(claims.action).toBe(input.action);
    expect(claims.returnEmail).toBe("sales@example.com");
    expect(claims.v).toBe(1);
  });

  test("rejects a tampered token", async () => {
    const token = await createQuoteToken(input, config);
    const index = Math.floor(token.length / 2);
    const tampered = `${token.slice(0, index)}${token[index] === "a" ? "b" : "a"}${token.slice(index + 1)}`;

    expect(verifyQuoteToken(tampered, config)).rejects.toThrow();
  });

  test("rejects an expired token", async () => {
    const token = await createQuoteToken(input, config);
    const futureConfig = { ...config, now: new Date("2026-09-09T00:00:01.000Z") };

    expect(verifyQuoteToken(token, futureConfig)).rejects.toThrow();
  });

  test("rejects a token created with a different key", async () => {
    const token = await createQuoteToken(input, { key: otherKey, now });

    expect(verifyQuoteToken(token, config)).rejects.toThrow();
  });

  test("rejects invalid quote IDs and email claims before encryption", () => {
    expect(createQuoteToken({ ...input, quoteId: "not-a-quote" }, config)).rejects.toThrow();
    expect(createQuoteToken({ ...input, returnEmail: "not-an-email" }, config)).rejects.toThrow();
  });
});
