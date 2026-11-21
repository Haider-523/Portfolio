"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/portfolio";

/**
 * FAQ accordion — exactly ONE answer open at a time. Opening a
 * question closes whichever one was open before it, so the page
 * never shows two answers at once. The same `faqs` data drives
 * the FAQ JSON-LD on the Contact page, so the two cannot drift
 * apart.
 */
export function FaqAccordion() {
  const [open, setOpen] = React.useState<number | null>(null);

  return (
    <div className="mt-6 space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = open === i;
        return (
          <div
            key={faq.question}
            className="rounded-xl border border-border bg-surface transition-colors duration-200 hover:border-accent/60"
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${i}`}
              className="flex w-full items-center justify-between gap-4 p-5 text-left font-medium text-foreground transition-colors hover:text-accent"
            >
              {faq.question}
              <ChevronDown
                aria-hidden="true"
                className={`size-5 shrink-0 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              id={`faq-panel-${i}`}
              className={`grid transition-all duration-200 ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
