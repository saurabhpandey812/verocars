import { LegalPage } from "@/components/layout/LegalPage";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/constants/site";

export const metadata = buildMetadata({ title: "Privacy Policy", description: "How we collect, use and protect your personal information when you book a self-drive car in Lucknow.", path: "/privacy-policy" });

export default function Privacy() {
  return (
    <LegalPage title="Privacy policy" intro={`This policy explains how ${site.name} handles your personal information.`} sections={[
      { h: "What we collect", p: ["Name, mobile number, email, driving licence number, ID proof type and details, booking dates and any message you send us."] },
      { h: "How we use it", p: ["To verify your eligibility, confirm and manage bookings, contact you about your rental and meet legal obligations."] },
      { h: "Sharing", p: ["We do not sell your data. We share it only with service providers we need to run the business [list providers] or when the law requires it."] },
      { h: "Storage and security", p: ["We keep your data only as long as needed for the rental and legal purposes [retention period], and protect it with reasonable technical and organisational safeguards."] },
      { h: "Your choices", p: ["You can ask to access, correct or delete your information, subject to legal record-keeping requirements. Contact us using the details below."] },
      { h: "Cookies", p: ["We use only the cookies needed for the site to work [update if analytics are added]."] },
      { h: "Contact", p: [`${site.email} · ${site.phone} · ${site.address.street}, ${site.address.city}. Grievance officer: [name].`] },
    ]} />
  );
}
