"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { CalendarDays, ChevronDown, LogOut, User } from "lucide-react";

export function UserProfileMenu({
  name,
  email,
  overHero = false,
}: {
  name: string;
  email: string;
  overHero?: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const parts = name.split(/\s+/).filter(Boolean);
  const initials =
    parts
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "?";
  const displayName = parts[0] ?? name;

  useEffect(() => {
    if (!open) return;
    function onDoc(e: MouseEvent) {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  async function signOut() {
    setBusy(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setOpen(false);
      router.push("/");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <div ref={root} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={menuId}
        aria-label="Account menu"
        className={`flex items-center gap-2 rounded-full py-1 text-sm ${
          overHero ? "text-bone hover:opacity-90" : "text-ink hover:opacity-80"
        }`}
      >
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[0.75rem] font-semibold tracking-wide ${
            overHero ? "bg-bone text-ink" : "bg-ink text-bone"
          }`}
        >
          {initials}
        </span>
        <span className="hidden max-w-[8rem] truncate font-semibold sm:block">{displayName}</span>
        <ChevronDown
          size={14}
          className={`hidden shrink-0 transition sm:block ${overHero ? "text-bone/70" : "text-mute"} ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="Account menu"
          className="absolute top-[calc(100%+0.4rem)] right-0 z-50 w-56 overflow-hidden border border-line bg-white text-ink shadow-[0_12px_28px_rgba(20,21,23,0.12)]"
        >
          <div className="border-b border-line px-3.5 py-3">
            <p className="truncate text-sm font-semibold">{name}</p>
            <p className="truncate text-xs text-mute">{email}</p>
          </div>
          <div className="p-1.5">
            <Link
              role="menuitem"
              href="/account"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-2.5 py-2 text-sm hover:bg-bone"
            >
              <User size={16} className="text-mute" aria-hidden />
              Profile
            </Link>
            <Link
              role="menuitem"
              href="/account/bookings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2.5 px-2.5 py-2 text-sm hover:bg-bone"
            >
              <CalendarDays size={16} className="text-mute" aria-hidden />
              Bookings
            </Link>
          </div>
          <div className="border-t border-line p-1.5">
            <button
              role="menuitem"
              type="button"
              disabled={busy}
              onClick={() => void signOut()}
              className="flex w-full items-center gap-2.5 px-2.5 py-2 text-sm hover:bg-bone disabled:opacity-60"
            >
              <LogOut size={16} className="text-mute" aria-hidden />
              {busy ? "Signing out…" : "Sign out"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
