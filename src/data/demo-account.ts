import type { User } from "@/types/user";
import type { Booking } from "@/types/booking";

// DEMO ONLY. Shown when NEXT_PUBLIC_DEMO_ACCOUNT=true. Replace with real session + DB queries.
export const demoUser: User = { id: "usr_demo", fullName: "Demo Customer", mobile: "+91 98765 43210", email: "demo@example.com", role: "customer", createdAt: "2026-09-01T10:00:00Z" };
const base = { userId: "usr_demo", pickupLocation: "Lucknow city (Gomti Nagar)", fullName: "Demo Customer", mobile: "+91 98765 43210", email: "demo@example.com", drivingLicenceNumber: "UP3220000000000", idProofType: "aadhaar" as const };
export const demoBookings: Booking[] = [
  { ...base, id: "REQ-DEMO1", carSlug: "hyundai-creta", pickupAt: "2026-10-20T10:00", returnAt: "2026-10-23T10:00", status: "confirmed", estimatedTotal: 21400, createdAt: "2026-10-10T09:00:00Z" },
  { ...base, id: "REQ-DEMO2", carSlug: "maruti-swift", pickupAt: "2026-11-05T09:00", returnAt: "2026-11-06T09:00", status: "pending", estimatedTotal: 6800, createdAt: "2026-10-15T09:00:00Z" },
  { ...base, id: "REQ-DEMO3", carSlug: "honda-city", pickupAt: "2026-09-12T10:00", returnAt: "2026-09-14T10:00", status: "completed", estimatedTotal: 14400, createdAt: "2026-09-05T09:00:00Z" },
  { ...base, id: "REQ-DEMO4", carSlug: "kia-seltos", pickupAt: "2026-08-02T10:00", returnAt: "2026-08-03T10:00", status: "cancelled", estimatedTotal: 13800, createdAt: "2026-07-28T09:00:00Z" },
];
