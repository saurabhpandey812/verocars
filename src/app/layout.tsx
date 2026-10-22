import type { Metadata } from "next";
import { Inter_Tight, Oswald } from "next/font/google";
import { site } from "@/lib/constants/site";
import "./globals.css";

const body = Inter_Tight({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const disp = Oswald({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-disp", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `Self Drive Car Rental in Lucknow | ${site.name}`, template: `%s | ${site.name}` },
  description: "Well-maintained self-drive cars in Lucknow for city drives, business travel and weekend trips. Browse the fleet and send a booking request.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${body.variable} ${disp.variable}`}>
      <body>{children}</body>
    </html>
  );
}
