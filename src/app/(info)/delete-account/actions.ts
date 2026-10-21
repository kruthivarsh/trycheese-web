"use server";

import { isIP } from "node:net";
import { headers } from "next/headers";
import type { DeleteError, DeleteState } from "./state";

// Forwards /delete-account requests to the trycheese API, server to server.
// TRYCHEESE_API_URL and TRYCHEESE_WEB_API_KEY are server-only and read only
// here; the browser never sees the key. Never log the email address or the
// code, and never put either in a URL, a cookie or storage.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type ApiReply = { status: number; code?: string; attemptsLeft?: number };

/**
 * The visitor's IP, which the API uses to rate-limit each visitor. It must come
 * from a header the host sets itself, never one the visitor can choose: Vercel
 * overwrites x-real-ip on every request. x-forwarded-for keeps whatever the
 * client sent as its first entry, so it is read only in local development
 * (where Next fills it from the socket). Self-hosting, or a CDN in front of
 * Vercel, needs a proxy that overwrites x-real-ip with the real visitor IP.
 */
function visitorIp(h: Pick<Headers, "get">): string | undefined {
  const dev = process.env.NODE_ENV === "development" ? h.get("x-forwarded-for")?.split(",")[0] : undefined;
  const raw = (h.get("x-real-ip") || dev || "").trim();
  return isIP(raw) ? raw : undefined;
}

/**
 * POSTs to /v1/account-deletion/{path}. Null when the key is missing, the
 * visitor IP is unknown (without it the API would count every visitor as one)
 * or the API can't be reached.
 */
async function callApi(path: "request-code" | "confirm", body: Record<string, string>): Promise<ApiReply | null> {
  const key = process.env.TRYCHEESE_WEB_API_KEY;
  if (!key) return null;
  const base = (process.env.TRYCHEESE_API_URL || "https://api.trycheese.app").replace(/\/+$/, "");
  const ip = visitorIp(await headers());
  if (!ip) return null;

  try {
    const res = await fetch(`${base}/v1/account-deletion/${path}`, {
      method: "POST",
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
      headers: { "content-type": "application/json", "x-web-key": key, "x-client-ip": ip },
      body: JSON.stringify(body),
    });
    let data: unknown = null;
    try {
      data = await res.json();
    } catch {
      // No JSON body: the status alone decides.
    }
    const d = data && typeof data === "object" ? (data as Record<string, unknown>) : {};
    return {
      status: res.status,
      code: typeof d.code === "string" ? d.code : undefined,
      attemptsLeft: typeof d.attemptsLeft === "number" ? d.attemptsLeft : undefined,
    };
  } catch {
    return null;
  }
}

/** 429 from the API: its global cap (try_later) reads as unavailable, the per-visitor limit as rate_limited. */
const limitError = (r: ApiReply): DeleteError => (r.code === "try_later" ? "unavailable" : "rate_limited");

/**
 * The /delete-account form. Everything it needs comes from the submitted form
 * (the step's fields and the submit button's intent), so it never reads the
 * previous state and works before the page hydrates.
 */
export async function deleteAccountAction(_prev: DeleteState, formData: FormData): Promise<DeleteState> {
  const intent = String(formData.get("intent") ?? "");
  if (intent === "restart") return { step: "email" };

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (email.length > 254 || !EMAIL_RE.test(email)) return { step: "email", error: "invalid_email" };

  if (intent === "request" || intent === "resend") {
    const onStep = (error: DeleteError): DeleteState =>
      intent === "resend" ? { step: "code", email, error } : { step: "email", error };
    const r = await callApi("request-code", { email });
    if (!r) return onStep("unavailable");
    if (r.status === 202) return { step: "code", email, resent: intent === "resend" };
    if (r.status === 400) return { step: "email", error: "invalid_email" };
    if (r.status === 429) return onStep(limitError(r));
    return onStep("unavailable");
  }

  if (intent === "confirm") {
    const code = String(formData.get("code") ?? "").replace(/\s/g, "");
    if (!/^\d{6}$/.test(code)) return { step: "code", email, error: "invalid_code" };
    const r = await callApi("confirm", { email, code });
    if (!r) return { step: "code", email, error: "unavailable" };
    if (r.status === 200) return { step: "done", email };
    if (r.status === 400) {
      if (r.code === "otp_invalid") return { step: "code", email, error: "otp_invalid", attemptsLeft: r.attemptsLeft };
      if (r.code === "otp_expired" || r.code === "otp_too_many_attempts") return { step: "code", email, error: r.code };
      return { step: "code", email, error: "invalid_code" };
    }
    if (r.status === 429) return { step: "code", email, error: limitError(r) };
    return { step: "code", email, error: "unavailable" };
  }

  return { step: "email" };
}
