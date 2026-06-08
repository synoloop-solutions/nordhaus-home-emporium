import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageSquare,
  LayoutGrid,
  Sparkles,
  Quote,
  Mail,
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { TrustBar } from "@/components/TrustBar";
import { StarRating } from "@/components/StarRating";
import {
  collections,
  roomCategories,
  roomScenes,
  testimonials,
  designServices,
} from "@/data/catalog";
import { bestSellers, newArrivals } from "@/data/products";
import { IMG } from "@/data/images";

const serviceIcons = { MessageSquare, LayoutGrid, Sparkles };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NordHaus Living — Warm Scandinavian Furniture & Home Decor" },
      {
        name: "description",
        content:
          "Discover warm, considered Scandinavian-inspired furniture and home decor — sofas, beds, dining and more, built to last and shipped with white-glove care.",
      },
      { property: "og:title", content: "NordHaus Living — Warm Scandinavian Furniture" },
      {
        property: "og:description",
        content:
          "Timeless furniture and home decor for the modern home. Free delivery over $999, 30-day returns, 5-year warranty.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: IMG.hero },
      { property: "og:url", content: "/" },
      { name: "twitter:image", content: IMG.hero },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  cta,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: { label: string; to: string; search?: Record<string, unknown> };
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
        )}
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          {title}
        </h2>
        {subtitle && <p className="mt-2 text-muted-foreground">{subtitle}</p>}
      </div>
      {cta && (
        <Button asChild variant="link" className="self-start px-0 text-accent sm:self-end">
          <Link to={cta.to} search={cta.search as never}>
            {cta.label} <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      )}
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={IMG.hero}
          alt="A sunlit Scandinavian living room with a boucle sofa and oak furniture"
          className="size-full object-cover"
          fetchPriority="high"
          width={1600}
          height={1000}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />
      </div>
      <div className="relative mx-auto flex min-h-[78vh] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl text-background"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-background/80">
            Warm Scandinavian design
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            Furniture made to be lived in.
          </h1>
          <p className="mt-5 max-w-md text-base text-background/85 sm:text-lg">
            Considered pieces in natural materials and soft, earthy tones — crafted to bring warmth
            and calm to every room.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/shop" search={{ sort: "featured" } as never}>
                Shop the collection
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-background/40 bg-background/10 text-background hover:bg-background/20 hover:text-background"
            >
              <Link to="/shop" search={{ sort: "featured", category: undefined } as never}>
                Explore rooms
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedCollections() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <Reveal>
        <SectionHeader
          eyebrow="Curated"
          title="Featured collections"
          subtitle="Considered groupings to make a whole room come together effortlessly."
          cta={{ label: "Shop all", to: "/shop", search: { sort: "featured" } }}
        />
      </Reveal>
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.05}>
            <Link
              to="/shop"
              search={{ sort: "featured" } as never}
              className="group relative block aspect-[4/5] overflow-hidden rounded-xl"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/75 via-foreground/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-background">
                <h3 className="font-display text-2xl font-semibold">{c.name}</h3>
                <p className="mt-1 text-sm text-background/85">{c.tagline}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium">
                  Shop now <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function ShopByRoom() {
  return (
    <section className="bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <SectionHeader eyebrow="Browse" title="Shop by room" />
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {roomCategories.map((r, i) => (
            <Reveal key={r.slug} delay={i * 0.04}>
              <Link
                to="/shop"
                search={{ room: r.slug, sort: "featured" } as never}
                className="group block text-center"
              >
                <div className="aspect-square overflow-hidden rounded-full border bg-card">
                  <img
                    src={r.image}
                    alt={r.name}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-3 text-sm font-medium text-foreground group-hover:text-accent">
                  {r.name}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BestSellers() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <Reveal>
        <SectionHeader
          eyebrow="Loved by many"
          title="Best sellers"
          subtitle="The pieces our customers reach for again and again."
          cta={{ label: "View all", to: "/shop", search: { sort: "rating" } }}
        />
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {bestSellers.slice(0, 8).map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 0.05}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function RoomInspiration() {
  return (
    <section className="bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <SectionHeader
            eyebrow="Get the look"
            title="Room inspiration"
            subtitle="Real rooms, fully shoppable. Tap a scene to shop every piece in it."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {roomScenes.slice(0, 4).map((scene, i) => (
            <Reveal key={scene.slug} delay={(i % 2) * 0.06}>
              <article className="group relative overflow-hidden rounded-xl">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={scene.image}
                    alt={scene.name}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-background">
                  <h3 className="font-display text-2xl font-semibold">{scene.name}</h3>
                  <p className="mt-1 line-clamp-2 max-w-md text-sm text-background/85">
                    {scene.description}
                  </p>
                  <Button asChild size="sm" className="mt-4">
                    <Link to="/rooms/$slug" params={{ slug: scene.slug }}>
                      Shop the room <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewArrivals() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <Reveal>
        <SectionHeader
          eyebrow="Just landed"
          title="New arrivals"
          subtitle="The latest additions to the NordHaus collection."
          cta={{ label: "View all", to: "/shop", search: { sort: "newest" } }}
        />
      </Reveal>
      <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
        {newArrivals.slice(0, 4).map((p, i) => (
          <Reveal key={p.slug} delay={(i % 4) * 0.05}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function DesignServices() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={IMG.living3} alt="" aria-hidden="true" className="size-full object-cover" />
        <div className="absolute inset-0 bg-foreground/80" />
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <Reveal>
          <div className="max-w-2xl text-background">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-background/80">
              Design services
            </p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Let our designers help you style your space
            </h2>
            <p className="mt-3 text-background/85">
              Complimentary, no-obligation support from selection to styling — online or in person.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {designServices.map((s, i) => {
            const Icon = serviceIcons[s.icon as keyof typeof serviceIcons] ?? Sparkles;
            return (
              <Reveal key={s.id} delay={i * 0.06}>
                <div className="h-full rounded-xl border border-background/15 bg-background/10 p-6 text-background backdrop-blur-sm">
                  <span className="flex size-11 items-center justify-center rounded-full bg-background/15">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-background/80">{s.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.1}>
          <Button asChild size="lg" variant="secondary" className="mt-10">
            <Link to="/shop" search={{ sort: "featured" } as never}>
              Book a consultation
            </Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <Reveal>
        <SectionHeader
          eyebrow="Kind words"
          title="Loved by homes everywhere"
          subtitle="Over 12,000 five-star reviews from customers around the world."
        />
      </Reveal>
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.id} delay={(i % 3) * 0.05}>
            <figure className="flex h-full flex-col rounded-xl border bg-card p-6">
              <Quote className="size-7 text-accent/40" aria-hidden="true" />
              <blockquote className="mt-3 flex-1 text-sm leading-relaxed text-foreground">
                {t.quote}
              </blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t pt-4">
                <img
                  src={t.photo}
                  alt=""
                  loading="lazy"
                  className="size-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
                <StarRating rating={t.rating} className="ml-auto" />
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-24">
        <Reveal>
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary-foreground/10">
            <Mail className="size-6" aria-hidden="true" />
          </span>
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Join the NordHaus circle
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-primary-foreground/80">
            Be first to know about new arrivals, design stories and members-only offers. Enjoy 10%
            off your first order.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              toast.success("Welcome to the circle! Check your inbox for 10% off.");
              setEmail("");
            }}
            className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <Input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground placeholder:text-primary-foreground/50"
            />
            <Button type="submit" variant="secondary" className="shrink-0">
              Subscribe
            </Button>
          </form>
          <p className="mt-3 text-xs text-primary-foreground/60">
            No spam, ever. Unsubscribe anytime.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Index() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedCollections />
      <ShopByRoom />
      <BestSellers />
      <RoomInspiration />
      <NewArrivals />
      <DesignServices />
      <Testimonials />
      <Newsletter />
    </>
  );
}
