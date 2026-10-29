import { Fuel, Settings2, Users } from "lucide-react";
import type { Car } from "@/types/car";
import { inr } from "@/lib/utils/pricing";
import { PendingLink } from "@/components/ui/PendingLink";
import { CarImage } from "./CarImage";

export function CarCard({
  car,
  query = "",
  unavailable = false,
}: {
  car: Car;
  query?: string;
  unavailable?: boolean;
}) {
  const name = `${car.brand} ${car.model}`;
  return (
    <article className={`group flex flex-col border border-line bg-white ${unavailable ? "opacity-75" : ""}`}>
      <PendingLink href={`/cars/${car.slug}${query ? `?${query.replace(/^&/, "")}` : ""}`} variant="car" buttonSkeleton={false} className="relative block aspect-[4/3] overflow-hidden bg-ink-2" aria-label={`View ${name}`}>
        <div className={`absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03] ${unavailable ? "grayscale" : ""}`}>
          <CarImage src={car.images[0].src} alt={car.images[0].alt} label={name} />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent opacity-80" />
        {unavailable && (
          <span className="absolute top-3 left-3 bg-ink px-2 py-1 text-xs font-semibold tracking-wide text-bone uppercase">
            Unavailable
          </span>
        )}
      </PendingLink>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium text-mute">{car.brand} · {car.category}</p>
        <h3 className="display mt-1 text-2xl sm:text-3xl">{car.model}</h3>
        <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-mute">
          <li className="flex items-center gap-1.5"><Users size={15} aria-hidden /> {car.seats} seats</li>
          <li className="flex items-center gap-1.5"><Settings2 size={15} aria-hidden /> {car.transmission}</li>
          <li className="flex items-center gap-1.5"><Fuel size={15} aria-hidden /> {car.fuel}</li>
        </ul>
        <p className="mt-5 text-sm"><span className="text-xl font-semibold">{inr(car.pricePerDay)}</span> <span className="text-mute">/ day</span></p>
        {unavailable ? (
          <p className="mt-4 text-sm text-mute">Booked for your selected dates. Try different dates or another car.</p>
        ) : (
          <div className="mt-4 grid grid-cols-2 gap-2">
            <PendingLink href={`/cars/${car.slug}${query ? `?${query.replace(/^&/, "")}` : ""}`} variant="car" className="btn btn-ghost min-h-10">View details</PendingLink>
            <PendingLink href={`/booking?car=${car.slug}${query}`} variant="booking" className="btn btn-dark min-h-10">Book now</PendingLink>
          </div>
        )}
      </div>
    </article>
  );
}
