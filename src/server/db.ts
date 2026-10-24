import "server-only";
import type { Car } from "@/types/car";
import type { Booking, BookingRequest } from "@/types/booking";
import { seedCars } from "@/data/seed-cars";
import { estimate } from "@/lib/utils/pricing";
import { connectDB } from "./mongo";
import { CarModel } from "./models/car";
import { BookingModel } from "./models/booking";
import { CustomerModel } from "./models/customer";
import { getSessionCustomer } from "./auth";

function strip<T extends { id: string }>(doc: T & { _id?: unknown; __v?: unknown }): T {
  const { _id: _a, __v: _b, ...rest } = doc as T & { _id?: unknown; __v?: unknown };
  return rest as T;
}

async function ensureSeeded() {
  const count = await CarModel.countDocuments();
  if (count > 0) return;
  await CarModel.insertMany(seedCars);
}

export async function readCars(): Promise<Car[]> {
  await connectDB();
  await ensureSeeded();
  const cars = await CarModel.find().lean();
  return cars.map((c) => strip(c as unknown as Car));
}

export async function createBooking(body: BookingRequest): Promise<Booking> {
  await connectDB();
  await ensureSeeded();

  const car = await CarModel.findOne({ slug: body.carSlug }).lean();
  if (!car) throw new Error("That car was not found.");
  const carDoc = strip(car as unknown as Car);
  if (carDoc.status !== "available") throw new Error("That car is not available right now.");

  const { rental, total } = estimate(carDoc, body.pickupAt.slice(0, 10), body.returnAt.slice(0, 10));

  const email = body.email.trim().toLowerCase();
  const session = await getSessionCustomer().catch(() => null);

  let userId: string;
  if (session) {
    userId = session.id;
    await CustomerModel.updateOne(
      { id: userId },
      { $set: { fullName: body.fullName.trim(), mobile: body.mobile.trim(), email } },
    );
  } else {
    const existing = await CustomerModel.findOne({ email }).lean();
    if (!existing) {
      userId = `cus_${Date.now().toString(36)}`;
      await CustomerModel.create({
        id: userId,
        fullName: body.fullName.trim(),
        mobile: body.mobile.trim(),
        email,
        password: "",
        createdAt: new Date().toISOString(),
      });
    } else {
      userId = String(existing.id);
      await CustomerModel.updateOne(
        { id: userId },
        { $set: { fullName: body.fullName.trim(), mobile: body.mobile.trim() } },
      );
    }
  }

  const booking: Booking = {
    ...body,
    email,
    id: `REQ-${Date.now().toString(36).toUpperCase()}`,
    userId,
    status: "pending",
    estimatedTotal: total,
    rentalAmount: rental,
    createdAt: new Date().toISOString(),
  };
  await BookingModel.create(booking);
  return booking;
}

export async function readBookingsForUser(userId: string): Promise<Booking[]> {
  await connectDB();
  const rows = await BookingModel.find({ userId }).sort({ createdAt: -1 }).lean();
  return rows.map((b) => strip(b as unknown as Booking));
}
