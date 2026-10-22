"use client";
import { useState } from "react";

export function useAuthSubmit(action: "login" | "register" | "forgot-password") {
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  async function send(body: object) {
    setBusy(true); setNotice("");
    try {
      const res = await fetch(`/api/auth/${action}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
      const json = (await res.json()) as { message?: string };
      setNotice(json.message ?? "Done.");
    } catch { setNotice("Network error. Check your connection and try again."); }
    finally { setBusy(false); }
  }
  return { busy, notice, send };
}
