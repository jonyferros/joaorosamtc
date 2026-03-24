import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/contact
//
// Receives a contact form submission, validates all required fields
// server-side (even though the client also validates), then sends an email
// via Resend to info@joaorosamtc.com.
//
// Security notes:
//  - API key is read from process.env — NEVER hardcoded.
//  - Raw errors are never forwarded to the client (only a generic message).
//  - Input is trimmed and length-capped before use.
// ─────────────────────────────────────────────────────────────────────────────

// Maximum character limits — prevent oversized payloads
const MAX_NAME = 200;
const MAX_EMAIL = 254; // RFC 5321 limit
const MAX_SUBJECT = 300;
const MAX_MESSAGE = 5000;

// Simple email format check (defence-in-depth alongside client validation)
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: NextRequest) {
  // ── Parse request body ────────────────────────────────────────────
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 }
    );
  }

  // ── Extract and sanitise fields ───────────────────────────────────
  const name = String(body.name ?? "").trim().slice(0, MAX_NAME);
  const email = String(body.email ?? "").trim().slice(0, MAX_EMAIL);
  const subject = String(body.subject ?? "").trim().slice(0, MAX_SUBJECT);
  const message = String(body.message ?? "").trim().slice(0, MAX_MESSAGE);

  // ── Server-side validation ────────────────────────────────────────
  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 422 });
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 422 }
    );
  }
  if (!message) {
    return NextResponse.json(
      { error: "Message is required." },
      { status: 422 }
    );
  }

  // ── Read API key from environment (never hardcode) ────────────────
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Log internally but don't expose configuration details to the client
    console.error("[contact] RESEND_API_KEY is not set in environment.");
    return NextResponse.json(
      { error: "Mail service is temporarily unavailable." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);

  // ── Send email ────────────────────────────────────────────────────
  try {
    await resend.emails.send({
      from: "João Rosa MTC Website <onboarding@resend.dev>", // update to verified domain after DNS setup
      to: "info@joaorosamtc.com",
      replyTo: email,
      subject: subject
        ? `[joaorosamtc.com] ${subject}`
        : "[joaorosamtc.com] New contact form message",
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || "—"}\n\n${message}`,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    // Log the real error server-side for debugging; never send it to the client
    console.error("[contact] Resend send error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
