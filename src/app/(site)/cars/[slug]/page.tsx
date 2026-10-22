import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MessageCircle } from "lucide-react";
import { cars, getCarBySlug, getRelatedCars } from "@/data/cars";
import { site } from "@/lib/constants/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbLd, vehicleLd } from "@/lib/seo/jsonld";
import { carEnquiryLink } from "@/lib/utils/whatsapp";
import { inr } from "@/lib/utils/pricing";
import { CarCard } from "@/components/cars/CarCard";
import { CarImage } from "@/components/cars/CarImage";
import { JsonLd } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => cars.map((c) => ({ slug: c.slug }));

export async function generateMetadata({ params }: Props) {
  const car = getCarBySlug((await params).slug);
  if (!car) return {};
  const name = `${car.brand} ${car.model}`;
  return buildMetadata({
    title: `${name} Self Drive Rental in Lucknow | ${site.name}`,
    description: `Rent the ${name} (${car.transmission.toLowerCase()}, ${car.fuel.toLowerCase()}, ${car.seats} seats) for self-drive in Lucknow from ${inr(car.pricePerDay)} per day.`,
    path: `/cars/${car.slug}`, image: car.images[0].src,
  });
}

const rules = ["Valid driving licence and a government ID are required.", "Refundable security deposit is collected at pickup.", "Return with the same fuel level as pickup.", "Traffic fines during the rental are the renter’s responsibility.", "Late returns are charged per hour. [Confirm rates]"];

export default async function CarPage({ params }: Props) {
  const car = getCarBySlug((await params).slug);
  if (!car) notFound();
  const name = `${car.brand} ${car.model}`;
  const related = getRelatedCars(car.slug);
  const specs: [string, string][] = [["Seats", String(car.seats)], ["Transmission", car.transmission], ["Fuel", car.fuel], ["Year", String(car.year)], ["Air conditioning", "Yes"]];

  return (
    <div className="wrap py-8 pb-28 lg:pb-12">
      <JsonLd data={vehicleLd(car)} />
      <JsonLd data={breadcrumbLd([{ name: "Home", path: "/" }, { name: "Cars", path: "/cars" }, { name: name, path: `/cars/${car.slug}` }])} />
      <nav aria-label="Breadcrumb" className="mb-6 text-sm text-mute"><Link href="/" className="hover:underline">Home</Link> / <Link href="/cars" className="hover:underline">Cars</Link> / <span aria-current="page">{name}</span></nav>
      <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden bg-ink-2">
            <CarImage src={car.images[0].src} alt={car.images[0].alt} label={name} priority sizes="(min-width:1024px) 60vw, 100vw" />
          </div>
          <p className="mt-8 text-sm text-mute">{car.category}</p>
          <h1 className="display text-3xl sm:text-5xl md:text-6xl">{name} self drive rental in Lucknow</h1>
          <p className="mt-4 max-w-2xl text-mute">{car.description}</p>
          <dl className="mt-8 grid grid-cols-2 gap-px bg-line sm:grid-cols-3 lg:grid-cols-5">{specs.map(([k, v]) => <div key={k} className="bg-bone px-2 py-3 sm:px-3"><dt className="text-xs text-mute">{k}</dt><dd className="font-semibold">{v}</dd></div>)}</dl>
          <h2 className="display mt-10 text-2xl sm:mt-12 sm:text-3xl">Features</h2>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">{car.features.map((f) => <li key={f} className="flex items-center gap-2"><Check size={16} className="text-brass-d" aria-hidden /> {f}</li>)}</ul>
          <h2 className="display mt-10 text-2xl sm:mt-12 sm:text-3xl">Rental requirements and rules</h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-mute">{rules.map((r) => <li key={r}>{r}</li>)}</ul>
          <p className="mt-3 text-sm">Full details in our <Link href="/terms" className="underline">rental terms</Link>.</p>
          <h2 className="display mt-10 text-2xl sm:mt-12 sm:text-3xl">Availability</h2>
          <p className="mt-3 max-w-xl text-mute">Availability is confirmed by our team after you send a request. Live calendar availability will appear here in a later update.</p>
        </div>
        <aside className="hidden h-fit border border-line bg-white p-6 lg:sticky lg:top-24 lg:block" aria-label="Book this car">
          <p className="text-3xl font-semibold">{inr(car.pricePerDay)} <span className="text-base font-normal text-mute">/ day</span></p>
          <p className="mt-1 text-sm text-mute">Security deposit {inr(car.securityDeposit)}</p>
          <Link href={`/booking?car=${car.slug}`} className="btn btn-dark mt-5 w-full">Book now</Link>
          <a href={carEnquiryLink(name)} className="btn btn-ghost mt-3 w-full"><MessageCircle size={18} aria-hidden /> WhatsApp enquiry</a>
        </aside>
      </div>
      {related.length > 0 && <section className="mt-16 sm:mt-20" aria-labelledby="rel"><h2 id="rel" className="display text-3xl sm:text-4xl">Similar cars</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{related.map((c) => <CarCard key={c.id} car={c} />)}</div></section>}
      <div className="fixed inset-x-0 bottom-0 z-30 flex items-center gap-2 border-t border-line bg-bone/95 p-3 backdrop-blur sm:gap-3 lg:hidden">
        <div className="min-w-0 flex-1"><p className="truncate font-semibold">{inr(car.pricePerDay)}<span className="text-xs font-normal text-mute"> / day</span></p></div>
        <a href={carEnquiryLink(name)} aria-label="WhatsApp enquiry" className="btn btn-ghost shrink-0 px-3"><MessageCircle size={18} /></a>
        <Link href={`/booking?car=${car.slug}`} className="btn btn-dark shrink-0">Book now</Link>
      </div>
    </div>
  );
}
