"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import type { Car } from "@/types/car";
import type { BookingWindow } from "@/lib/availability";
import { busySlugsForRange } from "@/lib/availability";
import { localToday } from "@/lib/utils/date";
import { CarCard } from "./CarCard";

type Sort = "recommended" | "price-asc" | "price-desc";

type Trip = { loc: string; from: string; fromT: string; to: string; toT: string };

function uniqSorted<T extends string | number>(values: T[]) {
  return [...new Set(values)].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0));
}

function matches(
  c: Car,
  {
    q,
    cat,
    seats,
    trans,
    fuel,
    max,
  }: { q: string; cat: string; seats: string; trans: string; fuel: string; max: number },
  skip?: "cat" | "seats" | "trans" | "fuel",
) {
  const needle = q.trim().toLowerCase();
  if (c.pricePerDay > max) return false;
  if (needle && !`${c.brand} ${c.model}`.toLowerCase().includes(needle)) return false;
  if (skip !== "cat" && cat !== "all" && c.category !== cat) return false;
  if (skip !== "seats" && seats !== "all" && c.seats !== Number(seats)) return false;
  if (skip !== "trans" && trans !== "all" && c.transmission !== trans) return false;
  if (skip !== "fuel" && fuel !== "all" && c.fuel !== fuel) return false;
  return true;
}

function tripQuery(t: Trip) {
  const params = new URLSearchParams();
  if (t.loc) params.set("loc", t.loc);
  if (t.from) params.set("from", t.from);
  if (t.fromT) params.set("fromT", t.fromT);
  if (t.to) params.set("to", t.to);
  if (t.toT) params.set("toT", t.toT);
  const s = params.toString();
  return s ? `&${s}` : "";
}

