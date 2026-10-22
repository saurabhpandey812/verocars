import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { cars } from "@/data/cars";
import { site } from "@/lib/constants/site";
import { buildMetadata } from "@/lib/seo/metadata";
import { carListLd } from "@/lib/seo/jsonld";
import { whatsappLink } from "@/lib/utils/whatsapp";
import { CarCard } from "@/components/cars/CarCard";
import { CarImage } from "@/components/cars/CarImage";
import { HeroSlider } from "@/components/home/HeroSlider";
import { SearchWidget } from "@/components/home/SearchWidget";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata = buildMetadata({
  title: `Self Drive Car Rental in Lucknow | ${site.name}`,
  description: "Rent a well-maintained car without a driver in Lucknow. Hatchbacks, sedans and SUVs for city drives, business trips and weekend getaways. Send a booking request online.",
  path: "/",
});

const steps = [
  ["Choose a car", "Compare the fleet by seats, fuel and price per day."],
  ["Send a request", "Pick your dates and share your licence and ID details."],
  ["We confirm", "Our team calls to confirm availability. Payment is collected offline."],
];

const featuredSlugs = ["scorpio", "swift-dzire", "victoris", "ertiga", "creta", "innova-crysta"];

export default function Home() {
  const featured = featuredSlugs.map((s) => cars.find((c) => c.slug.endsWith(s))).filter(Boolean) as typeof cars;
  return (
    <>
      <div className="relative">
        <HeroSlider />
        <div className="wrap relative z-20 -mt-12 sm:-mt-16 md:-mt-20">
          <SearchWidget />
        </div>
      </div>

      <section className="wrap pt-14 sm:pt-20" aria-labelledby="fleet">
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <h2 id="fleet" className="display text-3xl sm:text-4xl md:text-5xl">Cars ready to book</h2>
            <p className="mt-2 max-w-md text-mute">Scorpio, Dzire, Victoris, Ertiga and more — each card shows that car’s photo.</p>
          </div>
          <Link href="/cars" className="hidden shrink-0 font-semibold underline underline-offset-4 md:block">See all self-drive cars</Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{featured.map((c) => <CarCard key={c.id} car={c} />)}</div>
        <Link href="/cars" className="btn btn-dark mt-8 w-full md:hidden">See all cars</Link>
        <JsonLd data={carListLd(featured)} />
      </section>

      <section className="wrap pt-16 sm:pt-24" aria-labelledby="how">
        <h2 id="how" className="display text-3xl sm:text-4xl md:text-5xl">Booking takes three steps</h2>
        <ol className="mt-8 grid gap-px bg-line sm:grid-cols-3">
          {steps.map(([t, d], i) => (
            <li key={t} className="bg-bone py-5 sm:px-6 sm:py-6 first:sm:pl-0">
              <p className="text-sm font-semibold text-brass-d">Step {i + 1}</p>
              <p className="display mt-2 text-2xl sm:text-3xl">{t}</p>
              <p className="mt-2 text-mute">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap grid items-center gap-8 pt-16 sm:gap-10 sm:pt-24 lg:grid-cols-2" aria-labelledby="about-rental">
        <div className="relative aspect-[4/3] overflow-hidden bg-ink-2">
          <CarImage src="/images/about/lucknow-drive.jpg" alt="Open road drive from Lucknow on a self-drive rental" label="Road trip" sizes="(min-width:1024px) 45vw, 100vw" />
        </div>
        <div>
          <h2 id="about-rental" className="display text-3xl sm:text-4xl md:text-5xl">Car rental without a driver, done simply</h2>
          <div className="mt-6 space-y-4 text-mute">
            <p>Self-drive rental gives you the car and the schedule. It suits local errands, client meetings across the city and weekend trips out of Lucknow, with day-based pricing that is clear before you request a booking.</p>
            <p>Each request is confirmed by our team, so you know the car is available before you plan around it. See the <Link href="/terms" className="underline">rental terms</Link> for licence, deposit and fuel rules, or <Link href="/contact" className="underline">contact us</Link> with questions.</p>
          </div>
        </div>
      </section>

      <section className="wrap pt-16 pb-4 sm:pt-24">
        <div className="flex flex-col items-stretch justify-between gap-6 bg-ink p-6 text-bone sm:items-start sm:p-8 md:flex-row md:items-center md:p-12">
          <div>
            <h2 className="display text-3xl sm:text-4xl">Not sure which car?</h2>
            <p className="mt-2 text-bone/70">Tell us your dates and group size. We’ll suggest one.</p>
          </div>
          <a href={whatsappLink("Hello, I need help choosing a self-drive car in Lucknow.")} className="btn btn-primary w-full shrink-0 md:w-auto">
            <MessageCircle size={18} aria-hidden /> Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
