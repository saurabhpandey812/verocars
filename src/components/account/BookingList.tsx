import Link from "next/link";
import type { Booking } from "@/types/booking";
import { getAllCars } from "@/data/cars";
import { inr } from "@/lib/utils/pricing";
import { StatusBadge } from "./StatusBadge";

const fmt = (iso: string) => new Date(iso).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });

export async function BookingList({ bookings, empty }: { bookings: Booking[]; empty: string }) {
  if (!bookings.length)
    return (
      <div className="border border-dashed border-line p-8 text-center">
        <p className="text-mute">{empty}</p>
        <Link href="/cars" className="btn btn-dark mt-4 min-h-10">Browse cars</Link>
      </div>
    );

  const cars = await getAllCars();
  const name = (slug: string) => {
    const c = cars.find((x) => x.slug === slug);
    return c ? `${c.brand} ${c.model}` : slug;
  };

  return (
    <div className="overflow-x-auto border border-line bg-white">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <thead className="border-b border-line text-xs text-mute">
          <tr>
            <th className="p-3">Car</th>
            <th>Dates</th>
            <th>Ref</th>
            <th className="pr-3 text-right">Status / estimate</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {bookings.map((b) => (
            <tr key={b.id}>
              <td className="p-3 font-semibold">{name(b.carSlug)}</td>
              <td className="py-3 text-mute">{fmt(b.pickupAt)} to {fmt(b.returnAt)}</td>
              <td className="py-3 text-xs text-mute">{b.id}</td>
              <td className="py-3 pr-3 text-right">
                <StatusBadge status={b.status} />
                <p className="mt-1 text-sm">{inr(b.estimatedTotal)} est.</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
