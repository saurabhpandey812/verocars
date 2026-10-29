import type { Booking } from "@/types/booking";

export type BookingWindow = { carSlug: string; pickupAt: string; returnAt: string; status?: Booking["status"] };

const BLOCKING: Booking["status"][] = ["pending", "confirmed"];

export function dayPart(iso: string) {
  return iso.slice(0, 10);
}

/** True if two [start,end] datetime ranges overlap (half-open on exact equal end=start is no overlap). */
export function rangesOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  return aStart < bEnd && bStart < aEnd;
}

export function isBlockingStatus(status: Booking["status"]) {
  return BLOCKING.includes(status);
}

/** Car has a pending/confirmed booking overlapping the requested trip. */
export function carBookedForRange(carSlug: string, blocks: BookingWindow[], pickupAt: string, returnAt: string) {
  if (!pickupAt || !returnAt || returnAt <= pickupAt) return false;
  return blocks.some(
    (b) =>
      b.carSlug === carSlug &&
      (!b.status || isBlockingStatus(b.status)) &&
      rangesOverlap(pickupAt, returnAt, b.pickupAt, b.returnAt),
  );
}

export function busySlugsForRange(blocks: BookingWindow[], pickupAt: string, returnAt: string) {
  const set = new Set<string>();
  if (!pickupAt || !returnAt || returnAt <= pickupAt) return set;
  for (const b of blocks) {
    if (b.status && !isBlockingStatus(b.status)) continue;
    if (rangesOverlap(pickupAt, returnAt, b.pickupAt, b.returnAt)) set.add(b.carSlug);
  }
  return set;
}

export function toWindow(b: Pick<Booking, "carSlug" | "pickupAt" | "returnAt" | "status">): BookingWindow {
  return { carSlug: b.carSlug, pickupAt: b.pickupAt, returnAt: b.returnAt, status: b.status };
}
