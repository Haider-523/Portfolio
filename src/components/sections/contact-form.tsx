"use client";

import * as React from "react";
import { Send } from "lucide-react";
import { profile } from "@/data/portfolio";
import { Button } from "@/components/ui/button";

/**
 * Contact form — sends via POST /api/contact (server route), which
 * validates the input and forwards it to FormSubmit
 * (https://formsubmit.co), no account or API key needed. The form's
 * `action` is the standard FormSubmit URL, so it still works with
 * JavaScript disabled; with JS, submission is intercepted and sent
 * to the API route instead, so the page can show real sending /
 * sent / error states from the JSON response — a success message is
 * NEVER shown before the server confirms it.
 *
 * Why the server route: FormSubmit's AJAX endpoint with
 * `_captcha: "true"` returns an HTML captcha page instead of JSON,
 * so the old browser-side fetch could never succeed. The server
 * forwards with `_captcha: "false"` and relies on the honeypot +
 * validation + rate limit instead. The destination email is also no
 * longer in client-side code.
 *
 * ACTIVATION (honest limitation, also stated on the page): the FIRST
 * message triggers an activation email to haiderzaman.dev@gmail.com.
 * Haider must click the activation link in that email once; only
 * after that do messages arrive in his inbox. Until he activates,
 * messages do not arrive.
 */
const FORM_ACTION = "https://formsubmit.co/haiderzaman.dev@gmail.com";

// No-JS fallback: after FormSubmit's own captcha page, send the
// visitor back to the portfolio instead of FormSubmit's generic
// thank-you page. Only set when the public site URL is known.
const NEXT_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? `${process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")}/contact`
  : undefined;

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
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          subject: formData.get("subject"),
          message: formData.get("message"),
          company: formData.get("company"),
        }),
      });
      // The API route answers { ok: true } only when FormSubmit
      // confirmed delivery. Anything else is NOT a confirmed
      // delivery — show the error state instead.
      let ok = false;
      let serverError = "";
      try {
        const data = (await res.json()) as {
          ok?: unknown;
          error?: unknown;
        };
        ok = res.ok && data.ok === true;
        if (typeof data.error === "string") serverError = data.error;
      } catch {
        ok = false;
      }
      if (ok) {
        setStatus("sent");
      } else {
        setStatus("error");
        setErrorDetail(
          serverError ||
            "The message was not confirmed as delivered. Please try again or email Haider directly.",
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

      {/* FormSubmit configuration (no-JS fallback only — the JS path
          goes through /api/contact). _captcha stays on here because
          the fallback has no honeypot or server validation. */}
      <input
        type="hidden"
        name="_subject"
        value="New message from your portfolio"
      />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="true" />
      {NEXT_URL ? (
        <input type="hidden" name="_next" value={NEXT_URL} />
      ) : null}
      {/* Honeypot: off-screen, never filled by a human. The server
          rejects the submission if it has a value. */}
      <div aria-hidden="true" className="absolute -left-[9999px] opacity-0">
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          autoComplete="off"
          tabIndex={-1}
        />
      </div>

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
            maxLength={100}
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
          maxLength={120}
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
          maxLength={2000}
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
