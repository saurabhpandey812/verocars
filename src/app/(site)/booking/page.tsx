import { redirect } from "next/navigation";
import { getCars } from "@/data/cars";
import { readBlockingBookings } from "@/server/db";
import { toWindow } from "@/lib/availability";
import { getCurrentUser } from "@/lib/auth/session";
import { buildMetadata } from "@/lib/seo/metadata";
import { BookingFlow } from "@/components/booking/BookingFlow";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Book a Self Drive Car in Lucknow",
  description: "Send a self-drive booking request in a few steps. Choose your car, dates and pickup point. Our team confirms availability and payment is collected offline.",
  path: "/booking",
});

function bookingReturnPath(p: Record<string, string | undefined>) {
  const qs = new URLSearchParams();
  for (const key of ["car", "loc", "from", "fromT", "to", "toT"] as const) {
    if (p[key]) qs.set(key, p[key]!);
  }
  const q = qs.toString();
  return q ? `/booking?${q}` : "/booking";
}

export default async function BookingPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const p = await searchParams;
  const user = await getCurrentUser();
  if (!user) {
    redirect(`/login?next=${encodeURIComponent(bookingReturnPath(p))}`);
  }

  const [cars, bookings] = await Promise.all([getCars(), readBlockingBookings()]);
  return (
    <div className="wrap py-12">
      <h1 className="display mb-6 text-4xl sm:mb-8 sm:text-5xl md:text-6xl">Book your car</h1>
      <BookingFlow
        cars={cars}
        blocks={bookings.map(toWindow)}
        init={{ car: p.car, loc: p.loc, from: p.from, fromT: p.fromT, to: p.to, toT: p.toT }}
        user={{ fullName: user.fullName, mobile: user.mobile, email: user.email }}
      />
    </div>
  );
}
