import { NextResponse } from "next/server";
import { getCarBySlug } from "@/data/cars";
import { createBooking } from "@/server/db";
import { validateCustomer, validateTrip } from "@/lib/validations/booking";
import type { BookingRequest } from "@/types/booking";

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as BookingRequest | null;
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  try {
    const car = await getCarBySlug(body.carSlug);
    if (!car) return NextResponse.json({ error: "Invalid car." }, { status: 400 });
    if (car.status !== "available") {
      return NextResponse.json({ error: "That car is not available right now." }, { status: 400 });
    }

    const errors = { ...validateTrip(body), ...validateCustomer(body) };
    if (Object.keys(errors).length) return NextResponse.json({ errors }, { status: 422 });

    const booking = await createBooking(body);
    return NextResponse.json(
      { id: booking.id, status: booking.status, userId: booking.userId },
      { status: 201 },
    );
  } catch (err) {
    console.error("[api/bookings]", err);
    const message = err instanceof Error ? err.message : "Could not save booking. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
