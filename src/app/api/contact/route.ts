import { NextResponse } from "next/server";
import { clientIp, rateLimited } from "@/lib/rate-limit";

/**
 * POST /api/contact — contact form, server-side.
 *
 * Why this exists instead of posting straight to FormSubmit from the
 * browser:
 *  1. Validation: name/email/message are checked here. Browser
 *     `required`/`type="email"` alone is bypassable with a crafted
 *     POST; FormSubmit would still accept it.
 *  2. Captcha: FormSubmit's AJAX endpoint with `_captcha: "true"`
 *     returns an HTML captcha page instead of JSON, so the old
 *     browser-side fetch could never succeed — every JS submit hit
 *     the error state. The server forwards with `_captcha: "false"`
 *     and relies on the honeypot + validation + rate limit instead.
 *  3. The destination email is no longer in client-side code.
 *
 * Body: { "name", "email", "message", "subject"?, "company"? }.
 * `company` is the honeypot: a filled value means bot — return a
 * fake success without sending, so bots learn nothing.
 *
 * ACTIVATION (honest limitation): the FIRST message triggers an
 * activation email to Haider; he must click it once before any
 * message arrives in his inbox.
 */
const FORM_AJAX_URL =
  "https://formsubmit.co/ajax/haiderzaman.dev@gmail.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  if (rateLimited(`contact:${clientIp(request)}`, 5, 60_000)) {
    return NextResponse.json(
      { error: "Too many messages — please wait a minute and try again." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Send a JSON body." },
      { status: 400 },
    );
  }
  const b = (body ?? {}) as Record<string, unknown>;

  // Honeypot filled: pretend success, send nothing.
  if (typeof b.company === "string" && b.company.trim().length > 0) {
    return NextResponse.json({ ok: true });
  }

  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const subject =
    typeof b.subject === "string" ? b.subject.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";

  if (name.length < 2 || name.length > 100) {
    return NextResponse.json(
      { error: "Name must be 2–100 characters." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 },
    );
  }
  if (subject.length > 120) {
    return NextResponse.json(
      { error: "Subject must be 120 characters or fewer." },
      { status: 400 },
    );
  }
  if (message.length < 10 || message.length > 2000) {
    return NextResponse.json(
      { error: "Message must be 10–2000 characters." },
      { status: 400 },
    );
  }

  const form = new FormData();
  form.append("name", name);
  form.append("email", email);
  form.append("subject", subject || "New message from your portfolio");
  form.append("message", message);
  form.append("_subject", "New message from your portfolio");
  form.append("_template", "table");
  form.append("_captcha", "false");

  try {
    const res = await fetch(FORM_AJAX_URL, {
      method: "POST",
      headers: { Accept: "application/json" },
      body: form,
      // Fail fast instead of hanging if FormSubmit is slow: the
      // visitor gets a real error state, not an endless spinner.
      signal: AbortSignal.timeout(15_000),
    });
    let ok = false;
    try {
      const data = (await res.json()) as { success?: unknown };
      ok = res.ok && data.success === "true";
    } catch {
      ok = false;
    }
    if (!ok) {
      return NextResponse.json(
        { error: "FormSubmit did not confirm delivery." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "The message could not be sent — please try again." },
      { status: 502 },
    );
  }
}
