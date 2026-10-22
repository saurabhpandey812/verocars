"use client";
import Link from "next/link";
import { useState } from "react";
import type { Car } from "@/types/car";
import type { BookingRequest } from "@/types/booking";
import { estimate, inr } from "@/lib/utils/pricing";
import { validateCustomer, validateTrip, type Errors } from "@/lib/validations/booking";

const steps = [
  { short: "Car", full: "Car" },
  { short: "Dates", full: "Dates" },
  { short: "Details", full: "Your details" },
  { short: "Review", full: "Review" },
] as const;
const places = ["Lucknow city (Gomti Nagar)", "Hazratganj", "Alambagh", "Airport area (if offered)"];
type Init = { car?: string; loc?: string; from?: string; fromT?: string; to?: string; toT?: string };

export function BookingFlow({ cars, init }: { cars: Car[]; init: Init }) {
  const [step, setStep] = useState(init.car ? 1 : 0);
  const [slug, setSlug] = useState(init.car ?? "");
  const [d, setD] = useState({ loc: init.loc ?? places[0], from: init.from ?? "", fromT: init.fromT ?? "10:00", to: init.to ?? "", toT: init.toT ?? "10:00" });
  const [c, setC] = useState({ fullName: "", mobile: "", email: "", drivingLicenceNumber: "", idProofType: "aadhaar" as BookingRequest["idProofType"], message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState("");
  const [done, setDone] = useState("");

  const car = cars.find((x) => x.slug === slug);
  const req: BookingRequest = { carSlug: slug, pickupLocation: d.loc, pickupAt: `${d.from}T${d.fromT}`, returnAt: `${d.to}T${d.toT}`, ...c };
  const est = car && d.from && d.to ? estimate(car, d.from, d.to) : null;

  function next() {
    const e = step === 0 ? (slug ? {} : { carSlug: "Choose a car to continue." }) : step === 1 ? validateTrip(req) : step === 2 ? validateCustomer(req) : {};
    setErrors(e);
    if (!Object.keys(e).length) setStep(step + 1);
  }
  async function submit() {
    setBusy(true); setFail("");
    try {
      const res = await fetch("/api/bookings", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(req) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Please check your details and try again.");
      setDone(json.id);
    } catch (err) { setFail(err instanceof Error ? err.message : "Something went wrong. Please try again."); }
    finally { setBusy(false); }
  }

  if (done) return (
    <div className="mx-auto max-w-lg py-12 text-center sm:py-16">
      <h2 className="display text-4xl sm:text-5xl">Request sent.</h2>
      <p className="mt-3 text-mute">Reference <strong>{done}</strong>. Our team will contact you on {c.mobile} to confirm availability. Payment is collected offline.</p>
      <Link href="/cars" className="btn btn-dark mt-6 w-full sm:w-auto">Browse more cars</Link>
    </div>
  );

  const fieldCls = (err?: string) => `field ${err ? "!border-[#b3261e]" : ""}`;
  const F = (id: string, label: string, el: React.ReactNode, err?: string, required?: boolean) => (
    <div className="min-w-0">
      <label htmlFor={id} className="label">{label}{required ? <span className="text-[#b3261e]"> *</span> : null}</label>
      {el}
      {err && <p role="alert" className="err">{err}</p>}
    </div>
  );
  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_20rem] lg:gap-10">
      <div className="min-w-0">
        <ol className="mb-6 flex gap-1 text-xs sm:mb-8 sm:gap-2 sm:text-sm" aria-label="Progress">
          {steps.map((s, i) => (
            <li key={s.full} aria-current={i === step ? "step" : undefined} className={`min-w-0 flex-1 border-t-2 pt-2 ${i <= step ? "border-brass font-semibold" : "border-line text-mute"}`}>
              <span className="sm:hidden">{i + 1}. {s.short}</span>
              <span className="hidden sm:inline">{s.full}</span>
            </li>
          ))}
        </ol>

        {step === 0 && (
          <fieldset><legend className="display mb-4 text-2xl sm:text-3xl">Choose your car</legend>
            <div className="grid gap-3">{cars.map((x) => (
              <label key={x.id} className={`flex cursor-pointer flex-col gap-2 border bg-white p-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3 sm:p-4 ${slug === x.slug ? "border-brass" : "border-line"}`}>
                <span className="flex min-w-0 items-start gap-3 sm:items-center">
                  <input type="radio" name="car" checked={slug === x.slug} onChange={() => setSlug(x.slug)} className="mt-1 accent-brass sm:mt-0" />
                  <span className="min-w-0">
                    <span className="font-semibold">{x.brand} {x.model}</span>
                    <span className="block text-sm text-mute">{x.category} · {x.seats} seats · {x.transmission}</span>
                  </span>
                </span>
                <span className="pl-7 text-sm font-semibold sm:pl-0">{inr(x.pricePerDay)}/day</span>
              </label>))}</div>
            {errors.carSlug && <p role="alert" className="err">{errors.carSlug}</p>}</fieldset>
        )}

        {step === 1 && (
          <div className="grid gap-4 sm:grid-cols-2"><h2 className="display text-2xl sm:col-span-2 sm:text-3xl">Dates and pickup</h2>
            <div className="sm:col-span-2">{F("loc", "Pickup location", <select id="loc" className={fieldCls(errors.pickupLocation)} value={d.loc} onChange={(e) => setD({ ...d, loc: e.target.value })}>{places.map((p) => <option key={p}>{p}</option>)}</select>, errors.pickupLocation, true)}</div>
            {F("from", "Pickup date", <input id="from" type="date" required className={fieldCls(errors.pickupAt)} value={d.from} onChange={(e) => setD({ ...d, from: e.target.value })} />, errors.pickupAt, true)}
            {F("fromT", "Pickup time", <input id="fromT" type="time" required className={fieldCls()} value={d.fromT} onChange={(e) => setD({ ...d, fromT: e.target.value })} />, undefined, true)}
            {F("to", "Return date", <input id="to" type="date" required className={fieldCls(errors.returnAt)} value={d.to} onChange={(e) => setD({ ...d, to: e.target.value })} />, errors.returnAt, true)}
            {F("toT", "Return time", <input id="toT" type="time" required className={fieldCls()} value={d.toT} onChange={(e) => setD({ ...d, toT: e.target.value })} />, undefined, true)}
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 sm:grid-cols-2"><h2 className="display text-2xl sm:col-span-2 sm:text-3xl">Your details</h2>
            {F("fullName", "Full name", <input id="fullName" autoComplete="name" required className={fieldCls(errors.fullName)} value={c.fullName} onChange={(e) => setC({ ...c, fullName: e.target.value })} />, errors.fullName, true)}
            {F("mobile", "Mobile", <input id="mobile" type="tel" autoComplete="tel" required inputMode="numeric" className={fieldCls(errors.mobile)} value={c.mobile} onChange={(e) => setC({ ...c, mobile: e.target.value })} />, errors.mobile, true)}
            {F("email", "Email", <input id="email" type="email" autoComplete="email" required className={fieldCls(errors.email)} value={c.email} onChange={(e) => setC({ ...c, email: e.target.value })} />, errors.email, true)}
            {F("dl", "Driving licence number", <input id="dl" required className={fieldCls(errors.drivingLicenceNumber)} value={c.drivingLicenceNumber} onChange={(e) => setC({ ...c, drivingLicenceNumber: e.target.value })} />, errors.drivingLicenceNumber, true)}
            {F("idp", "ID proof type", <select id="idp" required className={fieldCls(errors.idProofType)} value={c.idProofType} onChange={(e) => setC({ ...c, idProofType: e.target.value as BookingRequest["idProofType"] })}><option value="aadhaar">Aadhaar</option><option value="passport">Passport</option><option value="voter-id">Voter ID</option><option value="pan">PAN</option></select>, errors.idProofType, true)}
            <div className="sm:col-span-2">{F("msg", "Message (optional)", <textarea id="msg" rows={3} className={`${fieldCls()} py-2`} value={c.message} onChange={(e) => setC({ ...c, message: e.target.value })} />)}</div>
          </div>
        )}

        {step === 3 && car && est && (
          <div><h2 className="display mb-4 text-2xl sm:text-3xl">Review your request</h2>
            <dl className="divide-y divide-line border border-line bg-white text-sm">
              {([["Car", `${car.brand} ${car.model}`], ["Pickup", `${d.loc}, ${d.from} ${d.fromT}`], ["Return", `${d.to} ${d.toT}`], ["Name", c.fullName], ["Mobile", c.mobile], ["Email", c.email]] as const).map(([k, v]) => <div key={k} className="flex justify-between gap-4 p-3"><dt className="text-mute">{k}</dt><dd className="text-right font-medium">{v}</dd></div>)}
            </dl>
            <p className="mt-4 text-sm text-mute">Payment is collected offline. Our team will contact you to confirm availability and complete your booking.</p>
            {fail && <p role="alert" className="err mt-3">{fail}</p>}
          </div>
        )}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
          {step > 0 && <button type="button" className="btn btn-ghost w-full sm:w-auto" onClick={() => setStep(step - 1)}>Back</button>}
          {step < 3
            ? <button type="button" className="btn btn-dark w-full sm:w-auto" onClick={next}>Continue</button>
            : <button type="button" className="btn btn-primary w-full sm:w-auto" disabled={busy} onClick={submit}>{busy ? "Sending…" : "Send booking request"}</button>}
        </div>
      </div>

      <aside className="h-fit border border-line bg-white p-4 sm:p-5 lg:sticky lg:top-24" aria-label="Booking summary">
        <p className="display text-2xl">Summary</p>
        {car ? (<dl className="mt-4 space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-mute">Car</dt><dd>{car.brand} {car.model}</dd></div>
          <div className="flex justify-between"><dt className="text-mute">Price per day</dt><dd>{inr(car.pricePerDay)}</dd></div>
          {est && <><div className="flex justify-between"><dt className="text-mute">{est.days} {est.days === 1 ? "day" : "days"}</dt><dd>{inr(est.rental)}</dd></div>
            <div className="flex justify-between"><dt className="text-mute">Security deposit</dt><dd>{inr(est.deposit)}</dd></div>
            <div className="flex justify-between border-t border-line pt-2 font-semibold"><dt>Estimated total</dt><dd>{inr(est.total)}</dd></div></>}
        </dl>) : <p className="mt-3 text-sm text-mute">Choose a car to see an estimate.</p>}
      </aside>
    </div>
  );
}
