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
 * Icon + movement (26 Nov 2026, Agentware-inspired): the generic
 * chat bubble is now a robot (Bot) — the assistant reads as an
 * agent, not a chat box — and the launcher drifts a few pixels
 * toward the pointer, easing back, so it feels alive. Purely
 * cosmetic; disabled for reduced motion and while the panel is open.
 *
 * The drift is applied to a plain wrapper span, NOT to the Button
 * itself: the Button carries `transition-all`, which would damp
 * every per-frame transform update into near-invisibility
 * (verified live 27 Nov — the first version, transforming the
 * Button directly, did not move at all). The wrapper has no
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

  // Cursor-follow: drift the launcher toward the pointer, capped
  // at 8px, stronger when the pointer is near. A lerp smooths it.
  React.useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (open) {
      wrap.style.transform = "";
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
    const onMove = (e: MouseEvent) => {
      const r = wrap.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const d = Math.hypot(dx, dy) || 1;
      const strength = Math.min(8, Math.max(0, (500 - d) / 500) * 8);
      tx = (dx / d) * strength;
      ty = (dy / d) * strength;
    };
    const tick = () => {
      cx += (tx - cx) * 0.15;
      cy += (ty - cy) * 0.15;
      wrap.style.transform = `translate(${cx.toFixed(2)}px, ${cy.toFixed(2)}px)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      wrap.style.transform = "";
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
          className="h-12 rounded-full px-5 shadow-lg"
        >
          {open ? <X className="size-5" /> : <Bot className="size-5" />}
          <span
            aria-hidden="true"
            className="inline-block size-2 animate-pulse rounded-full bg-lime"
          />
          AI Assistant
        </Button>
      </span>
    </div>
  );
}
