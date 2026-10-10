// production builds strip the message of a server error before it reaches the
// error boundary, but keep its digest — so the digest is what marks a 429
export const RATE_LIMIT_DIGEST = "RATE_LIMITED";

export class RateLimitError extends Error {
  digest = RATE_LIMIT_DIGEST;

  constructor(source: string) {
    super(`429: Too many requests — ${source}`);
    this.name = "RateLimitError";
  }
}

export function isRateLimitError(error: { message?: string; digest?: string }) {
  return error.digest === RATE_LIMIT_DIGEST || !!error.message?.includes("429");
}
