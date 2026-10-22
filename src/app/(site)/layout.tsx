import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessLd, websiteLd } from "@/lib/seo/jsonld";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <JsonLd data={localBusinessLd()} /><JsonLd data={websiteLd()} />
      <Navbar /><main>{children}</main><Footer />
    </>
  );
}
