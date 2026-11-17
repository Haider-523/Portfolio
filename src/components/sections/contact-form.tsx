"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Button } from "@/components/ui/button";

/**
 * Contact form — sends via FormSubmit (https://formsubmit.co), no
 * account or API key needed. The form's `action` is the standard
 * FormSubmit URL (works even with JavaScript disabled); with JS,
 * submission is intercepted and sent to the AJAX endpoint instead,
 * so the page can show real sending / sent / error states from the
 * JSON response — a success message is NEVER shown before the
 * server confirms it.
 *
 * ACTIVATION (honest limitation, also stated on the page): the FIRST
 * message triggers an activation email to haiderzaman.dev@gmail.com.
 * Haider must click the activation link in that email once; only
 * after that do messages arrive in his inbox. Until he activates,
 * messages do not arrive.
 */
const FORM_ACTION = "https://formsubmit.co/haiderzaman.dev@gmail.com";
const FORM_AJAX_URL = "https://formsubmit.co/ajax/haiderzaman.dev@gmail.com";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorDetail, setErrorDetail] = React.useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setErrorDetail("");
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch(FORM_AJAX_URL, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      // FormSubmit's AJAX endpoint answers JSON { "success": "true" }.
      // Anything else (HTML captcha page, error page, non-JSON) is
      // NOT a confirmed delivery — show the error state instead.
      let ok = false;
      try {
        const data = (await res.json()) as { success?: unknown };
        ok = res.ok && data.success === "true";
      } catch {
        ok = false;
      }
      if (ok) {
        setStatus("sent");
      } else {
        setStatus("error");
        setErrorDetail(
          "FormSubmit did not confirm delivery. Please try again or email Haider directly.",
        );
      }
    } catch {
      setStatus("error");
      setErrorDetail(
        "The message could not be sent — please check your connection and try again, or email Haider directly.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-xl border border-border bg-surface p-6"
      >
        <p className="text-lg font-semibold text-foreground">Message sent.</p>
        <p className="mt-2 leading-relaxed text-muted">
          Haider will reply from {profile.email}. If this was the very
          first message sent through this form, he needs to click the
          activation link in his inbox once before messages arrive.
        </p>
        <Button
          variant="secondary"
          className="mt-5"
          onClick={() => setStatus("idle")}
        >
          Send another message
        </Button>
      </div>
    );
  }

  const inputClass =
    "h-11 w-full rounded-lg border border-border bg-background px-3 text-sm text-foreground outline-none placeholder:text-muted transition-colors focus:border-accent";

  return (
    <form
      action={FORM_ACTION}
      method="POST"
      onSubmit={onSubmit}
      className="rounded-xl border border-border bg-surface p-6 sm:p-8"
    >
      <h3 className="text-xl font-bold tracking-tight text-foreground">
        Send a message
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Ask a question or start a conversation — your message goes
        straight to Haider&apos;s email, {profile.email}.
      </p>
      <p className="mt-3 rounded-lg border border-border bg-background px-3 py-2 text-sm leading-relaxed text-muted">
        First-time setup: the first message triggers an activation
        email to Haider — he must click the activation link in that
        email once. Until he does, messages do not arrive in his inbox.
      </p>

      {/* FormSubmit configuration (no key needed). */}
      <input
        type="hidden"
        name="_subject"
        value="New message from your portfolio"
      />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="true" />

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-1.5 block text-sm font-medium text-foreground"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-subject"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Subject <span className="font-normal text-muted">(optional)</span>
        </label>
        <input
          id="contact-subject"
          name="subject"
          type="text"
          autoComplete="off"
          placeholder="What is this about?"
          className={inputClass}
        />
      </div>

      <div className="mt-5">
        <label
          htmlFor="contact-message"
          className="mb-1.5 block text-sm font-medium text-foreground"
        >
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder="Write your message…"
          className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none placeholder:text-muted transition-colors focus:border-accent"
        />
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-5 text-sm leading-relaxed text-foreground">
          {errorDetail}{" "}
          <a
            className="font-medium text-accent underline-offset-4 hover:underline"
            href={`mailto:${profile.email}`}
          >
            Email Haider directly
          </a>
          .
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        className="mt-6"
      >
        <Send />
        {status === "sending" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
