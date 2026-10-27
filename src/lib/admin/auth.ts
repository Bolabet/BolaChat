import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Minimal single-password auth for /admin. The session is a signed cookie
 * ("<expiry>.<hmac>") - no database needed. Set ADMIN_PASSWORD (and ideally
 * ADMIN_SESSION_SECRET) in the hosting environment; without ADMIN_PASSWORD
 * the admin API refuses every request.
 */

export const SESSION_COOKIE = "bolachat_admin";
export const SESSION_MAX_AGE = 60 * 60 * 12; // 12 hours

function secret(): string | undefined {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD;
}

export function isAdminEnabled(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function sign(value: string, key: string): string {
  return createHmac("sha256", key).update(value).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  return left.length === right.length && timingSafeEqual(left, right);
}

export function checkPassword(candidate: string): boolean {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return false;
  // Compare digests so the comparison is constant-time regardless of length.
  return safeEqual(sign(candidate, "pw"), sign(password, "pw"));
}

export function createSessionToken(): string {
  const key = secret();
  if (!key) throw new Error("Admin is not configured");
  const expires = String(Date.now() + SESSION_MAX_AGE * 1000);
  return `${expires}.${sign(expires, key)}`;
}

export function isValidSessionToken(token: string | undefined): boolean {
  const key = secret();
  if (!key || !token || !isAdminEnabled()) return false;
  const [expires, signature] = token.split(".");
  if (!expires || !signature) return false;
  if (!safeEqual(signature, sign(expires, key))) return false;
  return Number(expires) > Date.now();
}

/** Reads and verifies the session cookie from an incoming request. */
export function isAuthorized(request: Request): boolean {
  const cookie = request.headers.get("cookie") ?? "";
  const match = cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE}=`));
  return isValidSessionToken(match?.slice(SESSION_COOKIE.length + 1));
}

export function unauthorized(): Response {
  return Response.json({ error: "Not signed in" }, { status: 401 });
}
