"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useAuthSubmit(action: "login" | "register" | "forgot-password", next?: string) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [ok, setOk] = useState(false);

  async function send(body: object) {
    setBusy(true);
    setNotice("");
    setOk(false);
    try {
      const res = await fetch(`/api/auth/${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next ? { ...body, next } : body),
      });
      const json = (await res.json()) as { ok?: boolean; message?: string; redirect?: string };
      setOk(Boolean(json.ok));
      setNotice(json.message ?? (res.ok ? "Done." : "Something went wrong."));
      if (json.ok && json.redirect) {
        router.push(json.redirect);
        router.refresh();
      }
    } catch {
      setNotice("Network error. Check your connection and try again.");
    } finally {
      setBusy(false);
    }
  }

  return { busy, notice, ok, send };
}
