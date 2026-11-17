"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * Subtle 3D tilt — Haider asked for 3D tilt on the Projects,
 * Education and Certifications cards (2026-11-17).
 *
 * Deliberately restrained: max 6 degrees, transform/opacity only,
 * 0.2s ease-out, and only on fine-pointer devices (mouse/trackpad).
 * Touch devices and prefers-reduced-motion get a flat card — the
 * tilt is decoration, never the only way to read the content.
 * The card itself stays fully readable at every angle; nothing is
 * hidden until hover.
 */
export function Tilt({
  children,
  className,
  max = 6,
}: {
  children: React.ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const enabledRef = React.useRef(false);
  // Cached rect + rAF throttle: the old code called
  // getBoundingClientRect() and wrote style.transform on EVERY
  // mousemove while a 0.2s CSS transition was also running, so the
  // tilt lagged and rubber-banded behind the cursor. The rect is
  // cached on enter (cards do not move while hovered) and at most
  // one transform write happens per animation frame. While the
  // pointer moves, the transition is off so the card tracks the
  // cursor; on leave it comes back on for the snap-back.
  const rectRef = React.useRef<DOMRect | null>(null);
  const rafRef = React.useRef<number>(0);

  React.useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    enabledRef.current = fine && !reduced;
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onEnter = () => {
    rectRef.current = ref.current?.getBoundingClientRect() ?? null;
    if (ref.current) ref.current.style.transition = "transform 0s";
  };

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !enabledRef.current) return;
    const r = rectRef.current ?? el.getBoundingClientRect();
    rectRef.current = r;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      el.style.transform = transform;
    });
  };

  const onLeave = () => {
    cancelAnimationFrame(rafRef.current);
    if (ref.current) {
      ref.current.style.transition = "transform 0.2s ease-out";
      ref.current.style.transform = "";
    }
    rectRef.current = null;
  };

  return (
    <div
      ref={ref}
      onMouseEnter={onEnter}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{
        transformStyle: "preserve-3d",
        transition: "transform 0.2s ease-out",
      }}
      className={cn("tilt", className)}
    >
      {children}
    </div>
  );
}
