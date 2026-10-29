import { getCars } from "@/data/cars";
import { readBlockingBookings } from "@/server/db";
import { toWindow } from "@/lib/availability";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbLd, carListLd } from "@/lib/seo/jsonld";
import { CarsExplorer } from "@/components/cars/CarsExplorer";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export const metadata = buildMetadata({
  title: "Self Drive Cars in Lucknow: Fleet and Daily Prices",
  description: "Browse hatchbacks, sedans, SUVs and premium cars available for self-drive rental in Lucknow. Filter by seats, fuel and price, then send a booking request.",
  path: "/cars",
});

export default async function CarsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const p = await searchParams;
  const [cars, bookings] = await Promise.all([getCars(), readBlockingBookings()]);
  const blocks = bookings.map(toWindow);
  const trip = {
    loc: p.loc ?? "Lucknow city (Gomti Nagar)",
    from: p.from ?? "",
    fromT: p.fromT ?? "10:00",
    to: p.to ?? "",
    toT: p.toT ?? "10:00",
  };
  return (
    <div className="wrap py-12">
      <JsonLd data={carListLd(cars)} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Cars", path: "/cars" }])} />
      <h1 className="display text-4xl sm:text-5xl md:text-6xl">Self drive cars in Lucknow</h1>
      <p className="mb-10 mt-3 max-w-xl text-mute">
        Pick a car for city driving, a business trip or a weekend out of town. Choose dates to see which cars are free.
      </p>
      <CarsExplorer cars={cars} blocks={blocks} trip={trip} />
    </div>
  );
}
