import { getCurrentUser } from "@/lib/auth/session";
import { buildMetadata } from "@/lib/seo/metadata";
import { ProfileCard } from "@/components/account/ProfileCard";
import { SignInPrompt } from "@/components/account/SignInPrompt";

export const metadata = buildMetadata({
  title: "Profile",
  description: "Your VEYRO CARS profile details.",
  path: "/account",
  noindex: true,
});

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) return <SignInPrompt next="/account" />;

  return (
    <div className="wrap grid gap-8 py-12">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-mute">Account</p>
        <h1 className="display mt-1 text-5xl">Hello, {user.fullName.split(" ")[0]}.</h1>
        <p className="mt-2 max-w-xl text-mute">Your profile details for bookings and updates.</p>
      </div>
      <ProfileCard user={user} />
    </div>
  );
}
