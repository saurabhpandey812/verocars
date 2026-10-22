import { LegalPage } from "@/components/layout/LegalPage";
import { buildMetadata } from "@/lib/seo/metadata";
import { site } from "@/lib/constants/site";

export const metadata = buildMetadata({ title: "Rental Terms and Conditions", description: "Eligibility, deposit, fuel, damage, fines, cancellation and offline payment terms for self-drive rentals in Lucknow.", path: "/terms" });

export default function Terms() {
  return (
    <LegalPage title="Terms and conditions" intro={`These terms apply to every self-drive rental from ${site.name}. Please read them before sending a booking request.`} sections={[
      { h: "Eligibility", p: ["The renter must be at least [minimum age] years old and hold a valid driving licence for the car category for at least [number] year(s)."] },
      { h: "Driving licence and ID verification", p: ["We verify the original driving licence and a government ID at pickup. A booking request is not a confirmed booking until our team confirms it."] },
      { h: "Security deposit", p: ["A refundable security deposit is collected at pickup, as shown on each car page. It is returned after inspection, minus any deductions for damage, fines or fuel. Refund timeline: [days]."] },
      { h: "Fuel", p: ["The car is handed over with a stated fuel level and must be returned at the same level. Missing fuel is charged at [rate]."] },
      { h: "Late return", p: ["Returns after the agreed time are charged [hourly rate] per hour. Please tell us early if you need an extension; it depends on availability."] },
      { h: "Damage", p: ["The renter is responsible for damage during the rental, up to [limit] where insurance applies. We record the car’s condition with photos at pickup and return."] },
      { h: "Traffic fines and tolls", p: ["Challans, tolls and parking charges during the rental are the renter’s responsibility and may be deducted from the deposit."] },
      { h: "Accident and breakdown", p: ["In an accident, ensure safety, call emergency services if needed, then contact us immediately on the number below. Do not admit liability or authorise repairs. Breakdown support: [details]."] },
      { h: "Cancellation", p: ["Cancellation policy: [free cancellation window and charges]."] },
      { h: "Payment", p: ["Payment is collected offline. Our team will explain accepted methods when confirming your booking. No online payment is taken on this website."] },
      { h: "Vehicle usage", p: ["The car may be driven only by the renter named in the booking, within [permitted area], and not for racing, towing, commercial passenger transport or any illegal use. Smoking is not allowed in the car."] },
      { h: "Contact and governing law", p: [`Questions: ${site.email} or ${site.phone}. These terms are governed by the laws of India, with courts at [city] having jurisdiction.`] },
    ]} />
  );
}
