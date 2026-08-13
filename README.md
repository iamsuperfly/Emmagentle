# Emmanuel Enterprise

Stage 1 functional foundation for an electrical and hardware supplies catalogue.

## Stack

- Next.js App Router
- React and TypeScript
- Supabase Auth, PostgreSQL, Row Level Security, and Storage
- Vercel-ready deployment

## Local setup

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local`.
3. Add the Supabase project URL and anon key.
4. Run `supabase/schema.sql` in the Supabase SQL Editor.
5. Optionally run `supabase/seed.sql` for clearly marked temporary sample data.
6. Create an account in Supabase Auth, then add that user's UUID to `public.admin_users` using the example at the end of `supabase/seed.sql`.
7. Start the app with `npm run dev`.

## Vercel environment variables

Add these variables in the Vercel project under **Settings → Environment Variables** for
Development, Preview, and Production:

- `NEXT_PUBLIC_SUPABASE_URL` — the Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — the Supabase publishable/anon key
- `NEXT_PUBLIC_SITE_URL` — the deployed site URL, used as the base for future callback configuration

Only the public Supabase URL and anon key are used by the app. A service-role key is not needed
and must not be added to the browser or committed to the repository.

## Functional areas

- Public home, catalogue, search, categories, product details, and contact page
- Supabase-backed products, categories, business settings, and product images
- Admin login, logout, password recovery, and password change
- Protected admin dashboard with product/category CRUD and business settings
- Supabase Storage uploads and safe image replacement/removal
- Product search across name, description, and category
- WhatsApp enquiry links generated from the database-driven business number

Run the required checks with:

```bash
npm run lint
npm run build
```