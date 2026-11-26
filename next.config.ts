import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // The hero photo is served at quality 70 (see hero.tsx); Next 16
    // only allows quality 75 by default, so 70 must be listed here
    // or the optimiser returns 400.
    qualities: [70, 75],
    // AVIF first: ~30–40% smaller than the JPEG the optimiser
    // served before (hero 95KB JPEG → ~60KB AVIF), WebP fallback.
    formats: ["image/avif", "image/webp"],
  },
  // No "x-powered-by: Next.js" header — standard hygiene.
  poweredByHeader: false,
  /**
   * Legacy standalone routes (recruiter review 2026-11-26): Skills,
   * Education and Certifications were consolidated into /about, so
   * the old paths 404. 308 permanent redirects send them (and any
   * old link/bookmark) to the matching section anchor. `permanent:
   * true` is the 308 status (docs: dist/docs/.../redirects.md).
   */
  async redirects() {
    return [
      { source: "/skills", destination: "/about#skills", permanent: true },
      {
        source: "/education",
        destination: "/about#education",
        permanent: true,
      },
      {
        source: "/certifications",
        destination: "/about#certifications",
        permanent: true,
      },
    ];
  },
  /**
   * /resume.pdf root alias (recruiter review 2026-11-26): recruiters
   * type domain.com/resume.pdf by hand, but the file lives at
   * /documents/HZ-Resume.pdf. A rewrite (not a redirect) serves the
   * PDF while the URL stays /resume.pdf.
   */
  async rewrites() {
    return [
      { source: "/resume.pdf", destination: "/documents/HZ-Resume.pdf" },
    ];
  },
  /**
   * Security headers (audit 2026-11-17: the site shipped none).
   * CSP is deliberately Next-compatible: 'unsafe-inline' for scripts
   * and styles because Next's hydration uses inline scripts; the
   * form posts to FormSubmit (form-action) and fonts come from
   * Google Fonts. No framing, no MIME sniffing, no camera/mic/geo.
   * HSTS is set here too so it holds on any host, not just Vercel.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data:",
              "connect-src 'self'",
              "form-action 'self' https://formsubmit.co",
              "frame-ancestors 'none'",
              "base-uri 'self'",
            ].join("; "),
          },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
  experimental: {
    // lucide-react: import only the icons actually used (verified:
    // no whole-library chunk remains in the build output).
    optimizePackageImports: ["lucide-react"],
    // Router-cache lifetimes for prefetched pages: static pages stay
    // cached 5 minutes, so back/forward and repeat navigation is
    // instant without a new request; dynamic routes 30s.
    staleTimes: { dynamic: 30, static: 300 },
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
