"use client";
import Link from "next/link";
import { useState } from "react";
import { Field } from "@/components/ui/Field";
import { PasswordField } from "@/components/ui/PasswordField";
import { validateRegister } from "@/lib/validations/auth";
import { useAuthSubmit } from "./useAuthSubmit";

type Values = { fullName: string; mobile: string; email: string; password: string; confirm: string };

export function RegisterForm({ embed = false }: { embed?: boolean }) {
  const [v, setV] = useState<Values>({ fullName: "", mobile: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<ReturnType<typeof validateRegister>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const { busy, notice, send } = useAuthSubmit("register");

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = { ...v, [k]: e.target.value };
    setV(next);
    if (touched[k] || errors[k]) setErrors(validateRegister(next));
  };

  const blur = (k: keyof Values) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validateRegister(v));
  };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ fullName: true, mobile: true, email: true, password: true, confirm: true });
    const er = validateRegister(v);
    setErrors(er);
    if (!Object.keys(er).length) {
      void send({
        fullName: v.fullName.trim(),
        mobile: v.mobile.trim(),
        email: v.email.trim(),
        password: v.password,
        confirm: v.confirm,
      });
    }
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      <Field id="fullName" label="Full name" autoComplete="name" required value={v.fullName} onChange={set("fullName")} onBlur={blur("fullName")} error={errors.fullName} placeholder="As on your licence" />
      <Field id="mobile" label="Mobile" type="tel" autoComplete="tel" required inputMode="numeric" value={v.mobile} onChange={set("mobile")} onBlur={blur("mobile")} error={errors.mobile} placeholder="10-digit number" />
      <Field id="email" label="Email" type="email" autoComplete="email" required value={v.email} onChange={set("email")} onBlur={blur("email")} error={errors.email} placeholder="name@email.com" />
      <PasswordField id="password" label="Password" autoComplete="new-password" required value={v.password} onChange={set("password")} onBlur={blur("password")} error={errors.password} hint="At least 8 characters, with a letter and a number." />
      <PasswordField id="confirm" label="Confirm password" autoComplete="new-password" required value={v.confirm} onChange={set("confirm")} onBlur={blur("confirm")} error={errors.confirm} />
      <button type="submit" className="btn btn-dark w-full" disabled={busy}>
        {busy ? "Creating account…" : "Create account"}
      </button>
      {notice && (
        <p role="status" className="border border-line bg-white p-3 text-sm">
          {notice}
        </p>
      )}
      {!embed && (
        <p className="text-sm text-mute">
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-2">
            Sign in
          </Link>
        </p>
      )}
    </form>
  );
}
