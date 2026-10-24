import "server-only";
import type { Booking } from "@/types/booking";
import { env } from "@/config";
import { readBookingsForUser } from "@/server/db";
import { demoBookings } from "@/data/demo-account";

export async function getBookingsForUser(userId: string): Promise<Booking[]> {
  // Demo account preview still uses sample rows when the flag is on.
  if (env.demoAccount && userId === "usr_demo") {
    return demoBookings.filter((b) => b.userId === userId);
  }
  return readBookingsForUser(userId);
}
