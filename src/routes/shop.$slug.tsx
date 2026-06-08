import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Heart, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { getProduct, relatedProducts } from "@/data/products";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { StarRating } from "@/components/StarRating";
import { ProductCard } from "@/components/ProductCard";
import { RecentlyViewed } from "@/components/RecentlyViewed";
import { TrustBar } from "@/components/TrustBar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useRecentlyViewed } from "@/context/RecentlyViewedContext";

export const Route = createFileRoute("/shop/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.product;
    if (!p) return {};
    return {
      meta: [
        { title: `${p.name} — Aurum Interiors` },
        { name: "description", content: p.description },
        { property: "og:title", content: p.name },
        { property: "og:description", content: p.description },
        { property: "og:type", content: "product" },
        { property: "og:image", content: p.images[0] },
      ],
      links: [{ rel: "canonical", href: `/shop/${p.slug}` }],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org", "@type": "Product", name: p.name, image: p.images,
          description: p.description,
          aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviewCount },
          offers: { "@type": "Offer", price: p.salePrice ?? p.price, priceCurrency: "USD", availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock" },
        }),
      }],
    };
  },
  notFoundComponent: () => (
    <div className="mx-auto max-w-md px-4 py-20 text-center">
      <h1 className="font-display text-2xl font-semibold">Product not found</h1>
      <Button asChild className="mt-4"><Link to="/shop">Back to shop</Link></Button>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { product: p } = Route.useLoaderData() as { product: Product };
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const { record } = useRecentlyViewed();
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [options, setOptions] = useState<Record<string, string>>(
    Object.fromEntries(p.customizations.map((g) => [g.id, g.options[0]?.label ?? ""])),
  );

  useEffect(() => { record(p.slug); }, [p.slug, record]);

  const unitPrice = useMemo(() => {
    const base = p.salePrice ?? p.price;
    const deltas = p.customizations.reduce((sum, g) => {
      const sel = g.options.find((o) => o.label === options[g.id]);
      return sum + (sel?.priceDelta ?? 0);
    }, 0);
    return base + deltas;
  }, [p, options]);

  const related = relatedProducts(p);
  const wished = has(p.slug);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/shop">Shop</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>{p.name}</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-lg bg-muted">
            <img src={p.images[activeImg]} alt={p.name} className="size-full object-cover" width={800} height={800} />
          </div>
          <div className="mt-3 flex gap-2">
            {p.images.map((img, i) => (
              <button key={i} onClick={() => setActiveImg(i)} aria-label={`View image ${i + 1}`} className={cn("size-16 overflow-hidden rounded-md border-2", i === activeImg ? "border-accent" : "border-transparent")}>
                <img src={img} alt="" className="size-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <h1 className="font-display text-3xl font-semibold">{p.name}</h1>
          <div className="mt-2 flex items-center gap-2">
            <StarRating rating={p.rating} />
            <a href="#reviews" className="text-sm text-muted-foreground hover:underline">{p.reviewCount} reviews</a>
          </div>
          <div className="mt-3 flex items-center gap-3">
            <span className="text-2xl font-semibold">{formatPrice(unitPrice)}</span>
            {p.salePrice && <span className="text-muted-foreground line-through">{formatPrice(p.price)}</span>}
            {p.inStock ? <Badge variant="secondary">In stock</Badge> : <Badge variant="outline">Sold out</Badge>}
          </div>
          <p className="mt-4 text-muted-foreground">{p.description}</p>

          {p.customizations.map((g) => (
            <div key={g.id} className="mt-5">
              <p className="mb-2 text-sm font-semibold">{g.name}</p>
              {g.type === "color" ? (
                <div className="flex gap-2">
                  {g.options.map((o) => (
                    <button key={o.label} onClick={() => setOptions((s) => ({ ...s, [g.id]: o.label }))} aria-label={o.label} aria-pressed={options[g.id] === o.label}
                      className={cn("size-8 rounded-full border-2", options[g.id] === o.label ? "border-accent" : "border-border")} style={{ backgroundColor: o.swatch }} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {g.options.map((o) => (
                    <button key={o.label} onClick={() => setOptions((s) => ({ ...s, [g.id]: o.label }))} aria-pressed={options[g.id] === o.label}
                      className={cn("rounded-md border px-3 py-1.5 text-sm", options[g.id] === o.label ? "border-accent bg-accent/10" : "border-border")}>
                      {o.label}{o.priceDelta > 0 && ` +${formatPrice(o.priceDelta)}`}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="mt-6 flex items-center gap-3">
            <div className="flex items-center rounded-md border">
              <button className="px-3 py-2" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus className="size-4" /></button>
              <span className="w-10 text-center">{qty}</span>
              <button className="px-3 py-2" aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}><Plus className="size-4" /></button>
            </div>
            <Button className="flex-1" disabled={!p.inStock} onClick={() => { addItem({ slug: p.slug, qty, unitPrice, options }); toast.success(`${p.name} added to cart`); }}>
              {p.inStock ? "Add to cart" : "Sold out"}
            </Button>
            <Button variant="outline" size="icon" aria-label="Add to wishlist" aria-pressed={wished} onClick={() => toggle(p.slug)}>
              <Heart className={cn("size-5", wished && "fill-accent text-accent")} />
            </Button>
          </div>

          <div className="mt-6"><TrustBar variant="compact" /></div>
        </div>
      </div>

      <section className="mt-20 grid gap-12 border-t border-border/60 pt-16 lg:grid-cols-3">
        <div>
          <p className="text-eyebrow">The Design Story</p>
          <h2 className="mt-3 font-display text-3xl">A considered silhouette</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {p.description} Composed in our atelier from honest materials, the {p.name} is sketched,
            prototyped and refined over months — a piece intended to be lived with, and inherited.
          </p>
        </div>
        <div>
          <p className="text-eyebrow">Designer Notes</p>
          <h2 className="mt-3 font-display text-3xl">From our studio</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            "We wanted a piece that disappears into the room and yet anchors it. The proportions
            are drawn from mid-century European modernism; the materials are entirely our own." —
            Aurum Design Studio
          </p>
        </div>
        <div>
          <p className="text-eyebrow">Premium Materials</p>
          <h2 className="mt-3 font-display text-3xl">What it's made of</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {p.materials.map((m, i) => (
              <li key={i} className="flex gap-3 border-b border-border/40 pb-2">
                <span className="text-accent">—</span>
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <Tabs defaultValue="craftsmanship" className="mt-20">
        <TabsList className="h-auto flex-wrap gap-1 bg-transparent p-0">
          <TabsTrigger value="craftsmanship" className="rounded-none border-b-2 border-transparent px-4 py-3 text-[11px] uppercase tracking-[0.2em] data-[state=active]:border-accent data-[state=active]:bg-transparent">Craftsmanship</TabsTrigger>
          <TabsTrigger value="dimensions" className="rounded-none border-b-2 border-transparent px-4 py-3 text-[11px] uppercase tracking-[0.2em] data-[state=active]:border-accent data-[state=active]:bg-transparent">Dimensions</TabsTrigger>
          <TabsTrigger value="care" className="rounded-none border-b-2 border-transparent px-4 py-3 text-[11px] uppercase tracking-[0.2em] data-[state=active]:border-accent data-[state=active]:bg-transparent">Care & Maintenance</TabsTrigger>
          <TabsTrigger value="warranty" className="rounded-none border-b-2 border-transparent px-4 py-3 text-[11px] uppercase tracking-[0.2em] data-[state=active]:border-accent data-[state=active]:bg-transparent">Warranty</TabsTrigger>
        </TabsList>
        <TabsContent value="craftsmanship" className="pt-6">
          <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            {p.details.map((d, i) => (
              <li key={i} className="flex gap-3 border-b border-border/40 pb-3"><span className="text-accent">—</span>{d}</li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-muted-foreground"><strong className="text-foreground">Assembly:</strong> {p.assembly}</p>
        </TabsContent>
        <TabsContent value="dimensions" className="pt-6">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 text-sm sm:grid-cols-3">
            <div className="border-b border-border/40 pb-3"><dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Height</dt><dd className="mt-1 font-display text-xl">{p.dimensions.height}"</dd></div>
            <div className="border-b border-border/40 pb-3"><dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Width</dt><dd className="mt-1 font-display text-xl">{p.dimensions.width}"</dd></div>
            <div className="border-b border-border/40 pb-3"><dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Depth</dt><dd className="mt-1 font-display text-xl">{p.dimensions.depth}"</dd></div>
            <div className="border-b border-border/40 pb-3"><dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Weight</dt><dd className="mt-1 font-display text-xl">{p.dimensions.weight} lbs</dd></div>
            {p.dimensions.seatHeight && <div className="border-b border-border/40 pb-3"><dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Seat height</dt><dd className="mt-1 font-display text-xl">{p.dimensions.seatHeight}"</dd></div>}
            {p.dimensions.seatDepth && <div className="border-b border-border/40 pb-3"><dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Seat depth</dt><dd className="mt-1 font-display text-xl">{p.dimensions.seatDepth}"</dd></div>}
          </dl>
        </TabsContent>
        <TabsContent value="care" className="pt-6 text-sm leading-relaxed text-muted-foreground">
          <p>{p.care}</p>
          <p className="mt-4">Hand-finished surfaces will develop a unique patina with time and use. We recommend
          occasional conditioning with neutral leather balm and waxing of any unsealed timber surfaces twice yearly.</p>
        </TabsContent>
        <TabsContent value="warranty" className="pt-6 text-sm leading-relaxed text-muted-foreground">
          <p><strong className="text-foreground">Lifetime Craftsmanship Warranty.</strong> Every Aurum piece is
          guaranteed against defects in materials and workmanship for the lifetime of the original owner.</p>
          <p className="mt-3">{p.warranty}</p>
        </TabsContent>
      </Tabs>

      <section id="reviews" className="mt-12">
        <h2 className="font-display text-2xl font-semibold">Customer Reviews</h2>
        <div className="mt-4 space-y-4">
          {p.reviews.map((r) => (
            <article key={r.id} className="rounded-lg border bg-card p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <StarRating rating={r.rating} />
                  <span className="text-sm font-medium">{r.author}</span>
                  {r.verified && <Badge variant="secondary" className="text-[10px]">Verified</Badge>}
                </div>
                <span className="text-xs text-muted-foreground">{r.date}</span>
              </div>
              <h3 className="mt-2 text-sm font-semibold">{r.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
              {r.photo && <img src={r.photo} alt="" className="mt-2 size-20 rounded object-cover" />}
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold">You may also like</h2>
        <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {related.map((rp) => <ProductCard key={rp.slug} product={rp} />)}
        </div>
      </section>

      <RecentlyViewed excludeSlug={p.slug} />
    </div>
  );
}