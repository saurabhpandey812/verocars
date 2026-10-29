import Link from "next/link";

export function SignInPrompt({ next = "/account/bookings" }: { next?: string }) {
  const loginHref = `/login?next=${encodeURIComponent(next)}`;
  const registerHref = `/register?next=${encodeURIComponent(next)}`;
  return (
    <div className="wrap grid min-h-[60vh] place-content-center gap-4 text-center">
      <h1 className="display text-5xl">Sign in to see your bookings.</h1>
      <p className="mx-auto max-w-md text-mute">Your profile and booking requests appear here after you sign in.</p>
      <div className="flex justify-center gap-3">
        <Link href={loginHref} className="btn btn-dark">
          Sign in
        </Link>
        <Link href={registerHref} className="btn btn-ghost">
          Create account
        </Link>
      </div>
    </div>
  );
}
