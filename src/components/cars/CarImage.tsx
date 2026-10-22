"use client";
import Image from "next/image";
import { useState } from "react";

export function CarImage({ src, alt, label, priority, sizes }: { src: string; alt: string; label: string; priority?: boolean; sizes?: string }) {
  const [bad, setBad] = useState(false);
  if (bad) return <div role="img" aria-label={alt} className="absolute inset-0 grid place-items-center bg-ink-2 p-4 text-center font-display text-2xl text-bone/60">{label}</div>;
  return <Image src={src} alt={alt} fill priority={priority} sizes={sizes ?? "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"} className="object-cover" onError={() => setBad(true)} />;
}
