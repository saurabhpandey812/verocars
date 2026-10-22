import Link from "next/link";
import type { Booking } from "@/types/booking";
import { getCarBySlug } from "@/data/cars";
import { inr } from "@/lib/utils/pricing";
import { StatusBadge } from "./StatusBadge";

const fmt = (iso: string) => new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

export function BookingList({ bookings, empty }: { bookings: Booking[]; empty: string }) {
  if (!bookings.length)
    return (
      <div className="border border-dashed border-line p-8 text-center">
        <p className="text-mute">{empty}</p>
        <Link href="/cars" className="btn btn-dark mt-4 min-h-10">Browse cars</Link>
      </div>
    );
  return (
    <ul className="divide-y divide-line border border-line bg-white">
      {bookings.map((b) => {
        const car = getCarBySlug(b.carSlug);
        return (
          <li key={b.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
            <div>
              <p className="font-semibold">{car ? `${car.brand} ${car.model}` : b.carSlug}</p>
              <p className="text-sm text-mute">{fmt(b.pickupAt)} to {fmt(b.returnAt)}</p>
              <p className="text-xs text-mute">Ref {b.id}</p>
            </div>
            <div className="text-right"><StatusBadge status={b.status} /><p className="mt-1 text-sm">{inr(b.estimatedTotal)} est.</p></div>
          </li>
        );
      })}
    </ul>
  );
}
