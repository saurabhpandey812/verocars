"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/constants/site";

const links = [{ href: "/", label: "Home" }, { href: "/cars", label: "Cars" }, { href: "/about", label: "About" }, { href: "/contact", label: "Contact" }];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const overHero = pathname === "/" && !scrolled;

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 16);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`z-40 border-b transition-all ${
        overHero
          ? "absolute inset-x-0 top-0 border-transparent bg-transparent text-bone"
          : scrolled
            ? "sticky top-0 border-line bg-bone/95 text-ink backdrop-blur"
            : "sticky top-0 border-transparent bg-bone text-ink"
      }`}
    >
      <div className={`wrap flex items-center justify-between gap-3 transition-all ${scrolled ? "h-14" : "h-16 sm:h-[4.5rem]"}`}>
        <Link href="/" className="display min-w-0 truncate text-xl sm:text-2xl" aria-label={`${site.name} home`}>{site.name}</Link>
        <nav aria-label="Main" className="hidden items-center gap-6 text-sm font-medium lg:flex xl:gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={overHero ? "hover:text-brass" : "hover:text-brass-d"}>{l.label}</Link>
          ))}
          <Link href="/login" className={overHero ? "hover:text-brass" : "hover:text-brass-d"}>Login</Link>
          <Link href="/booking" className={`btn min-h-10 ${overHero ? "btn-primary" : "btn-dark"}`}>Book now</Link>
        </nav>
        <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center lg:hidden" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}><Menu /></button>
      </div>
      {open && (
        <div role="dialog" aria-modal="true" aria-label="Menu" className="fixed inset-0 z-50 flex flex-col bg-ink p-6 text-bone">
          <div className="flex items-center justify-between">
            <span className="display text-2xl">{site.name}</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu"><X /></button>
          </div>
          <nav className="mt-10 flex flex-col gap-5 display text-3xl sm:mt-12 sm:gap-6 sm:text-4xl">
            {links.map((l) => <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>)}
            <Link href="/login" onClick={() => setOpen(false)}>Login</Link>
          </nav>
          <Link href="/booking" onClick={() => setOpen(false)} className="btn btn-primary mt-auto w-full sm:w-auto">Book now</Link>
        </div>
      )}
    </header>
  );
}
