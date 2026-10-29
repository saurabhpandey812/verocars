import { AuthShell } from "@/components/auth/AuthShell";
import { AuthTabs } from "@/components/auth/AuthTabs";
import { safeNextPath } from "@/lib/auth/safe-next";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Sign in",
  description: "Sign in or create a VEYRO CARS account to continue booking and track your requests.",
  path: "/login",
  noindex: true,
});

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const p = await searchParams;
  const next = safeNextPath(p.next);
  return (
    <AuthShell title="Welcome back" intro="Sign in to continue, or create an account if you are new." eyebrow="VEYRO CARS">
      <AuthTabs initial="signin" next={next} />
    </AuthShell>
  );
}
