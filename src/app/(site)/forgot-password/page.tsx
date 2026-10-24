import { AuthShell } from "@/components/auth/AuthShell";
import { ForgotForm } from "@/components/auth/ForgotForm";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({ title: "Reset your password", description: "Enter your email and we will send you a link to reset your password.", path: "/forgot-password", noindex: true });

export default function Page() {
  return (
    <AuthShell title="Reset your password" intro="Enter your email and we will send you a link to reset your password." eyebrow="VEYRO CARS">
      <ForgotForm />
    </AuthShell>
  );
}
