"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Menu, X } from "lucide-react";
import { site } from "@/lib/constants/site";
import { PendingLink } from "@/components/ui/PendingLink";
import { UserProfileMenu } from "@/components/account/UserProfileMenu";

const links = [
  { href: "/", label: "Home" },
  { href: "/cars", label: "Cars" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

type NavUser = { fullName: string; email: string };

export function Navbar({ user = null }: { user?: NavUser | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const isHome = pathname === "/";
  const overHero = isHome && !scrolled;
  const signedIn = Boolean(user);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      setScrolled(window.scrollY > 24);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", esc);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.removeEventListener("keydown", esc);
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkHover = overHero ? "hover:text-brass" : "hover:text-brass-d";

  async function signOut() {
    setSigningOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setOpen(false);
      router.push("/");
      router.refresh();
    } finally {
      setSigningOut(false);
    }
  }

  const drawer =
    open &&
    mounted &&
    createPortal(
      <div className="lg:hidden" role="presentation">
        <button
          type="button"
          className="drawer-backdrop fixed inset-0 z-[100] bg-ink/70"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="drawer-panel fixed inset-y-0 left-0 z-[110] flex w-72 max-w-[85vw] flex-col bg-ink p-6 text-bone shadow-2xl"
        >
          <div className="flex items-center justify-between gap-3">
            <span className="display text-2xl">{site.name}</span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex min-h-11 min-w-11 items-center justify-center"
            >
              <X />
            </button>
          </div>
          <nav className="mt-10 flex flex-col gap-5 display text-3xl sm:mt-12 sm:gap-6 sm:text-4xl">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
            {signedIn ? (
              <>
                <Link href="/account" onClick={() => setOpen(false)}>
                  Profile
                </Link>
                <Link href="/account/bookings" onClick={() => setOpen(false)}>
                  Bookings
                </Link>
                <button
                  type="button"
                  onClick={() => void signOut()}
                  disabled={signingOut}
                  className="text-left disabled:opacity-60"
                >
                  {signingOut ? "Signing out…" : "Sign out"}
                </button>
              </>
            ) : (
              <Link href="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
            )}
          </nav>
          <PendingLink href="/booking" variant="booking" onClick={() => setOpen(false)} className="btn btn-primary mt-auto w-full">
            Book now
          </PendingLink>
        </div>
      </div>,
      document.body,
    );

  return (
    <>
      {!isHome && <div aria-hidden className="h-16 sm:h-[4.5rem]" />}
      <header
        className={`navbar-bar fixed inset-x-0 top-0 z-40 border-b ${
          overHero
            ? "border-transparent bg-transparent text-bone shadow-none"
            : scrolled
              ? "border-line/80 bg-bone/90 text-ink shadow-[0_8px_30px_rgba(20,21,23,0.06)] backdrop-blur-md"
              : "border-transparent bg-bone text-ink shadow-none"
        }`}
      >
        <div className={`wrap flex items-center justify-between gap-3 navbar-inner ${scrolled ? "is-compact" : ""}`}>
          <Link href="/" className="display min-w-0 truncate text-xl sm:text-2xl" aria-label={`${site.name} home`}>
            {site.name}
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-6 text-sm font-medium lg:flex xl:gap-8">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className={linkHover}>
                {l.label}
              </Link>
            ))}
            {!signedIn && (
              <Link href="/login" className={linkHover}>
                Login
              </Link>
            )}
            <PendingLink href="/booking" variant="booking" className={`btn min-h-10 ${overHero ? "btn-primary" : "btn-dark"}`}>
              Book now
            </PendingLink>
            {user && <UserProfileMenu name={user.fullName} email={user.email} overHero={overHero} />}
          </nav>
          <div className="flex items-center gap-2 lg:hidden">
            {user && <UserProfileMenu name={user.fullName} email={user.email} overHero={overHero} />}
            <button
              type="button"
              className="inline-flex min-h-11 min-w-11 items-center justify-center"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              <Menu />
            </button>
          </div>
        </div>
      </header>
      {drawer}
    </>
  );
}
