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
  { ssr: false, loading: () => <p className="text-sm text-muted">Loading…</p> },
);

export function AssistantLauncher() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open ? <AssistantPanel onClose={() => setOpen(false)} /> : null}
      <Button
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
