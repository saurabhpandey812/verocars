import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCurrentUser } from "@/lib/auth/session";
import { localBusinessLd, websiteLd } from "@/lib/seo/jsonld";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();
  return (
    <>
      <JsonLd data={localBusinessLd()} />
      <JsonLd data={websiteLd()} />
      <Navbar user={user ? { fullName: user.fullName, email: user.email } : null} />
      <main>{children}</main>
      <Footer />
    </>
  );
}
