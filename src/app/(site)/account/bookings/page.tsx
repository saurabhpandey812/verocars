import { getCurrentUser } from "@/lib/auth/session";
import { getBookingsForUser } from "@/lib/bookings";
import { buildMetadata } from "@/lib/seo/metadata";
import { BookingList } from "@/components/account/BookingList";
import { SignInPrompt } from "@/components/account/SignInPrompt";

export const metadata = buildMetadata({
  title: "Bookings",
  description: "Your upcoming, active and past booking requests.",
  path: "/account/bookings",
  noindex: true,
});

export default async function BookingsPage() {
  const user = await getCurrentUser();
  if (!user) return <SignInPrompt next="/account/bookings" />;

  const all = await getBookingsForUser(user.id);
  const now = new Date().toISOString().slice(0, 16);

  const active = all.filter((b) => b.status === "confirmed" && b.pickupAt <= now && b.returnAt >= now);
  const upcoming = all.filter((b) => (b.status === "confirmed" || b.status === "pending") && b.pickupAt > now);
  const past = all.filter(
    (b) =>
      b.status === "completed" ||
      b.status === "cancelled" ||
      ((b.status === "confirmed" || b.status === "pending") && b.returnAt < now),
  );

  const hasAny = active.length + upcoming.length + past.length > 0;

  return (
    <div className="wrap grid gap-8 py-12">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-mute">Account</p>
        <h1 className="display mt-1 text-5xl">Bookings</h1>
        <p className="mt-2 max-w-xl text-mute">Active trips, upcoming requests, and your booking history.</p>
      </div>

      {!hasAny && <BookingList bookings={[]} empty="No bookings yet. Pick a car for your next trip." />}

      {active.length > 0 && (
        <section aria-labelledby="active-bookings">
          <h2 id="active-bookings" className="display mb-3 text-3xl">
            Active now
          </h2>
          <BookingList bookings={active} empty="" />
        </section>
      )}

      {upcoming.length > 0 && (
        <section aria-labelledby="upcoming-bookings">
          <h2 id="upcoming-bookings" className="display mb-3 text-3xl">
            Upcoming
          </h2>
          <BookingList bookings={upcoming} empty="" />
        </section>
      )}

      {past.length > 0 && (
        <section aria-labelledby="past-bookings">
          <h2 id="past-bookings" className="display mb-3 text-3xl">
            Past bookings
          </h2>
          <BookingList bookings={past} empty="" />
        </section>
      )}
    </div>
  );
}
