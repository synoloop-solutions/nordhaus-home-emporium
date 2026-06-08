import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowRight, ShoppingBag, Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { TrustBar } from "@/components/TrustBar";
import { getRoomScene } from "@/data/catalog";
import { getProduct } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/data/types";

export const Route = createFileRoute("/rooms/$slug")({
  loader: ({ params }) => {
    const scene = getRoomScene(params.slug);
    if (!scene) throw notFound();
    const products = scene.productSlugs
      .map((s) => getProduct(s))
      .filter((p): p is Product => Boolean(p));
    return { scene, products };
  },
  head: ({ loaderData }) => {
    const scene = loaderData?.scene;
    return {
      meta: [
        { title: `${scene?.name ?? "Shop the Room"} — NordHaus Living` },
        { name: "description", content: scene?.description ?? "Shop this curated room." },
        { property: "og:title", content: `${scene?.name ?? "Shop the Room"} — NordHaus Living` },
        { property: "og:description", content: scene?.description ?? "" },
        { property: "og:type", content: "website" },
        { property: "og:image", content: scene?.image ?? "" },
        { property: "og:url", content: `/rooms/${scene?.slug ?? ""}` },
      ],
      links: [{ rel: "canonical", href: `/rooms/${scene?.slug ?? ""}` }],
    };
  },
  component: RoomPage,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="font-display text-3xl font-semibold">Room not found</h1>
      <p className="mt-2 text-muted-foreground">This curated room doesn't exist or has moved.</p>
      <Button asChild className="mt-6">
        <Link to="/shop" search={{ sort: "featured" } as never}>Browse the shop</Link>
      </Button>
    </div>
  ),
  errorComponent: ({ error, reset }) => {
    const router = useRouter();
    console.error(error);
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <h1 className="font-display text-3xl font-semibold">Something went wrong</h1>
        <Button
          className="mt-6"
          onClick={() => {
            router.invalidate();
            reset();
          }}
        >
          Try again
        </Button>
      </div>
    );
  },
});

function RoomPage() {
  const { scene, products } = Route.useLoaderData();
  const { addItem } = useCart();

  const bundleTotal = products.reduce((sum: number, p: Product) => sum + (p.salePrice ?? p.price), 0);

  const addAll = () => {
    products.forEach((p: Product) =>
      addItem({ slug: p.slug, qty: 1, unitPrice: p.salePrice ?? p.price, options: {} }),
    );
    toast.success(`${products.length} pieces added to your cart`);
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={scene.image} alt={scene.name} className="size-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-foreground/20" />
        </div>
        <div className="relative mx-auto flex min-h-[60vh] max-w-7xl flex-col justify-end px-4 py-16 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-background/80">
            <Link to="/" className="hover:text-background">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-background">{scene.name}</span>
          </nav>
          <div className="max-w-xl text-background">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/80">
              Shop the room
            </p>
            <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
              {scene.name}
            </h1>
            <p className="mt-4 text-background/85">{scene.description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Button size="lg" onClick={addAll}>
                <ShoppingBag className="size-4" aria-hidden="true" />
                Add all {products.length} pieces
              </Button>
              <span className="text-sm text-background/80">
                Bundle total <strong className="text-background">{formatPrice(bundleTotal)}</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive scene with hotspots */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <Reveal>
          <div className="relative overflow-hidden rounded-xl">
            <img src={scene.image} alt={`${scene.name} — shoppable scene`} className="w-full object-cover" />
            {scene.hotspots.map((h: { x: number; y: number; slug: string }) => {
              const p = getProduct(h.slug);
              if (!p) return null;
              return (
                <Link
                  key={h.slug}
                  to="/shop/$slug"
                  params={{ slug: h.slug }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: `${h.x}%`, top: `${h.y}%` }}
                  aria-label={`Shop ${p.name}`}
                >
                  <span className="flex size-7 items-center justify-center rounded-full bg-background text-foreground shadow-lg ring-2 ring-background/60 transition group-hover:scale-110">
                    <span className="block size-2.5 rounded-full bg-accent" />
                  </span>
                  <span className="pointer-events-none absolute left-1/2 top-9 hidden -translate-x-1/2 whitespace-nowrap rounded-md bg-foreground px-3 py-1.5 text-xs font-medium text-background shadow-lg group-hover:block">
                    {p.name} · {formatPrice(p.salePrice ?? p.price)}
                  </span>
                </Link>
              );
            })}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="font-display text-3xl font-semibold tracking-tight">In this room</h2>
          <Button onClick={addAll} variant="outline">
            <Check className="size-4" aria-hidden="true" /> Add the whole look
          </Button>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 4) * 0.05}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <TrustBar variant="compact" />
        <div className="mt-10 text-center">
          <Button asChild variant="link" className="text-accent">
            <Link to="/shop" search={{ sort: "featured" } as never}>
              Browse the full collection <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
