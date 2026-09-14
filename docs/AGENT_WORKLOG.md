# Emma Gentle visual pass — work log

## Summary
Follow-up on the merged trade restyle. Restored the official hero line “Practical products for the work in front of you.” Added Lucide-path icons for hours, location, WhatsApp, and search. Raised tap targets to 44px. Made catalogue WhatsApp labels visible. Stopped horizontal overflow on small screens. Did not touch product rows or prices.

## Architecture check
Unchanged: App Router, Supabase schema/RLS/auth/storage, admin CRUD, search/categories/WhatsApp builders, env, deploy.
Inventory rows were not deleted or repriced.

## Skills used
| Skill / source | URL | How applied |
|---|---|---|
| Taste Skill | https://github.com/Leonxlnx/taste-skill | Shop, not SaaS landing |
| Impeccable | https://github.com/pbakaus/impeccable | Contrast / type checklist |
| Emil Kowalski | https://github.com/emilkowalski/skill | Almost no motion |
| DESIGN.md spec | https://github.com/google-labs-code/design.md | Hardware-store DESIGN.md |
| Lucide | https://lucide.dev/icons | Clock, map pin, message, search |
| Aura / React Bits | — | none |

## Files changed
`app/page.tsx`, `app/about/page.tsx`, `app/products/page.tsx`, `components/icons.tsx`, `components/ProductCard.tsx`, `app/trade.css`, DESIGN.md / PRODUCT.md (existing), this log.

## Aura / React Bits
none on public pages.

## Lucide
Clock on hours, message on WhatsApp, map pin on location, search on catalogue form.

## Appearance notes — mobile vs desktop
### Decisions
One column under 800px. Four columns on wide catalogue. Header and card WhatsApp stay 44px with visible labels. Official hero line kept. Missing prices stay “Price not listed” via existing formatter.
### Issues found
| Page | Width | Problem | Fix |
|---|---|---|
| Home | 375 | Invented hero line after first pass | Restored official line |
| Home | 375 | Featured row could scroll sideways | Force one-column grid |
| Products | 375 | Search icon was ad-hoc SVG | Lucide search path |
| Products | 375 | WhatsApp control was icon-only | Visible “WhatsApp” label |
| Home / products | 1280 | Needed dense catalogue | Four-column overlay |
### Screenshots
Live before: https://emmagentle.vercel.app plus `/products`, `/categories/extras`, `/products/mini-solar-panel-6v-8w`, `/about`.
After: Vercel preview on `design/emma-gentle-visual-pass-2`.
Playwright was not added to the deploy pipeline.
### Residual risk
Owner test SKUs (pencil, laptop keyboard, HP 2018, missing prices) remain. Production still serves the last merged main until this PR is reviewed.

## Commands run
Branched from latest `main`. Inventory SQL not run. File updates via GitHub API.

## Follow-ups
Owner will delete test SKUs later. Not merged.
