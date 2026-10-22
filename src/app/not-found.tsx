import Link from "next/link";
export default function NotFound() {
  return (
    <main className="wrap grid min-h-[70vh] place-content-center gap-4 text-center">
      <h1 className="display text-6xl">Wrong turn.</h1>
      <p className="text-mute">We couldn’t find that page. The fleet is a good place to restart.</p>
      <Link href="/cars" className="btn btn-dark mx-auto">Browse cars</Link>
    </main>
  );
}
