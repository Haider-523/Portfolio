import { NextResponse } from "next/server";
import { answerQuestion } from "@/lib/assistant";

/**
 * POST /api/assistant — AI Portfolio Assistant.
 * Body: { "message": string }. The answer comes only from the curated
 * knowledge base (see src/lib/assistant.ts); anything else is refused.
 * No key is ever accepted from or returned to the browser.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: 'Send a JSON body like { "message": "..." }.' },
      { status: 400 },
    );
  }
  const message =
    typeof body === "object" && body !== null
      ? (body as { message?: unknown }).message
      : undefined;
  if (typeof message !== "string" || message.trim().length === 0) {
    return NextResponse.json(
      { error: "message must be a non-empty string." },
      { status: 400 },
    );
  }
  if (message.length > 500) {
    return NextResponse.json(
      { error: "message must be 500 characters or fewer." },
      { status: 400 },
    );
  }

  const result = await answerQuestion(message.trim());
  return NextResponse.json(result);
}
