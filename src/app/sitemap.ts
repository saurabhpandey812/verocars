import type { MetadataRoute } from "next";
import { site } from "@/lib/constants/site";
import { getCars } from "@/data/cars";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "/cars", "/about", "/contact", "/booking", "/terms", "/privacy-policy"];
  const cars = await getCars();
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...cars.map((c) => ({ url: `${site.url}/cars/${c.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
