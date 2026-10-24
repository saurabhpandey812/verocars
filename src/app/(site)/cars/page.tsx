import { getCars } from "@/data/cars";
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
  const cars = await getCars();
  const carry = new URLSearchParams(Object.entries({ loc: p.loc, from: p.from, fromT: p.fromT, to: p.to, toT: p.toT }).filter((e): e is [string, string] => !!e[1])).toString();
  return (
    <div className="wrap py-12">
      <JsonLd data={carListLd(cars)} /><JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Cars", path: "/cars" }])} />
      <h1 className="display text-4xl sm:text-5xl md:text-6xl">Self drive cars in Lucknow</h1>
      <p className="mb-10 mt-3 max-w-xl text-mute">Pick a car for city driving, a business trip or a weekend out of town. Rent without a driver, with daily pricing and a refundable security deposit.</p>
      <CarsExplorer cars={cars} query={carry ? `&${carry}` : ""} />
    </div>
  );
}
