import type { MetadataRoute } from "next";
import { site } from "@/lib/constants/site";
import { getCars } from "@/data/cars";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/cars", "/about", "/contact", "/booking", "/terms", "/privacy-policy"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7 })),
    ...getCars().map((c) => ({ url: `${site.url}/cars/${c.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
