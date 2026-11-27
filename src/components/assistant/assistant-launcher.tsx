"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { Bot, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * AI Assistant launcher — the only assistant code in the initial
 * page bundle is this small button. The full chat panel is loaded
 * on demand the first time the user opens it, so it costs nothing
 * on pages where it is never used.
 *
 * Robot only (27 Nov 2026, Haider's voice note): the button used
 * to show the robot plus the words "AI Assistant" — now it is just
 * the robot, bigger, in a circular button. The robot also looks
 * toward the cursor: its head tilts (3D rotateX/rotateY, max 20°)
 * in the cursor's direction, and the whole button drifts a few
 * pixels toward the pointer. Purely cosmetic; disabled for reduced
 * motion and while the panel is open.
 *
 * Both transforms target plain wrapper spans, NOT the Button
 * itself: the Button carries `transition-all`, which would damp
 * every per-frame transform update into near-invisibility
 * (verified live 27 Nov — the first drift version, transforming
 * the Button directly, did not move at all). The spans have no
 * transition, so the JS lerp controls the motion directly.
 */
const AssistantPanel = dynamic(
  () => import("@/components/assistant/assistant-panel"),
  {
    ssr: false,
    loading: () => (
      <p role="status" className="text-sm text-muted">
        Loading…
      </p>
    ),
  },
);

export function AssistantLauncher() {
  const [open, setOpen] = React.useState(false);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const wrapRef = React.useRef<HTMLSpanElement>(null);
  const iconRef = React.useRef<HTMLSpanElement>(null);

  // Cursor-follow: drift the launcher toward the pointer (capped
  // at 8px) and tilt the robot's head toward the pointer (max
  // 20°), so it looks in the cursor's direction. A lerp smooths
  // both.
  React.useEffect(() => {
    const wrap = wrapRef.current;
    const icon = iconRef.current;
    if (!wrap || !icon) return;
    if (open) {
      wrap.style.transform = "";
      icon.style.transform = "";
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let rx = 0;
    let ry = 0;
    let crx = 0;
    let cry = 0;
    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const strength = Math.min(8, Math.max(0, (500 - d) / 500) * 8);
      tx = (dx / d) * strength;
      ty = (dy / d) * strength;
      // Gaze: tilt the head toward the cursor, max 20°. Positive
      // dx (cursor right) turns the head right; negative dy
      // (cursor above) tilts it up.
      ry = Math.max(-20, Math.min(20, (dx / 200) * 20));
      rx = Math.max(-20, Math.min(20, (-dy / 200) * 20));
    };
    const tick = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      crx += (rx - crx) * 0.15;
      cry += (ry - cry) * 0.15;
      wrap.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
      icon.style.transform = `perspective(200px) rotateX(${crx.toFixed(2)}deg) rotateY(${cry.toFixed(2)}deg)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      wrap.style.transform = "";
      icon.style.transform = "";
    };
  }, [open ]);

  // Stable close handler: the panel closes on Escape and calls this;
  // focus returns to the launcher button.
  const close = React.useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open ? <AssistantPanel onClose={close} /> : null}
      <span ref={wrapRef} className="inline-block">
        <Button
          ref={buttonRef}
          size="lg"
          aria-label={open ? "Close assistant" : "Open AI assistant"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="h-14 w-14 rounded-full p-0 shadow-lg"
        >
          <span ref={iconRef} className="inline-flex">
            {open ? <X className="size-7" /> : <Bot className="size-7" />}
          </span>
        </Button>
      </span>
    </div>
  );
}
