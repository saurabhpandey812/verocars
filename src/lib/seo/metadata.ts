import type { Metadata } from "next";
import { site } from "@/lib/constants/site";

export function buildMetadata(o: { title: string; description: string; path: string; image?: string; noindex?: boolean }): Metadata {
  const url = `${site.url}${o.path}`;
  const image = o.image ?? "/images/general/og-default.jpg";
  return {
    title: o.title,
    description: o.description,
    alternates: { canonical: url },
    robots: o.noindex ? { index: false, follow: false } : undefined,
    openGraph: { title: o.title, description: o.description, url, siteName: site.name, locale: "en_IN", type: "website", images: [{ url: image }] },
    twitter: { card: "summary_large_image", title: o.title, description: o.description, images: [image] },
  };
}
