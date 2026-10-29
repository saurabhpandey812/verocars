import { AuthShell } from "@/components/auth/AuthShell";
import { AuthTabs } from "@/components/auth/AuthTabs";
import { safeNextPath } from "@/lib/auth/safe-next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Create your account",
  description: "Create a VEYRO CARS account to send booking requests and track them in one place.",
  path: "/register",
  noindex: true,
});

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const p = await searchParams;
  const next = safeNextPath(p.next);
  return (
    <AuthShell title="Join VEYRO CARS" intro="Create an account to send booking requests and track them in one place." eyebrow="VEYRO CARS">
      <AuthTabs initial="signup" next={next} />
    </AuthShell>
  );
}
