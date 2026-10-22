import Link from "next/link";
import { getCurrentUser } from "@/lib/auth/session";
import { getBookingsForUser } from "@/lib/bookings";
import { buildMetadata } from "@/lib/seo/metadata";
import { ProfileCard } from "@/components/account/ProfileCard";
import { BookingList } from "@/components/account/BookingList";
import { SignInPrompt } from "@/components/account/SignInPrompt";

export const metadata = buildMetadata({ title: "My account", description: "Your profile and booking requests.", path: "/account", noindex: true });

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) return <SignInPrompt />;
  const all = await getBookingsForUser(user.id);
  const now = new Date().toISOString().slice(0, 16);
  const active = all.filter((b) => b.status === "confirmed" && b.pickupAt <= now && b.returnAt >= now);
  const upcoming = all.filter((b) => (b.status === "confirmed" || b.status === "pending") && b.pickupAt > now);
  return (
    <div className="wrap grid gap-8 py-12">
      <h1 className="display text-5xl">Hello, {user.fullName.split(" ")[0]}.</h1>
      <ProfileCard user={user} />
      <section aria-labelledby="current"><h2 id="current" className="display mb-3 text-3xl">Current booking</h2><BookingList bookings={active} empty="You have no car on the road right now." /></section>
      <section aria-labelledby="upcoming"><h2 id="upcoming" className="display mb-3 text-3xl">Upcoming</h2><BookingList bookings={upcoming} empty="No upcoming bookings. Pick a car for your next trip." /></section>
      <Link href="/account/bookings" className="font-semibold underline underline-offset-4">View all bookings and history</Link>
    </div>
  );
}