export function CarsExplorer({
  cars,
  blocks,
  trip: initialTrip,
}: {
  cars: Car[];
  blocks: BookingWindow[];
  trip: Trip;
}) {
  const router = useRouter();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [seats, setSeats] = useState("all");
  const [trans, setTrans] = useState("all");
  const [fuel, setFuel] = useState("all");
  const [max, setMax] = useState(10000);
  const [sort, setSort] = useState<Sort>("recommended");
  const [sheet, setSheet] = useState(false);
  const [minDate, setMinDate] = useState("");
  const [trip, setTrip] = useState(initialTrip);

  useEffect(() => {
    setMinDate(localToday());
  }, []);

  useEffect(() => {
    setTrip(initialTrip);
  }, [initialTrip.loc, initialTrip.from, initialTrip.fromT, initialTrip.to, initialTrip.toT]);

  function setTripField<K extends keyof Trip>(key: K, value: Trip[K]) {
    setTrip((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "from" && next.to && next.to < value) next.to = "";
      const qs = tripQuery(next).replace(/^&/, "");
      router.replace(qs ? `/cars?${qs}` : "/cars", { scroll: false });
      return next;
    });
  }

  const pickupAt = trip.from && trip.fromT ? `${trip.from}T${trip.fromT}` : "";
  const returnAt = trip.to && trip.toT ? `${trip.to}T${trip.toT}` : "";
  const hasTrip = Boolean(trip.from && trip.to);
  const busy = useMemo(() => busySlugsForRange(blocks, pickupAt, returnAt), [blocks, pickupAt, returnAt]);
  const query = tripQuery(trip);

  const filtersState = { q, cat, seats, trans, fuel, max };

  const catOpts = useMemo(() => uniqSorted(cars.filter((c) => matches(c, filtersState, "cat")).map((c) => c.category)), [cars, q, seats, trans, fuel, max]);
  const seatOpts = useMemo(() => uniqSorted(cars.filter((c) => matches(c, filtersState, "seats")).map((c) => c.seats)), [cars, q, cat, trans, fuel, max]);
  const transOpts = useMemo(() => uniqSorted(cars.filter((c) => matches(c, filtersState, "trans")).map((c) => c.transmission)), [cars, q, cat, seats, fuel, max]);
  const fuelOpts = useMemo(() => uniqSorted(cars.filter((c) => matches(c, filtersState, "fuel")).map((c) => c.fuel)), [cars, q, cat, seats, trans, max]);

  useEffect(() => {
    if (cat !== "all" && !catOpts.includes(cat as Car["category"])) setCat("all");
  }, [cat, catOpts]);
  useEffect(() => {
    if (seats !== "all" && !seatOpts.includes(Number(seats))) setSeats("all");
  }, [seats, seatOpts]);
  useEffect(() => {
    if (trans !== "all" && !transOpts.includes(trans as Car["transmission"])) setTrans("all");
  }, [trans, transOpts]);
  useEffect(() => {
    if (fuel !== "all" && !fuelOpts.includes(fuel as Car["fuel"])) setFuel("all");
  }, [fuel, fuelOpts]);

  const list = useMemo(() => {
    const r = cars.filter((c) => matches(c, filtersState));
    const sorted =
      sort === "price-asc"
        ? [...r].sort((a, b) => a.pricePerDay - b.pricePerDay)
        : sort === "price-desc"
          ? [...r].sort((a, b) => b.pricePerDay - a.pricePerDay)
          : r;
    // Free cars first when checking dates
    if (!hasTrip) return sorted;
    return [...sorted].sort((a, b) => Number(busy.has(a.slug)) - Number(busy.has(b.slug)));
  }, [cars, q, cat, seats, trans, fuel, max, sort, hasTrip, busy]);

  const freeCount = hasTrip ? list.filter((c) => !busy.has(c.slug)).length : list.length;

  const reset = () => {
    setQ("");
    setCat("all");
    setSeats("all");
    setTrans("all");
    setFuel("all");
    setMax(10000);
  };

  const Select = ({
    id,
    label,
    value,
    set,
    opts,
    remountKey,
  }: {
    id: string;
    label: string;
    value: string;
    set: (v: string) => void;
    opts: [string, string][];
    remountKey?: string;
  }) => (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <select key={remountKey ?? id} id={id} className="field" value={value} onChange={(e) => set(e.target.value)}>
        {opts.map(([v, t]) => (
          <option key={v} value={v}>
            {t}
          </option>
        ))}
      </select>
    </div>
  );

  const filters = (
    <div className="grid gap-4">
      <div>
        <label htmlFor="f-from" className="label">
          Pickup date
        </label>
        <input
          id="f-from"
          type="date"
          className="field"
          min={minDate || undefined}
          value={trip.from}
          onChange={(e) => setTripField("from", e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="f-to" className="label">
          Return date
        </label>
        <input
          id="f-to"
          type="date"
          className="field"
          min={trip.from || minDate || undefined}
          value={trip.to}
          onChange={(e) => setTripField("to", e.target.value)}
        />
      </div>
      <Select
        id="f-cat"
        label="Category"
        value={cat}
        set={setCat}
        opts={[["all", "All"], ...catOpts.map((c) => [c, c] as [string, string])]}
      />
      <Select
        id="f-seats"
        label="Seats"
        value={seats}
        set={setSeats}
        remountKey={`seats-${cat}-${trans}-${fuel}-${seatOpts.join(",")}`}
        opts={[["all", "Any"], ...seatOpts.map((s) => [String(s), `${s} seats`] as [string, string])]}
      />
      <Select
        id="f-trans"
        label="Transmission"
        value={trans}
        set={setTrans}
        remountKey={`trans-${cat}-${seats}-${fuel}-${transOpts.join(",")}`}
        opts={[["all", "Any"], ...transOpts.map((t) => [t, t] as [string, string])]}
      />
      <Select
        id="f-fuel"
        label="Fuel"
        value={fuel}
        set={setFuel}
        remountKey={`fuel-${cat}-${seats}-${trans}-${fuelOpts.join(",")}`}
        opts={[["all", "Any"], ...fuelOpts.map((f) => [f, f] as [string, string])]}
      />
      <div>
        <label htmlFor="f-price" className="label">
          Max price per day: ₹{max.toLocaleString("en-IN")}
        </label>
        <input
          id="f-price"
          type="range"
          min={1500}
          max={10000}
          step={100}
          value={max}
          onChange={(e) => setMax(Number(e.target.value))}
          className="w-full accent-brass"
        />
      </div>
      <button type="button" onClick={reset} className="btn btn-ghost min-h-10">
        Clear filters
      </button>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      <aside className="hidden lg:block" aria-label="Filters">
        {filters}
      </aside>
      <div>
        <div className="mb-6 grid grid-cols-2 items-end gap-3 sm:flex sm:flex-wrap">
          <div className="col-span-2 min-w-0 sm:flex-1">
            <label htmlFor="q" className="label">
              Search cars
            </label>
            <input
              id="q"
              type="search"
              className="field"
              placeholder="Creta, Swift, SUV…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <div className="min-w-0 sm:w-44">
            <label htmlFor="sort" className="label">
              Sort
            </label>
            <select id="sort" className="field" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="recommended">Recommended</option>
              <option value="price-asc">Price: low to high</option>
              <option value="price-desc">Price: high to low</option>
            </select>
          </div>
          <button type="button" className="btn btn-dark w-full lg:hidden" onClick={() => setSheet(true)}>
            <SlidersHorizontal size={16} aria-hidden /> Filters
          </button>
        </div>
        <p className="mb-4 text-sm text-mute" aria-live="polite">
          {hasTrip
            ? `${freeCount} free · ${list.length - freeCount} unavailable for ${trip.from} → ${trip.to}`
            : `${list.length} ${list.length === 1 ? "car" : "cars"} available to request`}
        </p>
        {list.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {list.map((c) => (
              <CarCard key={c.id} car={c} query={query} unavailable={hasTrip && busy.has(c.slug)} />
            ))}
          </div>
        ) : (
          <div className="border border-dashed border-line p-10 text-center">
            <p className="display text-3xl">No cars match these filters.</p>
            <p className="mt-2 text-mute">Widen the price range or clear a filter.</p>
            <button type="button" onClick={reset} className="btn btn-dark mt-5">
              Clear filters
            </button>
          </div>
        )}
      </div>
      {sheet && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
          className="fixed inset-0 z-50 flex items-end bg-ink/60 lg:hidden"
          onClick={() => setSheet(false)}
        >
          <div className="max-h-[85vh] w-full overflow-auto rounded-t-lg bg-bone p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <p className="display text-2xl">Filters</p>
              <button type="button" onClick={() => setSheet(false)} aria-label="Close filters">
                <X />
              </button>
            </div>
            {filters}
            <button type="button" onClick={() => setSheet(false)} className="btn btn-primary mt-5 w-full">
              Show {list.length} cars
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
