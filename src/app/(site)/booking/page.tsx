import { cars } from "@/data/cars";
import { buildMetadata } from "@/lib/seo/metadata";
import { BookingFlow } from "@/components/booking/BookingFlow";

export const metadata = buildMetadata({
  title: "Book a Self Drive Car in Lucknow",
  description: "Send a self-drive booking request in a few steps. Choose your car, dates and pickup point. Our team confirms availability and payment is collected offline.",
  path: "/booking",
});

export default async function BookingPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const p = await searchParams;
  return (
    <div className="wrap py-12">
      <h1 className="display mb-6 text-4xl sm:mb-8 sm:text-5xl md:text-6xl">Book your car</h1>
      <BookingFlow cars={cars} init={{ car: p.car, loc: p.loc, from: p.from, fromT: p.fromT, to: p.to, toT: p.toT }} />
    </div>
  );
}
