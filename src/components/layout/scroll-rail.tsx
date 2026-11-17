"use client";

import * as React from "react";

/**
 * Scroll rail — the fancy line on the left edge of the page.
 * A thin emerald line fills from top to bottom as the visitor
 * scrolls (scroll progress, driven by rAF-throttled scroll events,
 * transform scaleY only — no layout work). A glowing dot rides at
 * the tip of the fill. Desktop only (hidden below lg) so it never
 * eats mobile width; aria-hidden, purely decorative.
 */
export function ScrollRail() {
  const fillRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const el = fillRef.current;
      if (!el) return;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const p =
        max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0;
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
      className="pointer-events-none fixed inset-y-0 left-0 z-30 hidden lg:block"
    >
      <div className="absolute inset-y-0 left-0 w-px bg-border" />
      <div
        ref={fillRef}
        className="absolute inset-y-0 left-0 w-[3px] origin-top bg-gradient-to-b from-accent via-accent to-accent-hover shadow-[0_0_12px_rgba(4,120,87,0.55)] dark:shadow-[0_0_12px_rgba(52,211,153,0.55)]"
        style={{ transform: "scaleY(0)" }}
      >
        <span className="absolute -bottom-1 -left-[3px] size-2.5 rounded-full bg-accent ring-4 ring-accent/20" />
      </div>
    </div>
  );
}
