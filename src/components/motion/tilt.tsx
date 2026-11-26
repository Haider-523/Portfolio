"use client";

import * as React from "react";

/**
 * Subtle 3D tilt on mouse move — the card follows the cursor by at
 * most 4 degrees, with a smooth 0.15s transition, and eases back to
 * flat on mouse leave. Desktop only (fine pointers); disabled when
 * the user prefers reduced motion. Nothing here needs a library.
 *
 * The pointer/reduced-motion check runs inside the mouse handler,
 * not in state: the first version stored it in state via an effect
 * (a lint error), the second via a state initializer — but the
 * initializer runs during SSR where `window` is undefined, so it
 * always returned false and the tilt never activated (caught by a
 * live visual check, 26 Nov). Reading matchMedia in the handler
 * is always correct and cheap.
 *
 * History: a 3D tilt was on the project cards (added 17 Nov 2026),
 * then removed (23 Nov, voice-note feedback: "keep it static").
 * Haider asked again on 26 Nov for visible 3D/animation across
 * the portfolio, so it is back — gentler (4deg, was ~8deg) and
 * only on the project cards, where the tilt reads as depth rather
 * than decoration.
 */
export function Tilt({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = React.useState<string | undefined>();

  function isEnabled(): boolean {
    if (typeof window === "undefined") return false;
    return (
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function onMove(e: React.MouseEvent) {
    if (!isEnabled()) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTransform(
      `perspective(1000px) rotateX(${(-py * 4).toFixed(2)}deg) rotateY(${(px * 4).toFixed(2)}deg)`,
    );
  }

  function onLeave() {
    setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg)");
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      // A short transition keeps the tilt smooth (it eases toward
      // the cursor and back to flat) without feeling laggy.
      style={{ transform, transition: "transform 0.15s ease-out" }}
      className={className}
    >
      {children}
    </div>
  );
}
