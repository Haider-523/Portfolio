"use client";

import * as React from "react";

/**
 * Typing code panel — Daim's portfolio has one in its hero (a code
 * editor that types itself out), and it is the single most engaging
 * thing on his page. Haider's hero stays as it is (recruiter-first,
 * photo, no entrance animation), so the panel lives on the About
 * page instead, where it does not displace anything approved.
 *
 * The snippet is a generic minimal-API endpoint in Haider's stack —
 * labelled as an example, not production code. Honesty rules:
 * - The server-rendered HTML contains the full code, so the panel is
 *   complete with JavaScript off and for crawlers.
 * - The typed text is aria-hidden; screen readers get the full code
 *   once, from the sr-only copy.
 * - With prefers-reduced-motion the typing never runs.
 * - It types once when scrolled into view, then stops — no loop.
 */
const CODE = `// Example endpoint — the shape of my backend work
var app = WebApplication.CreateBuilder(args).Build();

app.MapGet("/api/users/{id}", async (int id, AppDb db) =>
    await db.Users.FindAsync(id) is { } user
        ? Results.Ok(user)
        : Results.NotFound());

app.Run();`;

export function TypewriterCode() {
  const [text, setText] = React.useState(CODE);
  const [done, setDone] = React.useState(true);
  const ref = React.useRef<HTMLPreElement>(null);
  const started = React.useRef(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || started.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();
        setText("");
        setDone(false);
        let i = 0;
        const timer = window.setInterval(() => {
          i += 2;
          setText(CODE.slice(0, i));
          if (i >= CODE.length) {
            window.clearInterval(timer);
            setDone(true);
          }
        }, 16);
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-navy shadow-md">
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
        <span aria-hidden="true" className="size-2.5 rounded-full bg-white/25" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-white/25" />
        <span aria-hidden="true" className="size-2.5 rounded-full bg-white/25" />
        <span className="ml-2 font-mono text-xs text-white/60">
          example-endpoint.cs
        </span>
      </div>
      <pre
        ref={ref}
        className="overflow-x-auto p-5 font-mono text-sm leading-relaxed text-white/90"
      >
        <code aria-hidden="true">
          {text}
          {!done && (
            <span
              aria-hidden="true"
              className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-accent"
            />
          )}
        </code>
        <span className="sr-only">{CODE}</span>
      </pre>
    </div>
  );
}
