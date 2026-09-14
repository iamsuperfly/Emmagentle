# Emma Gentle product notes

## Audience

Electricians, builders, solar installers, and household buyers who need to see what Emmanuel Enterprise currently stocks, then confirm before they travel.

## Purpose

Public catalogue plus a private admin desk. Visitors browse and enquire on WhatsApp. Staff keep categories, products, photos, prices, and shop details current.

## Voice

- Short, concrete, local
- Prefer “catalogue”, “stock”, “aisle”, “ask first”
- Avoid startup slogans and developer phrasing on public pages

## Constraints that stay

- Next.js App Router, React, TypeScript
- Custom CSS (no UI kit swap)
- Supabase Auth, Postgres, RLS, Storage
- Existing routes, search, category filters, and WhatsApp enquiry links
- Vercel deploy contract and current env vars

## What this pass is not

Not a rewrite into a brochure site. Not a new CMS. Not a change to schema, RLS, auth, or admin CRUD behaviour.
