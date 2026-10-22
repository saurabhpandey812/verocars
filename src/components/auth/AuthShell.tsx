import { CarImage } from "@/components/cars/CarImage";
import { site } from "@/lib/constants/site";

export function AuthShell({
  title,
  intro,
  children,
  eyebrow = "Account",
}: {
  title: string;
  intro: string;
  children: React.ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="lg:grid lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-2">
      {/* Image panel — desktop/tablet only */}
      <aside className="relative hidden overflow-hidden bg-ink lg:block" aria-hidden>
        <CarImage src="/images/about/team.jpg" alt="" label={site.name} sizes="50vw" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-ink/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-10 xl:p-14">
          <p className="text-sm tracking-[0.2em] text-brass">VEYORA CARS</p>
          <p className="display mt-3 max-w-md text-4xl text-bone xl:text-5xl">Your next drive starts here.</p>
          <p className="mt-4 max-w-sm text-bone/70">
            One account to request cars, track bookings and keep your details ready for the next trip across Lucknow.
          </p>
        </div>
      </aside>

      <div className="flex items-center bg-bone">
        <div className="mx-auto w-full max-w-md px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
          <p className="text-xs font-semibold tracking-[0.18em] text-brass-d uppercase">{eyebrow}</p>
          <h1 className="display mt-2 text-4xl sm:text-5xl">{title}</h1>
          <p className="mb-8 mt-3 text-mute">{intro}</p>
          {children}
        </div>
      </div>
    </div>
  );
}
