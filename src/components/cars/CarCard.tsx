import Link from "next/link";
import { Fuel, Settings2, Users } from "lucide-react";
import type { Car } from "@/types/car";
import { inr } from "@/lib/utils/pricing";
import { CarImage } from "./CarImage";

export function CarCard({ car, query = "" }: { car: Car; query?: string }) {
  const name = `${car.brand} ${car.model}`;
  return (
    <article className="group flex flex-col border border-line bg-white">
      <Link href={`/cars/${car.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-ink-2" aria-label={`View ${name}`}>
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
          <CarImage src={car.images[0].src} alt={car.images[0].alt} label={name} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-80" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium text-mute">{car.brand} · {car.category}</p>
        <h3 className="display mt-1 text-2xl sm:text-3xl">{car.model}</h3>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-mute">
          <li className="flex items-center gap-1.5"><Users size={15} aria-hidden /> {car.seats} seats</li>
          <li className="flex items-center gap-1.5"><Settings2 size={15} aria-hidden /> {car.transmission}</li>
          <li className="flex items-center gap-1.5"><Fuel size={15} aria-hidden /> {car.fuel}</li>
        </ul>
        <p className="mt-5 text-sm"><span className="text-xl font-semibold">{inr(car.pricePerDay)}</span> <span className="text-mute">/ day</span></p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Link href={`/cars/${car.slug}`} className="btn btn-ghost min-h-10">View details</Link>
          <Link href={`/booking?car=${car.slug}${query}`} className="btn btn-dark min-h-10">Book now</Link>
        </div>
      </div>
    </article>
  );
}
