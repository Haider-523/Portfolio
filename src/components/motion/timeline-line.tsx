"use client";

import * as React from "react";

/**
 * Scroll-driven fill line — for the Experience roles timeline ONLY.
 *
 * The old site-wide ScrollRail (a fixed left-edge line on every page,
 * driven by whole-page scroll progress) is gone: the effect belongs
 * on this one timeline, not on the whole site. This component renders
 * inside a `relative` wrapper around the timeline <ol> and fills the
 * line from top to bottom as the timeline scrolls through the
 * viewport — filling starts when the timeline top reaches 80% of the
 * viewport height and completes when its top has scrolled a full
 * timeline height past that line. Scrolling back up drains it again.
 * rAF-throttled scroll listener, transform scaleY only (no layout
 * work). Reduced motion: the line renders full, with no animation.
 */
export function TimelineLine() {
  const fillRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = fillRef.current;
    if (!el) return;
    const list = el.parentElement;
    if (!list) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transform = "scaleY(1)";
      return;
    }
    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = list.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(
        Math.max((vh * 0.8 - rect.top) / rect.height, 0),
        1,
      );
      el.style.transform = `scaleY(${p})`;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      ref={fillRef}
      className="absolute left-0 top-0 h-full w-[2px] origin-top bg-accent"
      style={{ transform: "scaleY(0)" }}
    />
  );
}
