"use client";
import { useState } from "react";
import { Field } from "@/components/ui/Field";
import { validateContact } from "@/lib/validations/contact";
import { whatsappLink } from "@/lib/utils/whatsapp";

type Values = { name: string; email: string; mobile: string; message: string };

export function ContactForm() {
  const [v, setV] = useState<Values>({ name: "", email: "", mobile: "", message: "" });
  const [errors, setErrors] = useState<ReturnType<typeof validateContact>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});

  const set =
    (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const next = { ...v, [k]: e.target.value };
      setV(next);
      if (touched[k] || errors[k]) setErrors(validateContact(next));
    };

  const blur = (k: keyof Values) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validateContact(v));
  };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, mobile: true, message: true });
    const er = validateContact(v);
    setErrors(er);
    if (!Object.keys(er).length) {
      window.open(
        whatsappLink(`Hello, I am ${v.name.trim()} (${v.mobile.trim()}, ${v.email.trim()}). ${v.message.trim()}`),
        "_blank",
        "noopener",
      );
    }
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-4 border border-line bg-white p-5 sm:p-8">
      <div>
        <p className="text-xs font-semibold tracking-[0.18em] text-brass-d uppercase">Message</p>
        <p className="display mt-1 text-2xl sm:text-3xl">Send us a note</p>
      </div>
      <Field id="name" label="Your name" autoComplete="name" required value={v.name} onChange={set("name")} onBlur={blur("name")} error={errors.name} placeholder="Full name" />
      <Field id="email" label="Email" type="email" autoComplete="email" required value={v.email} onChange={set("email")} onBlur={blur("email")} error={errors.email} placeholder="name@email.com" />
      <Field id="mobile" label="Mobile" type="tel" autoComplete="tel" required inputMode="numeric" value={v.mobile} onChange={set("mobile")} onBlur={blur("mobile")} error={errors.mobile} placeholder="10-digit number" />
      <div>
        <label htmlFor="message" className="label">
          Message <span className="text-[#b3261e]">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className={`field py-2 ${errors.message ? "!border-[#b3261e]" : ""}`}
          value={v.message}
          onChange={set("message")}
          onBlur={blur("message")}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-err" : undefined}
          placeholder="Tell us about dates, car type or any question…"
        />
        {errors.message && (
          <p id="message-err" role="alert" className="err">
            {errors.message}
          </p>
        )}
      </div>
      <button type="submit" className="btn btn-primary w-full sm:w-auto">
        Send on WhatsApp
      </button>
      <p className="text-xs text-mute">This opens WhatsApp with your message ready to send. We reply during business hours.</p>
    </form>
  );
}
