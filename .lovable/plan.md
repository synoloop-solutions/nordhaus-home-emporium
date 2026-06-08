## Plan: NordHaus Living — Core E-commerce Build

### Platform Note
This project runs on **TanStack Start** (React 19 + Vite + SSR), not Next.js. It delivers the same SEO-friendly routing, server-side rendering, and file-based routing. All "Next.js" requirements in the spec map directly to TanStack Start equivalents.

### Design Direction
- **Aesthetic**: Warm Scandinavian
- **Palette**: Oat `#F5F1EA`, Sand `#D9C7B0`, Warm Wood `#8A6E52`, Soft Black `#2B2622`
- **Typography**: Clean sans-serif (system + one premium display font loaded via `<link>`)
- **Imagery**: Curated free stock photo URLs (Unsplash/Pexels) for realistic, fast-loading assets
- **Motion**: Subtle Framer Motion for scroll reveals, hover states, and page transitions

---

## Phase 1: Foundation

### 1.1 Dependencies
Install `framer-motion`.

### 1.2 Design System Update
Update `src/styles.css`:
- Map the Warm Scandinavian palette to semantic tokens (`--primary`, `--background`, `--foreground`, `--accent`, etc.)
- Register fonts in `@theme inline`
- Add custom utilities for the brand (e.g. `.hover-scale`)

### 1.3 Mock Data Layer
Create `src/lib/data.ts` with:
- 40+ realistic furniture products (sofas, chairs, tables, beds, lighting, decor)
- Each product: name, slug, price, sale price, rating, review count, images, colors, materials, dimensions, categories, room type, description, care instructions, availability
- 6 collections (Modern Living, Scandinavian Collection, Luxury Bedroom, Contemporary Dining, Workspace Essentials, Outdoor Retreat)
- 6 room categories (Living Room, Bedroom, Dining Room, Office, Outdoor, Home Decor)
- **Curated room scenes** — each room-inspiration scene maps to a list of product slugs ("Shop the Room" data)
- 8+ customer reviews with ratings, photos, verified badges
- 6 testimonials with project photos

### 1.4 Global State (Contexts)
Create React contexts with localStorage persistence:
- **CartContext**: add, remove, update qty, clear, shipping estimate, promo codes, order summary (subtotal, tax, total)
- **WishlistContext**: toggle, persist, count badge
- **RecentlyViewedContext**: track last 10 viewed products (persisted), exposed for the Recently Viewed section

---

## Phase 2: Shared Components

### 2.1 Header (`src/components/Header.tsx`)
- Sticky top bar with **announcement bar** carrying a rotating **trust signal** (e.g. "Free delivery over $999 · Easy 30-day returns")
- Brand logo "NordHaus Living"
- Main nav: Living Room, Bedroom, Dining Room, Office, Outdoor, Home Decor, New Arrivals, Sale
- Mega-dropdown menus for categories
- Search icon → opens search overlay with predictive results
- Wishlist icon with count badge
- Cart icon with count badge
- User account icon → dropdown (login/register placeholders for demo)
- Mobile: hamburger menu with full-screen overlay

### 2.2 Footer (`src/components/Footer.tsx`)
- Company info, customer support links, policies
- Room category links
- Newsletter signup (client-side only, shows success toast)
- Social media icons
- Payment trust badges

### 2.3 ProductCard (`src/components/ProductCard.tsx`)
- High-quality image with hover image swap
- Product name, price, sale badge
- Star rating
- Wishlist toggle button
- Quick view button (opens modal with product summary + Add to Cart)
- Color swatch dots

### 2.4 TrustBar (`src/components/TrustBar.tsx`) — NEW
Reusable trust-signals strip used across the site:
- **Free delivery threshold** (e.g. "Free delivery on orders over $999")
- **Easy returns** ("30-day easy returns")
- **Secure checkout** ("256-bit SSL secure checkout")
- **Warranty** ("5-year warranty on all furniture")
Each with an icon + label. Placed on homepage (below hero), product page, cart, and checkout. Compact variant for product/cart pages, full 4-up grid on homepage.

