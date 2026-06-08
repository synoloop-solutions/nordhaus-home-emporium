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

      <Tabs defaultValue="details" className="mt-12">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
          <TabsTrigger value="care">Care & Warranty</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="prose-sm max-w-none pt-4">
          <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
            {p.details.map((d, i) => <li key={i}>{d}</li>)}
          </ul>
          <p className="mt-3 text-sm"><strong>Materials:</strong> {p.materials.join(", ")}</p>
          <p className="mt-1 text-sm"><strong>Assembly:</strong> {p.assembly}</p>
        </TabsContent>
        <TabsContent value="dimensions" className="pt-4">
          <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
            <div><dt className="text-muted-foreground">Height</dt><dd className="font-medium">{p.dimensions.height}"</dd></div>
            <div><dt className="text-muted-foreground">Width</dt><dd className="font-medium">{p.dimensions.width}"</dd></div>
            <div><dt className="text-muted-foreground">Depth</dt><dd className="font-medium">{p.dimensions.depth}"</dd></div>
            <div><dt className="text-muted-foreground">Weight</dt><dd className="font-medium">{p.dimensions.weight} lbs</dd></div>
            {p.dimensions.seatHeight && <div><dt className="text-muted-foreground">Seat height</dt><dd className="font-medium">{p.dimensions.seatHeight}"</dd></div>}
            {p.dimensions.seatDepth && <div><dt className="text-muted-foreground">Seat depth</dt><dd className="font-medium">{p.dimensions.seatDepth}"</dd></div>}
          </dl>
        </TabsContent>
        <TabsContent value="care" className="pt-4 text-sm text-muted-foreground">
          <p>{p.care}</p>
          <p className="mt-3"><strong className="text-foreground">Warranty:</strong> {p.warranty}</p>
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