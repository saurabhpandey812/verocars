import "server-only";
import { cookies } from "next/headers";
import { env } from "@/config";
import type { User } from "@/types/user";
import type { Customer } from "@/types/customer";
import { CUSTOMER_COOKIE, signCustomerToken, verifyCustomerToken } from "@/lib/auth/token";
import { connectDB } from "./mongo";
import { CustomerModel } from "./models/customer";

function strip(doc: Record<string, unknown>): Customer {
  return {
    id: String(doc.id ?? ""),
    fullName: String(doc.fullName ?? ""),
    mobile: String(doc.mobile ?? ""),
    email: String(doc.email ?? "").toLowerCase(),
    password: String(doc.password ?? ""),
    createdAt: String(doc.createdAt ?? ""),
    demo: Boolean(doc.demo),
  };
}

function toUser(c: Customer): User {
  return {
    id: c.id,
    fullName: c.fullName,
    mobile: c.mobile,
    email: c.email,
    role: "customer",
    createdAt: c.createdAt,
  };
}

export async function setCustomerSession(userId: string) {
  const token = await signCustomerToken(userId);
  (await cookies()).set(CUSTOMER_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: env.isProd,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearCustomerSession() {
  (await cookies()).delete(CUSTOMER_COOKIE);
}

export async function getSessionCustomer(): Promise<Customer | null> {
  const token = (await cookies()).get(CUSTOMER_COOKIE)?.value;
  const userId = await verifyCustomerToken(token);
  if (!userId) return null;
  try {
    await connectDB();
    const doc = await CustomerModel.findOne({ id: userId }).lean();
    if (!doc) return null;
    return strip(doc as Record<string, unknown>);
  } catch (err) {
    console.error("[auth] getSessionCustomer:", err);
    return null;
  }
}

export async function registerCustomer(input: {
  fullName: string;
  mobile: string;
  email: string;
  password: string;
}): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  try {
    await connectDB();
    const email = input.email.trim().toLowerCase();
    const mobile = input.mobile.trim();
    const existing = await CustomerModel.findOne({
      $or: [{ email }, { mobile }],
    }).lean();
    if (existing) return { ok: false, error: "An account with this email or mobile already exists. Please sign in." };

    const now = new Date().toISOString();
    const customer: Customer = {
      id: `cus_${Date.now().toString(36)}`,
      fullName: input.fullName.trim(),
      mobile,
      email,
      password: input.password,
      createdAt: now,
    };
    await CustomerModel.create(customer);
    await setCustomerSession(customer.id);
    return { ok: true, user: toUser(customer) };
  } catch (err) {
    console.error("[auth] registerCustomer:", err);
    return { ok: false, error: "Could not create account. Please try again." };
  }
}

export async function loginCustomer(input: {
  identifier: string;
  password: string;
}): Promise<{ ok: true; user: User } | { ok: false; error: string }> {
  try {
    await connectDB();
    const id = input.identifier.trim().toLowerCase();
    const digits = id.replace(/\D/g, "");
    const doc = await CustomerModel.findOne({
      $or: [{ email: id }, ...(digits.length >= 10 ? [{ mobile: { $regex: digits.slice(-10) } }] : [])],
    }).lean();
    if (!doc) return { ok: false, error: "Incorrect email/mobile or password." };
    const customer = strip(doc as Record<string, unknown>);
    if (!customer.password || customer.password !== input.password) {
      return { ok: false, error: "Incorrect email/mobile or password." };
    }
    await setCustomerSession(customer.id);
    return { ok: true, user: toUser(customer) };
  } catch (err) {
    console.error("[auth] loginCustomer:", err);
    return { ok: false, error: "Could not sign in. Please try again." };
  }
}
