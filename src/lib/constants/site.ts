import { publicEnv } from "@/config";

// Single source of truth for business details. Replace placeholders here only.
export const site = {
  name: "VEYRO CARS",
  tagline: "Drive your way, across Lucknow.",
  url: publicEnv.siteUrl,
  phone: "+91-00000-00000",
  whatsapp: "910000000000", // country code + number, no symbols
  email: "hello@example.com",
  address: { street: "[Street address]", city: "Lucknow", state: "Uttar Pradesh", postalCode: "[PIN]", country: "IN" },
  serviceArea: ["Lucknow", "Gomti Nagar", "Hazratganj", "Alambagh"], // confirm before publishing
  hours: "Daily, 8:00 AM – 9:00 PM", // placeholder
  social: { instagram: "", facebook: "", youtube: "" },
} as const;
