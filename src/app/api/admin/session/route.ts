import { NextResponse } from "next/server";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE,
  checkPassword,
  createSessionToken,
  isAdminEnabled,
  isAuthorized,
} from "@/lib/admin/auth";

/** GET: am I signed in? POST: sign in. DELETE: sign out. */

export async function GET(request: Request) {
  return Response.json({ enabled: isAdminEnabled(), signedIn: isAuthorized(request) });
}

export async function POST(request: Request) {
  if (!isAdminEnabled()) {
    return Response.json({ error: "Admin is not configured (ADMIN_PASSWORD is missing)." }, { status: 503 });
  }
  const body = (await request.json().catch(() => null)) as { password?: unknown } | null;
  const password = typeof body?.password === "string" ? body.password : "";

  if (!checkPassword(password)) {
    // Slow down guessing.
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return Response.json({ error: "Wrong password" }, { status: 401 });
  }

  const response = NextResponse.json({ signedIn: true });
  response.cookies.set(SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ signedIn: false });
  response.cookies.delete(SESSION_COOKIE);
  return response;
}
