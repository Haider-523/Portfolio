/**
 * Best-effort per-IP rate limiting, in-memory.
 *
 * Honest limit: on Vercel serverless this state lives per function
 * instance, so it is a guard against casual abuse and accidental
 * quota burn (e.g. a bot hammering the paid Gemini endpoint), not a
 * hard guarantee. A hard guarantee would need an external store
 * (Upstash Ratelimit / Vercel WAF); that is overkill for this site.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

/** Returns true when `key` has exceeded `limit` requests in `windowMs`. */
export function rateLimited(
  key: string,
  limit: number,
  windowMs: number,
): boolean {
  // Bound memory: distinct IPs are unbounded in principle.
  if (buckets.size > 5000) buckets.clear();
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }
  if (bucket.count >= limit) return true;
  bucket.count += 1;
  return false;
}

/** First client IP from the proxy chain, or "unknown". */
export function clientIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}
