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
