import { getCurrentUser } from "@/lib/auth/session";
import { getBookingsForUser } from "@/lib/bookings";
import { buildMetadata } from "@/lib/seo/metadata";
import { BookingList } from "@/components/account/BookingList";
import { SignInPrompt } from "@/components/account/SignInPrompt";

export const metadata = buildMetadata({ title: "My bookings", description: "Your booking requests and rental history.", path: "/account/bookings", noindex: true });

export default async function BookingsPage() {
  const user = await getCurrentUser();
  if (!user) return <SignInPrompt />;
  const all = await getBookingsForUser(user.id);
  return (
    <div className="wrap grid gap-6 py-12">
      <h1 className="display text-5xl">My bookings</h1>
      <BookingList bookings={all} empty="You haven’t sent a booking request yet." />
    </div>
  );
}
