import type { MetadataRoute } from "next";
import { site } from "@/lib/constants/site";
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/", disallow: ["/account", "/login", "/register", "/forgot-password", "/admin", "/api"] }], sitemap: `${site.url}/sitemap.xml` };
}
