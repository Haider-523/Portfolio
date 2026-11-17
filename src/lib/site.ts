/**
 * Canonical site URL — one place, used by metadata, sitemap, robots,
 * canonicals and the Open Graph image.
 *
 * Priority:
 *  1. NEXT_PUBLIC_SITE_URL — set this in Vercel's env vars to the live
 *     domain after deploy (e.g. https://haider-zaman-portfolio.vercel.app).
 *  2. Vercel's own VERCEL_PROJECT_PRODUCTION_URL / VERCEL_URL, so a
 *     deploy without the env var still gets a real absolute URL.
 *  3. http://localhost:3000 — local dev only.
 *
 * No domain is invented here: if neither the env var nor Vercel
 * provides one, metadata falls back to localhost and the build warns
 * about it, exactly as before.
 */
function clean(value: string | undefined): string | undefined {
  const v = value?.trim();
  return v ? v : undefined;
}

function withScheme(value: string): string {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

export const siteUrl: string =
  (clean(process.env.NEXT_PUBLIC_SITE_URL)
    ? withScheme(clean(process.env.NEXT_PUBLIC_SITE_URL) as string)
    : undefined) ??
  (clean(process.env.VERCEL_PROJECT_PRODUCTION_URL)
    ? withScheme(clean(process.env.VERCEL_PROJECT_PRODUCTION_URL) as string)
    : undefined) ??
  (clean(process.env.VERCEL_URL)
    ? withScheme(clean(process.env.VERCEL_URL) as string)
    : undefined) ??
  "http://localhost:3000";

/** Last content change, used as a fixed sitemap lastModified so
 * crawlers can tell what actually changed (a fresh `new Date()` on
 * every deploy made the signal useless). Update on content changes. */
export const LAST_MODIFIED = new Date("2026-11-17");
