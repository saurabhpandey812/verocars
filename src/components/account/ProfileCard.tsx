import type { User } from "@/types/user";
export function ProfileCard({ user }: { user: User }) {
  return (
    <section aria-labelledby="profile" className="border border-line bg-white p-6">
      <h2 id="profile" className="display text-3xl">Profile</h2>
      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
        {([["Name", user.fullName], ["Mobile", user.mobile], ["Email", user.email]] as const).map(([k, v]) => <div key={k}><dt className="text-mute">{k}</dt><dd className="font-medium">{v}</dd></div>)}
      </dl>
    </section>
  );
}
