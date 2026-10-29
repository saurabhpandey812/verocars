import Link from "next/link";
import { site } from "@/lib/constants/site";
import { whatsappLink } from "@/lib/utils/whatsapp";

const cols = [
  { h: "Rent", l: [["Cars", "/cars"], ["Book a car", "/booking"], ["My bookings", "/account/bookings"]] },
  { h: "Company", l: [["About", "/about"], ["Contact", "/contact"]] },
  { h: "Legal", l: [["Terms", "/terms"], ["Privacy policy", "/privacy-policy"]] },
] as const;

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-bone">
      <div className="wrap grid gap-10 py-12 sm:py-14 md:grid-cols-2 lg:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div className="md:col-span-2 lg:col-span-1">
          <p className="display text-2xl sm:text-3xl">{site.name}</p>
          <p className="mt-3 max-w-xs text-sm text-bone/65">Self-drive cars in {site.address.city}, with clear pricing and a team you can reach on WhatsApp.</p>
          <a href={whatsappLink("Hello, I have a question about self-drive rental in Lucknow.")} className="btn btn-primary mt-5 w-full sm:w-auto">WhatsApp us</a>
        </div>
        {cols.map((c) => (
          <nav key={c.h} aria-label={c.h}>
            <p className="text-sm font-semibold">{c.h}</p>
            <ul className="mt-3 space-y-2 text-sm text-bone/65">{c.l.map(([t, h]) => <li key={h}><Link href={h} className="hover:text-bone">{t}</Link></li>)}</ul>
          </nav>
        ))}
      </div>
      <div className="wrap flex flex-col gap-2 border-t border-bone/15 py-6 text-xs text-bone/55 sm:flex-row sm:justify-between">
        <p>Serving {site.serviceArea.join(", ")}.</p>
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
