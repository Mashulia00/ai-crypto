import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const THREE_DAYS = 60 * 60 * 24 * 3;

export async function POST() {
  const now = new Date();
  const expires = new Date(now.getTime() + THREE_DAYS * 1000);
  const secure = process.env.NODE_ENV === "production";

  // Створюємо відповідь і ставимо кукі НА відповіді
  const res = NextResponse.json({ ok: true, expires: expires.toISOString() });

  res.cookies.set("trial_active", "1", {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: THREE_DAYS,
    expires,
  });

  res.cookies.set("trial_expires", String(expires.getTime()), {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: THREE_DAYS,
    expires,
  });

  return res;
}

export async function GET() {
  // Читання: треба чекати cookies()
  const store = await cookies();
  const c = store.get("trial_active");
  const exp = store.get("trial_expires");

  return NextResponse.json({
    active: Boolean(c),
    expires: exp?.value ? new Date(Number(exp.value)).toISOString() : null,
  });
}
