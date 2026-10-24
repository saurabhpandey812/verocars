import Link from "next/link";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/constants/site";
import { CarImage } from "@/components/cars/CarImage";
import { PendingLink } from "@/components/ui/PendingLink";

export const metadata = buildMetadata({
  title: "About Us",
  description: `${site.name} is a Lucknow self-drive car rental service focused on clean cars, clear pricing and honest communication.`,
  path: "/about",
});

const values = [
  ["Cars we would drive", "Every car is cleaned and checked before it goes out."],
  ["Clear pricing", "Daily rate and security deposit are shown before you request."],
  ["Safety first", "Documents verified at pickup, with the car’s condition recorded with you."],
  ["Local & reachable", "A real Lucknow team — available on call and WhatsApp."],
] as const;

export default function About() {
  return (
    <div>
      <section className="relative isolate min-h-[58svh] overflow-hidden bg-ink text-bone sm:min-h-[64svh]">
        <div className="absolute inset-0">
          <CarImage src="/images/about/team.jpg" alt="" label={site.name} sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/75 to-ink/35" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/40" />
        </div>
        <div className="wrap relative flex min-h-[58svh] flex-col justify-end pb-12 pt-28 sm:min-h-[64svh] sm:pb-16 sm:pt-32">
          <p className="text-sm tracking-[0.2em] text-brass">VEYRO CARS · EST. LUCKNOW</p>
          <h1 className="display mt-3 max-w-3xl text-4xl leading-[1.05] sm:text-6xl md:text-7xl">
            Renting a car should feel straightforward.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-bone/75">
            {site.name} started with a simple idea: people in Lucknow should rent a good car without guesswork about
            price, condition or paperwork.
          </p>
        </div>
      </section>

      <section className="wrap grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-brass-d uppercase">Our story</p>
          <h2 className="display mt-2 text-3xl sm:text-4xl md:text-5xl">Self-drive, done with care</h2>
          <div className="mt-6 space-y-4 text-mute">
            <p>
              We keep the fleet clean, the pricing visible, and confirmation personal — a call or WhatsApp message
              before you plan your day around the car.
            </p>
            <p>
              From a quick city run to a weekend out of Lucknow, every request is handled by a team that treats your
              trip like it matters.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/cars" className="btn btn-dark">
              See our cars
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Talk to us
            </Link>
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden bg-ink-2">
          <CarImage
            src="/images/about/lucknow-drive.jpg"
            alt="Weekend road trip from Lucknow"
            label="Road trip"
            sizes="(min-width:1024px) 45vw, 100vw"
          />
        </div>
      </section>

      <section className="bg-ink py-14 text-bone sm:py-20">
        <div className="wrap">
          <p className="text-xs font-semibold tracking-[0.18em] text-brass uppercase">What we stand for</p>
          <h2 className="display mt-2 text-3xl sm:text-4xl md:text-5xl">The VEYRO standard</h2>
          <ul className="mt-10 grid gap-px bg-bone/15 sm:grid-cols-2">
            {values.map(([t, d], i) => (
              <li key={t} className="bg-ink p-6 sm:p-8">
                <p className="text-sm font-semibold text-brass">0{i + 1}</p>
                <p className="display mt-3 text-2xl sm:text-3xl">{t}</p>
                <p className="mt-2 text-bone/65">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wrap py-14 sm:py-20">
        <div className="flex flex-col items-stretch justify-between gap-6 bg-ink p-6 text-bone sm:p-10 md:flex-row md:items-center md:p-12">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-brass uppercase">Ready when you are</p>
            <h2 className="display mt-2 text-3xl sm:text-4xl">Drive Lucknow on your terms</h2>
            <p className="mt-2 max-w-md text-bone/70">Browse the fleet, send a request, and we confirm availability personally.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <PendingLink href="/booking" variant="booking" className="btn btn-primary w-full sm:w-auto">
              Book a car
            </PendingLink>
            <PendingLink href="/cars" className="btn btn-ghost w-full border-bone/40 sm:w-auto">
              Explore fleet
            </PendingLink>
          </div>
        </div>
      </section>
    </div>
  );
}
