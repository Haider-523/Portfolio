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

  React.useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    enabledRef.current = fine && !reduced;
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !enabledRef.current) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <div
      ref={ref}
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
