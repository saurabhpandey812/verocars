"use client";
import Link from "next/link";
import { useState } from "react";
import { Field } from "@/components/ui/Field";
import { validateEmailOnly } from "@/lib/validations/auth";
import { useAuthSubmit } from "./useAuthSubmit";

export function ForgotForm() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ email?: string }>({});
  const [touched, setTouched] = useState(false);
  const { busy, notice, send } = useAuthSubmit("forgot-password");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    const er = validateEmailOnly(email);
    setErrors(er);
    if (!Object.keys(er).length) void send({ email: email.trim() });
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-4">
      <Field
        id="email"
        label="Email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (touched) setErrors(validateEmailOnly(e.target.value));
        }}
        onBlur={() => {
          setTouched(true);
          setErrors(validateEmailOnly(email));
        }}
        error={errors.email}
        placeholder="name@email.com"
      />
      <button type="submit" className="btn btn-dark w-full" disabled={busy}>
        {busy ? "Sending…" : "Send reset link"}
      </button>
      {notice && (
        <p role="status" className="border border-line bg-white p-3 text-sm">
          {notice}
        </p>
      )}
      <p className="text-sm text-mute">
        <Link href="/login" className="underline underline-offset-2">
          Back to sign in
        </Link>
      </p>
    </form>
  );
}
