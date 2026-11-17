"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * AI Assistant launcher — the only assistant code in the initial
 * page bundle is this small button. The full chat panel is loaded
 * on demand the first time the user opens it, so it costs nothing
 * on pages where it is never used.
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

  // Stable close handler: the panel closes on Escape and calls this;
  // focus returns to the launcher button.
  const close = React.useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open ? <AssistantPanel onClose={close} /> : null}
      <Button
        ref={buttonRef}
        size="lg"
        aria-label={open ? "Close assistant" : "Open AI assistant"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="h-12 rounded-full px-5 shadow-lg"
      >
        {open ? <X className="size-5" /> : <MessageCircle className="size-5" />}
        AI Assistant
      </Button>
    </div>
  );
}
