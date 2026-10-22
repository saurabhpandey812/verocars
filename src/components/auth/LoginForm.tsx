"use client";
import Link from "next/link";
import { useState } from "react";
import { Field } from "@/components/ui/Field";
import { validateLogin } from "@/lib/validations/auth";
import { useAuthSubmit } from "./useAuthSubmit";

type Values = { identifier: string; password: string };

export function LoginForm({ embed = false }: { embed?: boolean }) {
  const [v, setV] = useState<Values>({ identifier: "", password: "" });
  const [errors, setErrors] = useState<ReturnType<typeof validateLogin>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const { busy, notice, send } = useAuthSubmit("login");

  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = { ...v, [k]: e.target.value };
    setV(next);
    if (touched[k] || errors[k]) setErrors(validateLogin(next));
  };

  const blur = (k: keyof Values) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(validateLogin(v));
  };

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ identifier: true, password: true });
    const er = validateLogin(v);
    setErrors(er);
    if (!Object.keys(er).length) void send({ identifier: v.identifier.trim() });
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      <Field
        id="identifier"
        label="Email or mobile"
        autoComplete="username"
        required
        value={v.identifier}
        onChange={set("identifier")}
        onBlur={blur("identifier")}
        error={errors.identifier}
        placeholder="name@email.com or 98xxxxxxxx"
      />
      <Field
        id="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        required
        value={v.password}
        onChange={set("password")}
        onBlur={blur("password")}
        error={errors.password}
      />
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" name="remember" className="accent-brass" /> Remember me
        </label>
        <Link href="/forgot-password" className="underline underline-offset-2">
          Forgot password?
        </Link>
      </div>
      <button type="submit" className="btn btn-dark w-full" disabled={busy}>
        {busy ? "Signing in…" : "Sign in"}
      </button>
      {notice && (
        <p role="status" className="border border-line bg-white p-3 text-sm">
          {notice}
        </p>
      )}
      {!embed && (
        <p className="text-sm text-mute">
          New here?{" "}
          <Link href="/register" className="underline underline-offset-2">
            Create an account
          </Link>
        </p>
      )}
    </form>
  );
}
