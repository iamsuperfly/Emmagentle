# Emma Gentle design system

Visual language for a trade catalogue, not a SaaS landing page.

**Reading:** public stock list for electricians, builders, and walk-in customers around Uli, Anambra. Trust-first hardware counter. Variance 3 / motion 2 / density 7.

## Surfaces

| Token | Hex | Use |
|---|---|---|
| `--ink` | `#101413` | Primary text |
| `--charcoal` | `#151918` | Header, hero, footer |
| `--cream` | `#eceee9` | Workshop page ground (cool, not beige) |
| `--paper` | `#ffffff` | Cards, forms, info strip |
| `--line` | `#cfd3cc` | Hairline borders |
| `--orange` | `#d85a12` | Safety accent, not a gradient |
| `--orange-dark` | `#b4470c` | Primary buttons |
| `--muted` | `#545a56` | Secondary copy |
| `--success` | `#1b5c3b` | In stock |
| `--danger` | `#9d3226` | Out of stock |

No purple, no mesh, no glass.

## Type

- Stack: `"Segoe UI", "Helvetica Neue", Arial, sans-serif`
- Do not introduce Inter, italic display serif, or a fused logo/photo lockup
- Page titles stay under ~2.2rem on desktop
- Hero stays under ~3.05rem and ~18ch so it reads as a shop sign, not a startup manifesto
- Eyebrows are small, tracked, uppercase utility labels

## Layout

- Header: logo tile + separate wordmark + WhatsApp control
- Catalogue grids default to four columns, three below 1100px
- Product photos are flush to the card edge; stock sits on the photo
- Price is heavier than the blurb
- Info strip is one sheet with internal rules, not three floating tiles
- Admin keeps square corners, tight tables, no decorative motion

## Motion

- Buttons change colour only
- Spinner is the only looping motion
- Honour `prefers-reduced-motion`

## Copy voice

Direct shop English. Name the item, the price, the hours, the WhatsApp number. Do not say “dynamic”, “bringing ideas to life”, or numbered process steps.
