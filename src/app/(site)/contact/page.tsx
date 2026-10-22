import Link from "next/link";
import { MapPin, MessageCircle, Phone, Mail, Clock } from "lucide-react";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/constants/site";
import { whatsappLink } from "@/lib/utils/whatsapp";
import { ContactForm } from "@/components/home/ContactForm";
import { CarImage } from "@/components/cars/CarImage";

export const metadata = buildMetadata({
  title: "Contact Us",
  description: `Call, WhatsApp or visit ${site.name} for self-drive car rental in ${site.address.city}. Business hours, address and service area.`,
  path: "/contact",
});

export default function Contact() {
  const a = site.address;
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${a.street}, ${a.city}`)}`;
  const rows = [
    [Phone, "Phone", site.phone, `tel:${site.phone.replace(/[^+\d]/g, "")}`],
    [MessageCircle, "WhatsApp", "Chat with us", whatsappLink("Hello, I have a question about self-drive rental in Lucknow.")],
    [Mail, "Email", site.email, `mailto:${site.email}`],
  ] as const;

  return (
    <div>
      <section className="relative overflow-hidden bg-ink text-bone">
        <div className="absolute inset-0">
          <CarImage src="/images/about/lucknow-drive.jpg" alt="" label={site.name} sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/45" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/40" />
        </div>
        <div className="wrap relative py-16 sm:py-20 lg:py-24">
          <p className="text-sm tracking-[0.2em] text-brass">VEYORA CARS · LUCKNOW</p>
          <h1 className="display mt-3 max-w-2xl text-4xl sm:text-5xl md:text-6xl">Talk to us</h1>
          <p className="mt-4 max-w-lg text-bone/75">
            Questions about a car, dates or documents? Reach us any way that suits you, or{" "}
            <Link href="/booking" className="underline underline-offset-2">
              send a booking request
            </Link>
            .
          </p>
        </div>
      </section>

      <div className="wrap grid gap-10 py-12 lg:grid-cols-2 lg:gap-14 lg:py-16">
        <div className="grid content-start gap-4">
          <p className="text-xs font-semibold tracking-[0.18em] text-brass-d uppercase">Reach us</p>
          <p className="display text-3xl sm:text-4xl">Direct lines</p>
          {rows.map(([Icon, k, v, href]) => (
            <a
              key={k}
              href={href}
              className="flex items-center gap-4 border border-line bg-white p-4 transition-colors hover:border-brass"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center bg-ink text-bone">
                <Icon size={18} aria-hidden />
              </span>
              <span>
                <span className="block text-xs text-mute">{k}</span>
                <span className="font-medium">{v}</span>
              </span>
            </a>
          ))}
          <div className="flex items-start gap-4 border border-line bg-white p-4">
            <span className="grid h-10 w-10 shrink-0 place-items-center bg-ink text-bone">
              <Clock size={18} aria-hidden />
            </span>
            <span>
              <span className="block text-xs text-mute">Business hours</span>
              <span className="font-medium">{site.hours}</span>
            </span>
          </div>

          <a href={mapUrl} className="relative mt-2 block overflow-hidden bg-ink text-bone">
            <div className="relative aspect-[16/9]">
              <CarImage
                src="/images/about/lucknow-drive.jpg"
                alt={`Service area around ${a.city}`}
                label={a.city}
                sizes="(min-width:1024px) 40vw, 100vw"
              />
              <div className="absolute inset-0 bg-ink/55" />
            </div>
            <span className="flex items-start gap-4 p-6">
              <MapPin size={20} aria-hidden />
              <span>
                <span className="display block text-2xl sm:text-3xl">{a.city}</span>
                <span className="text-bone/70">
                  {a.street}, {a.city}, {a.state} {a.postalCode}
                </span>
                <span className="mt-2 block text-sm text-bone/70">
                  Serving {site.serviceArea.join(", ")}. Open in Maps.
                </span>
              </span>
            </span>
          </a>
        </div>

        <ContactForm />
      </div>
    </div>
  );
}
