"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

/** Local calendar date as YYYY-MM-DD (avoids UTC vs local hydration mismatch). */
function localToday() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const places = ["Lucknow city (Gomti Nagar)", "Hazratganj", "Alambagh", "Airport area (if offered)"];

export function SearchWidget() {
  const router = useRouter();
  const [v, setV] = useState({ loc: places[0], from: "", fromT: "10:00", to: "", toT: "10:00" });
  const [error, setError] = useState("");
  // Set after mount so SSR + first client paint stay identical
  const [minDate, setMinDate] = useState("");
  const set = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setV({ ...v, [k]: e.target.value });

  useEffect(() => {
    setMinDate(localToday());
  }, []);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!v.from || !v.to) return setError("Choose pickup and return dates.");
    if (`${v.to}T${v.toT}` <= `${v.from}T${v.fromT}`) return setError("Return must be after pickup.");
    setError("");
    router.push(`/cars?${new URLSearchParams({ loc: v.loc, from: v.from, fromT: v.fromT, to: v.to, toT: v.toT })}`);
  }
  return (
    <form
      onSubmit={submit}
      aria-label="Check available cars"
      className="grid grid-cols-2 gap-3 bg-bone p-4 text-ink shadow-2xl shadow-black/20 sm:gap-4 sm:p-5 lg:grid-cols-[1.4fr_1fr_.7fr_1fr_.7fr_auto] lg:items-end"
    >
      <div className="col-span-2 lg:col-span-1">
        <label htmlFor="loc" className="label">Pickup location</label>
        <select id="loc" className="field" value={v.loc} onChange={set("loc")}>{places.map((p) => <option key={p}>{p}</option>)}</select>
      </div>
      <div>
        <label htmlFor="from" className="label">Pickup date</label>
        <input id="from" type="date" min={minDate || undefined} className="field" value={v.from} onChange={set("from")} />
      </div>
      <div>
        <label htmlFor="fromT" className="label">Time</label>
        <input id="fromT" type="time" className="field" value={v.fromT} onChange={set("fromT")} />
      </div>
      <div>
        <label htmlFor="to" className="label">Return date</label>
        <input id="to" type="date" min={v.from || minDate || undefined} className="field" value={v.to} onChange={set("to")} />
      </div>
      <div>
        <label htmlFor="toT" className="label">Time</label>
        <input id="toT" type="time" className="field" value={v.toT} onChange={set("toT")} />
      </div>
      <button className="btn btn-dark col-span-2 w-full lg:col-span-1 lg:w-auto">Check cars</button>
      {error && <p role="alert" className="err col-span-2 lg:col-span-6">{error}</p>}
    </form>
  );
}
