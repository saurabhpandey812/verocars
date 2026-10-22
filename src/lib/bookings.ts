import type { Booking } from "@/types/booking";
import { demoBookings } from "@/data/demo-account";

// Data boundary. Replace with a Prisma query: prisma.booking.findMany({ where: { userId } })
export async function getBookingsForUser(userId: string): Promise<Booking[]> {
  return demoBookings.filter((b) => b.userId === userId);
}
