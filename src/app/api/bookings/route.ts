import { NextResponse } from "next/server";
import { getCarBySlug } from "@/data/cars";
import { validateCustomer, validateTrip } from "@/lib/validations/booking";
import type { BookingRequest } from "@/types/booking";

// TODO (DB phase): authenticate the user, check availability, persist with Prisma/MySQL.
export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as BookingRequest | null;
  if (!body || !getCarBySlug(body.carSlug)) return NextResponse.json({ error: "Invalid car." }, { status: 400 });
  const errors = { ...validateTrip(body), ...validateCustomer(body) };
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });
  return NextResponse.json({ id: `REQ-${Date.now().toString(36).toUpperCase()}`, status: "pending" }, { status: 201 });
}
