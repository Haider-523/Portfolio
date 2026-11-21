"use client";

import * as React from "react";

/**
 * Count-up number for the proof strip.
 *
 * Daim's portfolio animates its counters too — but a screenshot taken
 * mid-animation reads a wrong number (495+ / 3.84 seen live), because
 * the settled value only exists after the animation. This version
 * avoids that trap three ways:
 * - The server-rendered HTML always contains the exact final value,
 *   so the number is correct with JavaScript off and for crawlers.
 * - The animation ends exactly on the final value (ease-out, 800ms).
 * - Screen readers get the final value only (aria-hidden animated
 *   text + sr-only final value).
 * With prefers-reduced-motion the animation never runs: the final
 * value just stays.
 */
export function CountUp({ value }: { value: string }) {
  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? 2 : 0;

  const [display, setDisplay] = React.useState(value);
  const ref = React.useRef<HTMLSpanElement>(null);
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
        const duration = 800;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(
            (target * eased).toFixed(decimals) + suffix,
          );
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, decimals]);

  return (
    <span ref={ref}>
      <span aria-hidden="true">{display}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