### 2.5 RecentlyViewed (`src/components/RecentlyViewed.tsx`) — NEW
- Reads from RecentlyViewedContext
- Horizontal carousel/grid of ProductCards (excludes the current product)
- Renders only when there is at least one item
- Used on the product detail page (and optionally cart/shop)

### 2.6 PageShell (`src/components/PageShell.tsx`)
- Wraps all pages with `<main>` landmark, consistent padding, scroll-to-top

---

## Phase 3: Routes & Pages

### 3.1 Homepage (`src/routes/index.tsx`)
Sections in order:
1. **Hero**: Full-width lifestyle image, headline "Crafted for Modern Living", subheadline, "Shop Collection" CTA, "Explore Rooms" CTA
2. **Trust Signals**: 4-up TrustBar (free delivery, easy returns, secure checkout, warranty)
3. **Featured Collections**: 5 collection cards with images, titles, "Shop Now" links
4. **Shop by Room**: 5 room cards (Living, Bedroom, Dining, Office, Outdoor) — clickable, link to catalog with pre-filter
5. **Best Sellers**: Product grid (8 products) with ProductCard
6. **Room Inspiration Gallery**: Editorial grid of 6 styled room photos with overlay text and **"Shop the Room"** buttons → link to the curated room collection page
7. **New Arrivals**: Horizontal scroll carousel of 6 latest products
8. **Design Services**: 3 service cards (Consultation, Room Planning, Design Assistance) with icons
9. **Customer Testimonials**: 3 testimonial cards with star ratings, quotes, customer names, project photos
10. **Newsletter**: Email capture with incentive copy

### 3.2 Shop / Catalog (`src/routes/shop.index.tsx` → `/shop`)
- Page header with title and product count
- Active filters display with removable tags
- **Filter sidebar** (desktop) / **drawer** (mobile):
  - Room type, Category, Style, Color, Material, Price range (dual slider), Availability
- **Sort dropdown**: Featured, Best Selling, Price Low/High, Newest, Rating
- **Search input** with clear button
- Responsive product grid (2 cols mobile → 4 cols desktop)
- Pagination (12 per page)
- Empty state with illustration and "Clear filters" CTA

### 3.3 Shop the Room (`src/routes/rooms.$slug.tsx` → `/rooms/:slug`) — NEW
Curated collection page reached from the Room Inspiration Gallery's "Shop the Room" button:
- Hero with the room scene image, room name, and editorial description
- Interactive scene with hotspots mapping to the products featured in that room
- **Preloaded curated product grid** — exactly the products tied to that room scene
- "Add all to cart" bundle action
- Cross-links back to `/shop` and related rooms

### 3.4 Product Detail (`src/routes/shop.$slug.tsx` → `/shop/:slug`)
- **Image Gallery**: Main large image + thumbnail strip, click to enlarge in lightbox
- **Breadcrumb**: Home > Category > Product Name
- **Product Info**: Name, price, sale price, star rating (with review count link), availability badge
- **Trust Signals**: Compact TrustBar near Add to Cart (delivery, returns, secure, warranty)
- **Customization**: Color swatches, upholstery/material selectors, size/finish options — real-time price updates
- **Actions**: Quantity stepper, "Add to Cart" (sticky on mobile), "Add to Wishlist"
- **Dimensions section**: Visual diagram + spec table (H×W×D, weight, seat dims, packaging)
- **Details & Care**: Materials, construction, care instructions, warranty, assembly
- **Reviews**: Star breakdown, review list with photos, verified badges, filter/sort
- **Related Products**: "You May Also Like" carousel (6 items)
- **Frequently Bought Together**: 2-3 complementary items with bundle CTA
- **Recently Viewed**: RecentlyViewed section at the bottom (records the current product on mount)

### 3.5 Shopping Cart (`src/routes/cart.tsx` → `/cart`)
- Cart items list with image, name, variant info, qty stepper, remove, line total
- Order summary: subtotal, shipping estimate, tax, promo code input, total
- Compact TrustBar (secure checkout, easy returns)
- "Continue Shopping" link, "Proceed to Checkout" CTA
- Empty cart state with illustration and "Start Shopping" CTA

