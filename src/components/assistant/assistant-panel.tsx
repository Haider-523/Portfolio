"use client";

import * as React from "react";
import { Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ChatMessage = { role: "user" | "assistant"; text: string };

const SUGGESTED = [
  "What is Haider's CGPA?",
  "What projects has he built?",
  "What is his tech stack?",
  "How do I contact Haider?",
  "What is his experience?",
  "What certifications does Haider have?",
];

/**
 * Chat panel of the AI Portfolio Assistant — loaded on demand only
 * (see assistant-launcher.tsx), never in the initial page bundle.
 * Answers only from Haider's verified portfolio data (see
 * src/lib/assistant.ts). Anything else gets the refusal + contact
 * redirect. No key is involved on the client side.
 */
export default function AssistantPanel({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      role: "assistant",
      text: "Ask me about Haider's projects, skills, education, experience, or certifications — I answer only from his verified portfolio data.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const listRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, loading]);

  async function send(text: string) {
    const question = text.trim();
    if (!question || loading) return;
    setMessages((m) => [...m, { role: "user", text: question }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });
      const data = (await res.json()) as { answer?: string; error?: string };
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text:
            data.answer ??
            "Something went wrong. Please email Haider at haiderzaman.dev@gmail.com.",
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: "Something went wrong. Please email Haider at haiderzaman.dev@gmail.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      role="dialog"
      aria-label="AI Portfolio Assistant"
      className="flex h-[480px] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-lg"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <p className="text-sm font-semibold text-foreground">
            AI Portfolio Assistant
          </p>
          <p className="text-xs text-muted">
            Answers only from verified portfolio data
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Close assistant"
          onClick={onClose}
        >
          <X className="size-5" />
        </Button>
      </div>

      <div
        ref={listRef}
        className="flex-1 space-y-3 overflow-y-auto px-4 py-4"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={cn(
              "max-w-[85%] rounded-lg px-3 py-2 text-sm leading-relaxed",
              msg.role === "user"
                ? "ml-auto bg-accent text-on-accent"
                : "bg-background text-foreground",
            )}
          >
            <span className="whitespace-pre-wrap">{msg.text}</span>
          </div>
        ))}
        {loading ? <p className="text-sm text-muted">Thinking…</p> : null}
      </div>

      <div className="border-t border-border px-4 pt-3">
        <div className="flex flex-wrap gap-2">
          {SUGGESTED.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => send(q)}
              className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-medium text-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              {q}
            </button>
          ))}
        </div>
        <form
          className="flex items-center gap-2 py-3"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <label htmlFor="assistant-input" className="sr-only">
            Ask about Haider
          </label>
          <input
            id="assistant-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about Haider…"
            maxLength={500}
            className="h-10 flex-1 rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted focus:border-accent"
          />
          <Button type="submit" size="icon" aria-label="Send message">
            <Send className="size-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
