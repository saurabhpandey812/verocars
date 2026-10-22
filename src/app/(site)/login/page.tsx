import { AuthShell } from "@/components/auth/AuthShell";
import { AuthTabs } from "@/components/auth/AuthTabs";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Sign in",
  description: "Sign in or create a VEYORA CARS account to continue booking and track your requests.",
  path: "/login",
  noindex: true,
});

export default function Page() {
  return (
    <AuthShell title="Welcome back" intro="Sign in to continue, or create an account if you are new." eyebrow="VEYORA CARS">
      <AuthTabs initial="signin" />
    </AuthShell>
  );
}
