"use client";

import * as React from "react";

/**
 * Subtle 3D tilt on mouse move — the card follows the cursor by at
 * most 4 degrees, with a smooth 0.15s transition, and eases back to
 * flat on mouse leave. Desktop only (fine pointers); disabled when
 * the user prefers reduced motion. Nothing here needs a library.
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
  // Desktop only (fine pointers), and never when the user prefers
  // reduced motion. Computed once in the state initializer (not in
  // an effect — calling setState synchronously in an effect is a
  // lint error); it only gates whether mouse-move does anything,
  // it does not change the rendered output, so there is no
  // hydration mismatch.
  const [enabled] = React.useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [transform, setTransform] = React.useState<string | undefined>();

  function onMove(e: React.MouseEvent) {
    if (!enabled) return;
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