### 3.6 Checkout (`src/routes/checkout.tsx` → `/checkout`)
Multi-step demo checkout (no real payment):
1. **Customer Info** (email, name)
2. **Delivery Info** (address, phone)
3. **Shipping Method** (Standard / Express with pricing)
4. **Payment Info** (form with card fields for demo — no real processing)
5. **Order Review** (items, shipping, total)
6. **Confirmation** (order number, thank you, "Continue Shopping")
- Progress indicator at top
- Guest checkout supported
- Validation + error messages
- Security/trust badges (secure checkout, warranty)

### 3.7 Wishlist (`src/routes/wishlist.tsx` → `/wishlist`)
- Grid of wishlisted ProductCards
- "Move to Cart" and "Remove" actions per item
- Empty state with "Explore Products" CTA

### 3.8 Search Overlay (`src/components/SearchOverlay.tsx`)
- Full-screen or dropdown overlay triggered from header
- Instant filtering as you type
- Product suggestions with images
- "View all results" link to `/shop?search=...`
- Empty state for no matches

---

## Phase 4: SEO, Accessibility & Performance

### 4.1 Lighthouse Targets (explicit)
Build and verify against:
- **Performance 90+**
- **Accessibility 95+**
- **Best Practices 95+**
- **SEO 100**

### 4.2 SEO Per Route
Every route gets unique `head()` with:
- `<title>` and `<meta name="description">`
- Open Graph tags (`og:title`, `og:description`, `og:type`, `og:url`)
- Twitter card meta
- Canonical `<link>` (leaf routes only)
- Product pages: JSON-LD `Product` schema with name, image, offers, rating
- Room pages: JSON-LD `ItemList`/`CollectionPage`
- Homepage: JSON-LD `Organization` + `WebSite`
- `public/robots.txt` and a `sitemap.xml` server route

### 4.3 Accessibility (target 95+)
- Semantic HTML (`<main>`, `<nav>`, `<header>`, `<footer>`, `<article>`)
- Proper heading hierarchy (single `<h1>` per page)
- ARIA labels on icon-only buttons
- Focus-visible states on all interactive elements
- Skip-to-content link
- Alt text on all images
- Form labels and error associations
- Keyboard-navigable filters, drawers, modals, hotspots
- Color contrast compliance (WCAG AA)

### 4.4 Performance (target 90+)
- Lazy-load below-fold sections with `IntersectionObserver` / Framer Motion viewport triggers
- `loading="lazy"` + explicit width/height on product images (prevent CLS)
- Preload the hero/LCP image via route `head().links`
- `will-change` hints on animated elements; respect `prefers-reduced-motion`
- Font display swap
- Code splitting via file-based routes

### 4.5 Best Practices (target 95+)
- No console errors, valid HTML, HTTPS-only image sources
- Error boundaries (`errorComponent` / `notFoundComponent`) on routes with loaders
- Input validation with Zod on forms
- Skeleton loaders and empty states

---

## Phase 5: Static Pages (Post-Core)

After the core is approved, expand with:
- `/about` — Brand story, team, values
- `/contact` — Contact form, store locator, FAQs
- `/design-services` — Consultation booking, room planner showcase
- `/materials` — Wood, fabric, leather, finish guides
- `/buying-guides` — Sofa, dining, bedroom, office guides
- `/delivery` — Shipping zones, white-glove info, assembly

---

## Deliverables for This Plan
A fully functional, responsive, accessible e-commerce demo with:
- Warm Scandinavian design system
- Realistic furniture catalog (40+ products)
- Complete shopping flow (browse → customize → cart → checkout)
- Wishlist, search, and filtering
- **Shop the Room** curated collection pages from the inspiration gallery
- **Recently Viewed** section on product pages
- **Trust signals** (free delivery, easy returns, secure checkout, warranty) throughout
- Per-page SEO with structured data
- Explicit Lighthouse targets: Performance 90+, Accessibility 95+, Best Practices 95+, SEO 100
- Subtle Framer Motion animations
- Mobile-first responsive design

All data is mock; cart and wishlist persist in `localStorage`. No backend or real payments.