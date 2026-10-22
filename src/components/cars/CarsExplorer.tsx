"use client";
import { useMemo, useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { Car } from "@/types/car";
import { CarCard } from "./CarCard";

const sel = (v: string) => (v === "all" ? null : v);
type Sort = "recommended" | "price-asc" | "price-desc";

export function CarsExplorer({ cars, query }: { cars: Car[]; query: string }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [seats, setSeats] = useState("all");
  const [trans, setTrans] = useState("all");
  const [fuel, setFuel] = useState("all");
  const [max, setMax] = useState(10000);
  const [sort, setSort] = useState<Sort>("recommended");
  const [sheet, setSheet] = useState(false);

  const list = useMemo(() => {
    const r = cars.filter((c) =>
      `${c.brand} ${c.model}`.toLowerCase().includes(q.trim().toLowerCase()) &&
      (!sel(cat) || c.category === cat) && (!sel(seats) || c.seats >= Number(seats)) &&
      (!sel(trans) || c.transmission === trans) && (!sel(fuel) || c.fuel === fuel) && c.pricePerDay <= max);
    return sort === "price-asc" ? [...r].sort((a, b) => a.pricePerDay - b.pricePerDay) : sort === "price-desc" ? [...r].sort((a, b) => b.pricePerDay - a.pricePerDay) : r;
  }, [cars, q, cat, seats, trans, fuel, max, sort]);

  const reset = () => { setQ(""); setCat("all"); setSeats("all"); setTrans("all"); setFuel("all"); setMax(10000); };
  const Select = ({ id, label, value, set, opts }: { id: string; label: string; value: string; set: (v: string) => void; opts: [string, string][] }) => (
    <div><label htmlFor={id} className="label">{label}</label>
      <select id={id} className="field" value={value} onChange={(e) => set(e.target.value)}>{opts.map(([v, t]) => <option key={v} value={v}>{t}</option>)}</select></div>
  );
  const filters = (
    <div className="grid gap-4">
      <Select id="f-cat" label="Category" value={cat} set={setCat} opts={[["all", "All"], ["Hatchback", "Hatchback"], ["Sedan", "Sedan"], ["SUV", "SUV"], ["Premium", "Premium"]]} />
      <Select id="f-seats" label="Seats" value={seats} set={setSeats} opts={[["all", "Any"], ["5", "5 or more"], ["7", "7 or more"]]} />
      <Select id="f-trans" label="Transmission" value={trans} set={setTrans} opts={[["all", "Any"], ["Manual", "Manual"], ["Automatic", "Automatic"]]} />
      <Select id="f-fuel" label="Fuel" value={fuel} set={setFuel} opts={[["all", "Any"], ["Petrol", "Petrol"], ["Diesel", "Diesel"], ["CNG", "CNG"]]} />
      <div><label htmlFor="f-price" className="label">Max price per day: ₹{max.toLocaleString("en-IN")}</label>
        <input id="f-price" type="range" min={1500} max={10000} step={100} value={max} onChange={(e) => setMax(Number(e.target.value))} className="w-full accent-brass" /></div>
      <button onClick={reset} className="btn btn-ghost min-h-10">Clear filters</button>
    </div>
  );

  return (
    <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
      <aside className="hidden lg:block" aria-label="Filters">{filters}</aside>
      <div>
        <div className="mb-6 grid grid-cols-2 items-end gap-3 sm:flex sm:flex-wrap">
          <div className="col-span-2 min-w-0 sm:flex-1"><label htmlFor="q" className="label">Search cars</label>
            <input id="q" type="search" className="field" placeholder="Creta, Swift, SUV…" value={q} onChange={(e) => setQ(e.target.value)} /></div>
          <div className="min-w-0 sm:w-44"><label htmlFor="sort" className="label">Sort</label>
            <select id="sort" className="field" value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
              <option value="recommended">Recommended</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></div>
          <button type="button" className="btn btn-dark w-full lg:hidden" onClick={() => setSheet(true)}><SlidersHorizontal size={16} aria-hidden /> Filters</button>
        </div>
        <p className="mb-4 text-sm text-mute" aria-live="polite">{list.length} {list.length === 1 ? "car" : "cars"} available to request</p>
        {list.length ? (
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{list.map((c) => <CarCard key={c.id} car={c} query={query} />)}</div>
        ) : (
          <div className="border border-dashed border-line p-10 text-center">
            <p className="display text-3xl">No cars match these filters.</p>
            <p className="mt-2 text-mute">Widen the price range or clear a filter.</p>
            <button onClick={reset} className="btn btn-dark mt-5">Clear filters</button>
          </div>
        )}
      </div>
      {sheet && (
        <div role="dialog" aria-modal="true" aria-label="Filters" className="fixed inset-0 z-50 flex items-end bg-ink/60 lg:hidden" onClick={() => setSheet(false)}>
          <div className="max-h-[85vh] w-full overflow-auto rounded-t-lg bg-bone p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between"><p className="display text-2xl">Filters</p><button onClick={() => setSheet(false)} aria-label="Close filters"><X /></button></div>
            {filters}
            <button onClick={() => setSheet(false)} className="btn btn-primary mt-5 w-full">Show {list.length} cars</button>
          </div>
        </div>
      )}
    </div>
  );
}
