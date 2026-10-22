import type { BookingRequest } from "@/types/booking";
import { validateEmail, validateLicence, validateMobile, validateName } from "./common";

export type Errors = Partial<Record<keyof BookingRequest, string>>;

export function validateTrip(v: Pick<BookingRequest, "pickupLocation" | "pickupAt" | "returnAt">): Errors {
  const e: Errors = {};
  if (!v.pickupLocation?.trim()) e.pickupLocation = "Choose a pickup location.";
  if (!v.pickupAt || v.pickupAt.startsWith("T") || v.pickupAt.endsWith("T")) e.pickupAt = "Choose a pickup date and time.";
  if (!v.returnAt || v.returnAt.startsWith("T") || v.returnAt.endsWith("T")) e.returnAt = "Choose a return date and time.";
  else if (!e.pickupAt && v.returnAt <= v.pickupAt) e.returnAt = "Return must be after pickup.";
  return e;
}

export function validateCustomer(v: BookingRequest): Errors {
  const e: Errors = {};
  const name = validateName(v.fullName, "Full name");
  const mobile = validateMobile(v.mobile);
  const email = validateEmail(v.email);
  const licence = validateLicence(v.drivingLicenceNumber);
  if (name) e.fullName = name;
  if (mobile) e.mobile = mobile;
  if (email) e.email = email;
  if (licence) e.drivingLicenceNumber = licence;
  if (!v.idProofType) e.idProofType = "Choose an ID proof type.";
  return e;
}
