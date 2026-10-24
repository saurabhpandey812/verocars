import { NextResponse } from "next/server";
import { clearCustomerSession, loginCustomer, registerCustomer } from "@/server/auth";
import { validateEmailOnly, validateLogin, validateRegister } from "@/lib/validations/auth";

type Action = "login" | "register" | "forgot-password" | "logout";

export async function POST(req: Request, ctx: { params: Promise<{ action: string }> }) {
  const { action } = await ctx.params;
  const body = (await req.json().catch(() => null)) as Record<string, string> | null;
  if (!body && action !== "logout") {
    return NextResponse.json({ ok: false, message: "Invalid request." }, { status: 400 });
  }

  if (action === "logout") {
    await clearCustomerSession();
    return NextResponse.json({ ok: true, message: "Signed out.", redirect: "/" });
  }

  if (action === "register") {
    const v = {
      fullName: String(body?.fullName ?? ""),
      mobile: String(body?.mobile ?? ""),
      email: String(body?.email ?? ""),
      password: String(body?.password ?? ""),
      confirm: String(body?.confirm ?? body?.password ?? ""),
    };
    const errors = validateRegister(v);
    if (Object.keys(errors).length) {
      return NextResponse.json({ ok: false, message: Object.values(errors)[0], errors }, { status: 422 });
    }
    const result = await registerCustomer(v);
    if (!result.ok) return NextResponse.json({ ok: false, message: result.error }, { status: 400 });
    return NextResponse.json({ ok: true, message: "Account created.", redirect: "/account", user: result.user });
  }

  if (action === "login") {
    const v = {
      identifier: String(body?.identifier ?? ""),
      password: String(body?.password ?? ""),
    };
    const errors = validateLogin(v);
    if (Object.keys(errors).length) {
      return NextResponse.json({ ok: false, message: Object.values(errors)[0], errors }, { status: 422 });
    }
    const result = await loginCustomer(v);
    if (!result.ok) return NextResponse.json({ ok: false, message: result.error }, { status: 401 });
    return NextResponse.json({ ok: true, message: "Signed in.", redirect: "/account", user: result.user });
  }

  if (action === "forgot-password") {
    const email = String(body?.email ?? "");
    const errors = validateEmailOnly(email);
    if (Object.keys(errors).length) {
      return NextResponse.json({ ok: false, message: errors.email, errors }, { status: 422 });
    }
    // No email provider yet — acknowledge without leaking whether account exists
    return NextResponse.json({
      ok: true,
      message: "If an account exists for that email, password reset will be available soon. For now contact us on WhatsApp.",
    });
  }

  return NextResponse.json({ ok: false, message: `Unknown action: ${action as Action}` }, { status: 404 });
}
