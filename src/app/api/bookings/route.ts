import { NextResponse } from "next/server";
import { getCarBySlug } from "@/data/cars";
import { createBooking } from "@/server/db";
import { validateCustomer, validateTrip } from "@/lib/validations/booking";
import type { BookingRequest } from "@/types/booking";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as BookingRequest | null;
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  const car = await getCarBySlug(body.carSlug);
  if (!car || car.status !== "available") return NextResponse.json({ error: "Invalid car." }, { status: 400 });
  const errors = { ...validateTrip(body), ...validateCustomer(body) };
  if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });
  try {
    const booking = await createBooking(body);
    return NextResponse.json({ id: booking.id, status: booking.status }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not save booking. Please try again." }, { status: 500 });
  }
}
