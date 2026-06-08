## Aurum Interiors — Luxury Rebrand Plan

A full visual + copy transformation layered onto the existing TanStack Start codebase. No routes are removed, no logic refactored — cart, wishlist, checkout, filters, search, recently-viewed, shop-the-room, SEO, accessibility, and responsiveness all stay intact.

### 1. Design tokens (`src/styles.css`)
Replace the Scandinavian palette with a luxury system. All values in oklch:

- `--background` Ivory (~oklch 0.97 0.008 85)
- `--card` Cream (~0.95 0.012 82)
- `--muted` Warm Stone (~0.86 0.018 75)
- `--foreground` / `--primary` Charcoal (~0.18 0.008 50)
- `--accent` Deep Bronze (~0.42 0.06 55)
- `--ring` / link Soft Gold (~0.72 0.09 80)
- Border raised contrast at ~0.84 0.015 78

Typography:
- Headings: **Cormorant Garamond** (luxury serif) → `--font-display`
- Body: **Inter** stays, tracked tighter; introduce `--font-sans` size scale bump (base 17px, leading 1.7)
- Add `tracking-widest` uppercase eyebrow utility for editorial labels

Spacing / motion:
- Increase section padding utilities (`py-24 lg:py-36`)
- Soften radii to `0.25rem` for an architectural feel
- Slower Reveal transitions (700–900ms ease-out), longer image hover zoom (1.2s)
- Add `.text-eyebrow`, `.divider-gold`, `.hover-zoom` utilities

Dark theme tuned to charcoal + bronze (kept functional).

### 2. Branding & chrome
- `Header.tsx`: rename to **AURUM INTERIORS**, serif wordmark, thin gold underline on active link, generous nav spacing, "Book Consultation" CTA replacing previous primary action. Keep all existing nav targets (Shop, Shop the Room, Wishlist, Cart, Account, Search).
- `Footer.tsx`: editorial 4-column layout with newsletter, ateliers/showrooms, trade program, brand story. Existing links preserved.
- `TrustBar.tsx`: copy → *Handcrafted in Europe · White-Glove Delivery · Bespoke Atelier · Lifetime Craftsmanship Warranty*. Same component API.

### 3. Imagery (`src/data/images.ts`)
Swap Unsplash IDs for luxury interiors (penthouses, designer bedrooms, travertine dining, architectural living, material close-ups, ateliers). Keep export shape identical so all consumers continue to work. Add new keys: `atelier`, `materials.{leather,oak,walnut,travertine,marble,brass,fabric}`, `projects.{residence,hospitality,commercial}`.

### 4. Homepage (`src/routes/index.tsx`)
Rebuild section content (same component skeleton, same data sources):
1. Full-bleed hero — luxury interior, serif headline *"Interiors, Considered."*, subhead, dual CTAs (Shop Collection / Book Design Consultation)
2. Eyebrow + Featured Collections grid renamed: Signature Living, Private Residence, Heritage Collection, Atelier Bedroom, Executive Office, Grand Dining
3. **Craftsmanship** split-screen (new) — image + storytelling copy + four pillars (Handcrafted Construction, Premium Materials, Artisan Production, Attention to Detail)
4. Shop by Room (kept, restyled — fewer cards per row on desktop, larger imagery)
5. Best Sellers (kept; product grid 3-up desktop / 2-up tablet)
6. **Materials** strip (new) — Italian Leather, Solid Oak, Walnut, Travertine, Marble, Brass, Premium Fabrics; horizontal scroll on mobile
7. Room Inspiration / Shop the Room (kept, editorial caption treatment)
8. New Arrivals (kept)
9. **Design Services** section (expanded) — Residential, Commercial, Hospitality with consultation CTA
10. **Client Projects** portfolio (new) — masonry of luxury residences/hospitality
11. Testimonials (refined copy — designers, architects)
12. Newsletter (refined copy)

### 5. Product card (`ProductCard.tsx`)
- Taller image area (4:5), subtle fade-in, slow hover zoom
- Minimal badge styling (thin bronze outline)
- Serif product name, refined price formatting, smaller star rating
- Public API unchanged

### 6. PDP (`src/routes/shop.$slug.tsx`)
Add luxury content sections under the existing buy box (all derived from existing product data — no schema change required):
- Design Story
- Craftsmanship Details
- Premium Materials
- Designer Notes
- Care & Maintenance
- Warranty Information
- Customization presented as **finish/fabric/material swatch cards** (visual upgrade of existing options)
Keep reviews, recently-viewed, cart logic, SEO/JSON-LD untouched (update copy fields only).

### 7. Shop & Rooms listings
- Restyle filters/sort chrome (thin rules, serif headings, gold focus ring)
- Reduce desktop grid density (3 per row instead of 4)
- Same filter/sort/search/state logic

### 8. Cart / Checkout / Wishlist / Account
Visual polish only — typography, spacing, button styles. All flows preserved.

### 9. Copywriting
Rewrite all visible strings in editorial luxury voice — craftsmanship, heritage, design excellence, timeless elegance, bespoke quality. Replace all "NordHaus" references with "Aurum Interiors".

### 10. SEO
Update titles, descriptions, og tags, JSON-LD Organization/Product across `__root.tsx` and route `head()` blocks to Aurum Interiors brand. Structure unchanged.

### Technical notes
- New fonts loaded via `<link>` in `__root.tsx` head (Cormorant Garamond + Inter); reference via `--font-display` / `--font-sans` per Tailwind v4 rules.
- All component APIs preserved; changes are JSX, copy, classNames, and tokens.
- No new dependencies, no routing changes, no data shape changes.
- Lighthouse: imagery sized via Unsplash query params, lazy loading retained, semantic HTML preserved.

### Out of scope
- No backend / Cloud integration
- No payment provider
- No new routes (existing Shop the Room covers "client projects" linking; portfolio is a homepage section, not a new route — can be promoted to `/projects` in a follow-up if desired)
