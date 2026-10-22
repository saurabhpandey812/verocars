# Self Drive Car Rental, Lucknow (customer site)

Next.js App Router + TypeScript + Tailwind v4. Customer-facing only; no payments, no admin yet.

## Run
    npm install
    npm run dev          # http://localhost:3000
    npm run typecheck
    npm run build

## Replace before launch
- `src/lib/constants/site.ts`: brand, phone, WhatsApp, email, address, hours, social. Only place to edit.
- Photos: `public/images/cars/<slug>-1.jpg` (slugs in `src/data/cars.ts`), `public/images/hero/hero.jpg`, `public/images/general/og-default.jpg`. Missing photos show a placeholder tile.
- `src/data/cars.ts`: demo prices, deposits and descriptions.
- `/terms` and `/privacy-policy`: fill every [bracket] and get legal review.
- Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`).

## Note on `public/`
Next.js requires `public/` at the project root (beside `src/`), not inside `src/`.

## Where things plug in later
- Database: replace `src/data/cars.ts` and `src/lib/bookings.ts` with Prisma/MySQL queries.
- Auth: replace `src/lib/auth/session.ts` and `src/app/api/auth/[action]/route.ts` (currently returns 501).
- Bookings: `src/app/api/bookings/route.ts` validates and returns a reference ID; add auth, availability check and persistence there.
- Account preview: set `NEXT_PUBLIC_DEMO_ACCOUNT=true` to see the dashboard with sample data.
- Admin: add `src/app/admin/...` as a sibling of `(site)` with its own layout; the customer site is unaffected.
- Future SEO: add `src/app/(site)/blog/[slug]`, `locations/[city]`, etc.; reuse `buildMetadata` and `lib/seo/jsonld.ts`, and extend `sitemap.ts`.
