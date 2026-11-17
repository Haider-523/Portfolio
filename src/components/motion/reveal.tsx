"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll reveal — no animation library, no JS bundle cost.
 *
 * Content is visible by default: the server-rendered HTML has no
 * hidden state at all, so the page reads instantly even before
 * hydration or if JavaScript fails. After mount, only content that
 * is still below the fold is briefly hidden (via a CSS class) and
 * revealed with a short 0.3s transition when it scrolls into view.
 * Above-the-fold content is never hidden. Delays are capped at
 * 0.12s so nothing ever waits long to appear. Reduced motion is
 * handled globally in globals.css (transitions collapse to ~0ms).
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = React.useState(false);
  const [visible, setVisible] = React.useState(true);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    // Only hide content that is still below the fold; anything the
    // user can already see stays visible with no animation at all.
    if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
      setHidden(true);
      setVisible(false);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      // While hidden below the fold the content is also hidden from
      // assistive tech; once revealed it is announced normally.
      aria-hidden={hidden && !visible ? true : undefined}
      style={{ transitionDelay: `${Math.min(Math.max(delay, 0), 0.12)}s` }}
      className={cn(
        "reveal",
        hidden && !visible && "reveal-hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Shared section heading: eyebrow, large navy title, teal rule, lede.
 * `level="h1"` is for the first heading of a page (About, Projects,
 * Experience, Contact); the home page already has its h1 in the hero.
 * The heading gets a stable `id` so its <section> can point at it
 * with aria-labelledby.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  level = "h2",
  id,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  level?: "h1" | "h2";
  id?: string;
}) {
  const headingId = id ?? `${slugify(title)}-heading`;
  const Heading = level;
  return (
    <Reveal>
      <p className="flex items-center gap-2 text-sm font-semibold tracking-wide text-navy uppercase">
        <span aria-hidden="true" className="inline-block size-2 bg-accent" />
        {eyebrow}
      </p>
      <Heading
        id={headingId}
        className="mt-3 text-4xl font-bold tracking-tight text-navy sm:text-5xl sm:leading-[1.1]"
      >
        {title}
      </Heading>
      <span
        aria-hidden="true"
        className="mt-5 block h-1 w-12 rounded-full bg-accent"
      />
      {description ? (
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}

/**
 * Shared section shell. `tone="surface"` renders a full-width #F9FAFB
 * band (bordered top and bottom) so pages get a clear visual rhythm
 * against the white body; `tone="soft"` leaves the body
 * background showing. Default is surface.
 */
export function Section({
  id,
  children,
  className,
  tone = "surface",
  labelledBy,
}: {
  id: string;
  children: React.ReactNode;
  className?: string;
  tone?: "surface" | "soft";
  /** id of the section's heading, for aria-labelledby. */
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        tone === "surface" && "border-y border-border bg-surface",
        className,
      )}
    >
      <div className="mx-auto max-w-5xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
        {children}
      </div>
    </section>
  );
}
