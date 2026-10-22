"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/constants/site";
import { PendingLink } from "@/components/ui/PendingLink";

const slides = [
  { src: "/images/hero/slide-1.jpg", alt: "Black Scorpio self-drive rental on the highway" },
  { src: "/images/hero/slide-2.jpg", alt: "Swift Dzire ready for city drives in Lucknow" },
  { src: "/images/hero/slide-3.jpg", alt: "Ertiga for family trips out of Lucknow" },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % slides.length), 4500);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      className="relative isolate min-h-[88svh] overflow-hidden bg-ink text-bone"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured rental cars"
    >
      {slides.map((s, idx) => (
        <div
          key={s.src}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out ${idx === i ? "opacity-100" : "opacity-0"}`}
          aria-hidden={idx !== i}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            priority={idx === 0}
            sizes="100vw"
            className={`object-cover ${idx === i ? "hero-kenburns" : ""}`}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/35" />

      <div className="wrap relative z-10 flex min-h-[88svh] flex-col justify-end pb-24 pt-24 sm:pb-32 sm:pt-28 lg:justify-center lg:pb-36 lg:pt-20">
        <p className="rise text-sm tracking-wide text-bone/75">Self-drive in Lucknow</p>
        <h1 className="display rise rise-2 mt-3 max-w-3xl text-4xl leading-[1.05] sm:text-6xl md:text-7xl lg:text-[5.5rem]">{site.name}</h1>
        <p className="display rise rise-2 mt-3 max-w-xl text-xl text-bone/90 sm:mt-4 sm:text-3xl">Your city, your pace.</p>
        <p className="rise rise-3 mt-4 max-w-md text-base text-bone/75 sm:mt-5 sm:text-lg">Clean, well-kept cars you drive yourself — from a quick city run to a weekend away.</p>
        <div className="rise rise-3 mt-6 flex w-full flex-col gap-3 sm:mt-8 sm:w-auto sm:flex-row sm:flex-wrap">
          <PendingLink href="/cars" className="btn btn-primary w-full sm:w-auto">Explore cars</PendingLink>
          <PendingLink href="/booking" variant="booking" className="btn btn-ghost w-full border-bone/50 text-bone sm:w-auto">Book your ride</PendingLink>
        </div>

        <div className="mt-10 flex items-center gap-3" role="tablist" aria-label="Hero slides">
          {slides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              role="tab"
              aria-selected={idx === i}
              aria-label={`Show slide ${idx + 1}`}
              onClick={() => setI(idx)}
              className={`h-1.5 rounded-full transition-all ${idx === i ? "w-10 bg-brass" : "w-5 bg-bone/40 hover:bg-bone/70"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
