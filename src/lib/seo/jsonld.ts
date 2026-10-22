import { site } from "@/lib/constants/site";
import type { Car } from "@/types/car";

export const localBusinessLd = () => ({
  "@context": "https://schema.org",
  "@type": ["AutoRental", "LocalBusiness"],
  name: site.name, url: site.url, telephone: site.phone, email: site.email,
  address: { "@type": "PostalAddress", streetAddress: site.address.street, addressLocality: site.address.city, addressRegion: site.address.state, postalCode: site.address.postalCode, addressCountry: site.address.country },
  areaServed: site.serviceArea.map((name) => ({ "@type": "Place", name })),
  sameAs: Object.values(site.social).filter(Boolean),
});
export const websiteLd = () => ({ "@context": "https://schema.org", "@type": "WebSite", name: site.name, url: site.url });
export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org", "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
});
export const carListLd = (cars: Car[]) => ({
  "@context": "https://schema.org", "@type": "ItemList",
  itemListElement: cars.map((c, i) => ({ "@type": "ListItem", position: i + 1, url: `${site.url}/cars/${c.slug}`, name: `${c.brand} ${c.model}` })),
});
export const vehicleLd = (c: Car) => ({
  "@context": "https://schema.org", "@type": "Vehicle",
  name: `${c.brand} ${c.model}`, brand: { "@type": "Brand", name: c.brand }, model: c.model,
  vehicleModelDate: String(c.year), vehicleSeatingCapacity: c.seats, fuelType: c.fuel, vehicleTransmission: c.transmission,
  offers: { "@type": "Offer", price: c.pricePerDay, priceCurrency: "INR", url: `${site.url}/cars/${c.slug}` },
});
