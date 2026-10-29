"use client";

import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";

type Tab = "signin" | "signup";

export function AuthTabs({ initial = "signin", next }: { initial?: Tab; next?: string }) {
  const [tab, setTab] = useState<Tab>(initial);

  return (
    <div>
      <div role="tablist" aria-label="Account" className="mb-8 grid grid-cols-2 gap-1 border-b border-line">
        {(
          [
            ["signin", "Sign in"],
            ["signup", "Sign up"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={tab === id}
            id={`tab-${id}`}
            onClick={() => setTab(id)}
            className={`pb-3 text-sm font-semibold transition-colors ${
              tab === id ? "border-b-2 border-brass text-ink" : "text-mute hover:text-ink"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div role="tabpanel" aria-labelledby={`tab-${tab}`} key={tab}>
        {tab === "signin" ? <LoginForm embed next={next} /> : <RegisterForm embed next={next} />}
      </div>
    </div>
  );
}
