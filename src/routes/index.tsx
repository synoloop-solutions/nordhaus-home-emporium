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
  Hammer,
  Gem,
  Award,
  Scissors,
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
import { IMG, MATERIALS, PROJECTS } from "@/data/images";

const serviceIcons = { MessageSquare, LayoutGrid, Sparkles };

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aurum Interiors — Handcrafted Luxury Furniture & Bespoke Interiors" },
      {
        name: "description",
        content:
          "Aurum Interiors crafts heirloom furniture and bespoke interiors from Italian leather, solid oak, travertine and brass — for private residences, hospitality and the architectural home.",
      },
      { property: "og:title", content: "Aurum Interiors — Handcrafted Luxury Furniture" },
      {
        property: "og:description",
        content:
          "Designer collections, premium materials and bespoke interior solutions. White-glove delivery worldwide.",
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

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-eyebrow flex items-center gap-3">
      <span className="divider-gold" />
      {children}
    </p>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  cta,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  cta?: { label: string; to: string; search?: Record<string, unknown> };
  align?: "left" | "center";
}) {
  const isCenter = align === "center";
  return (
    <div
      className={
        isCenter
          ? "mx-auto flex max-w-3xl flex-col items-center gap-4 text-center"
          : "flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      }
    >
      <div className={isCenter ? "" : "max-w-2xl"}>
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2 className="mt-4 font-display text-4xl tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">{subtitle}</p>
        )}
      </div>
      {cta && (
        <Button
          asChild
          variant="link"
          className="self-start px-0 text-[11px] font-medium uppercase tracking-[0.24em] text-foreground hover:text-accent sm:self-end"
        >
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
          alt="A luxury penthouse living room with travertine, leather and natural light"
          className="size-full object-cover"
          fetchPriority="high"
          width={1920}
          height={1200}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
      </div>
      <div className="relative mx-auto flex min-h-[92vh] max-w-[1400px] items-center px-6 py-32 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl text-background"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-background/85">
            <span className="mr-3 inline-block h-px w-10 align-middle bg-background/60" />
            The Autumn Collection · MMXXVI
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight sm:text-7xl lg:text-[5.5rem]">
            Interiors,
            <br />
            <em className="font-light italic text-background/90">considered.</em>
          </h1>
          <p className="mt-7 max-w-lg text-base leading-relaxed text-background/85 sm:text-lg">
            Heirloom furniture for the architectural home. Handcrafted in our European atelier from
            Italian leather, solid oak, travertine and brass — composed to be lived with, and inherited.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 px-7 text-[11px] uppercase tracking-[0.24em]">
              <Link to="/shop" search={{ sort: "featured" } as never}>
                Shop the Collection
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-12 border-background/40 bg-transparent px-7 text-[11px] uppercase tracking-[0.24em] text-background hover:bg-background hover:text-foreground"
            >
              <Link to="/account">Book Design Consultation</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedCollections() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 sm:px-8 lg:px-12 lg:py-36">
      <Reveal>
        <SectionHeader
          eyebrow="Curated Collections"
          title="The atelier's signature compositions"
          subtitle="Editorial groupings of seating, tables, lighting and textiles — assembled by our designers to compose entire rooms with quiet authority."
          cta={{ label: "View all collections", to: "/shop", search: { sort: "featured" } }}
        />
      </Reveal>
      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((c, i) => (
          <Reveal key={c.slug} delay={i * 0.08}>
            <Link
              to="/shop"
              search={{ sort: "featured" } as never}
              className="hover-zoom group relative block aspect-[4/5] overflow-hidden"
            >
              <img
                src={c.image}
                alt={c.name}
                loading="lazy"
                className="size-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-8 text-background">
                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-background/70">
                  Collection {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-3 font-display text-3xl">{c.name}</h3>
                <p className="mt-2 max-w-xs text-sm text-background/80">{c.tagline}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em]">
                  Discover <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Craftsmanship() {
  const pillars = [
    { icon: Hammer, title: "Handcrafted Construction", text: "Mortise-and-tenon joinery, hand-sewn upholstery, and finishes applied across weeks, not minutes." },
    { icon: Gem, title: "Premium Materials", text: "Full-grain Italian leather, quarter-sawn European oak, honed travertine and solid brass." },
    { icon: Scissors, title: "Artisan Production", text: "Made to order by master craftspeople in family-run workshops across Italy and Portugal." },
    { icon: Award, title: "Attention to Detail", text: "Every grain matched, every seam pulled true. Inspected three times before it leaves the atelier." },
  ];
  return (
    <section className="bg-card">
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 py-24 sm:px-8 lg:grid-cols-2 lg:gap-24 lg:px-12 lg:py-36">
        <Reveal>
          <div className="hover-zoom aspect-[4/5] overflow-hidden">
            <img
              src={IMG.craftsmanship}
              alt="An artisan finishing solid walnut by hand in the Aurum atelier"
              loading="lazy"
              className="size-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="flex h-full flex-col justify-center">
            <Eyebrow>The Atelier</Eyebrow>
            <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
              Furniture made the way it was a century ago.
            </h2>
            <p className="mt-6 max-w-lg text-muted-foreground">
              Every Aurum piece begins as raw timber, hide and stone. It passes through the hands of
              a single master craftsperson — joined, upholstered and finished without shortcut — and
              arrives carrying their signature.
            </p>
            <ul className="mt-10 grid gap-8 sm:grid-cols-2">
              {pillars.map((p) => (
                <li key={p.title} className="flex flex-col gap-3">
                  <span className="flex size-10 items-center justify-center border border-accent/40 text-accent">
                    <p.icon className="size-4" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-xl">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ShopByRoom() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 sm:px-8 lg:px-12 lg:py-36">
      <Reveal>
        <SectionHeader
          eyebrow="By Room"
          title="Compose your interior"
          subtitle="Curated by space, considered as a whole."
          align="center"
        />
      </Reveal>
      <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
        {roomCategories.map((r, i) => (
          <Reveal key={r.slug} delay={i * 0.05}>
            <Link
              to="/shop"
              search={{ room: r.slug, sort: "featured" } as never}
              className="group block text-center"
            >
              <div className="hover-zoom aspect-square overflow-hidden bg-card">
                <img
                  src={r.image}
                  alt={r.name}
                  loading="lazy"
                  className="size-full object-cover"
                />
              </div>
              <h3 className="mt-5 text-[12px] font-medium uppercase tracking-[0.22em] text-foreground transition-colors group-hover:text-accent">
                {r.name}
              </h3>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function BestSellers() {
  return (
    <section className="bg-secondary/40">
      <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-8 lg:px-12 lg:py-36">
        <Reveal>
          <SectionHeader
            eyebrow="The Signature Pieces"
            title="Anchors of the collection"
            subtitle="The silhouettes our designers return to — composed, considered and worn-in by years of living."
            cta={{ label: "View signature pieces", to: "/shop", search: { sort: "rating" } }}
          />
        </Reveal>
        <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {bestSellers.slice(0, 6).map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function MaterialsStrip() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 sm:px-8 lg:px-12 lg:py-36">
      <Reveal>
        <SectionHeader
          eyebrow="The Materials"
          title="Specified once. Sourced always."
          subtitle="A library of premium materials, drawn from heritage suppliers across Italy, France and Belgium."
          align="center"
        />
      </Reveal>
      <div className="mt-14 overflow-x-auto pb-2">
        <ul className="flex gap-6 md:grid md:grid-cols-3 md:gap-8 lg:grid-cols-7">
          {MATERIALS.map((m, i) => (
            <Reveal key={m.id} delay={(i % 7) * 0.05}>
              <li className="hover-zoom group relative w-64 shrink-0 overflow-hidden md:w-auto">
                <div className="aspect-[3/4] overflow-hidden bg-muted">
                  <img src={m.image} alt={m.name} loading="lazy" className="size-full object-cover" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-4 text-background">
                  <h3 className="font-display text-lg leading-tight">{m.name}</h3>
                  <p className="mt-1 text-[11px] uppercase tracking-[0.18em] text-background/75">{m.note}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function RoomInspiration() {
  return (
    <section className="bg-card">
      <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-8 lg:px-12 lg:py-36">
        <Reveal>
          <SectionHeader
            eyebrow="Editorial · Shop the Room"
            title="Interiors composed by our designers"
            subtitle="Step into fully shoppable Aurum interiors — every piece curated and instantly available."
          />
        </Reveal>
        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {roomScenes.slice(0, 4).map((scene, i) => (
            <Reveal key={scene.slug} delay={(i % 2) * 0.1}>
              <article className="hover-zoom group relative overflow-hidden">
                <div className="aspect-[5/4] overflow-hidden">
                  <img
                    src={scene.image}
                    alt={scene.name}
                    loading="lazy"
                    className="size-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-background">
                  <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-background/75">
                    Composition {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-3xl">{scene.name}</h3>
                  <p className="mt-3 line-clamp-2 max-w-lg text-sm text-background/85">
                    {scene.description}
                  </p>
                  <Button asChild size="sm" className="mt-6 tracking-[0.2em]">
                    <Link to="/rooms/$slug" params={{ slug: scene.slug }}>
                      Shop the Room <ArrowRight className="size-4" aria-hidden="true" />
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
    <section className="mx-auto max-w-[1400px] px-6 py-24 sm:px-8 lg:px-12 lg:py-36">
      <Reveal>
        <SectionHeader
          eyebrow="New This Season"
          title="Recent additions to the atelier"
          subtitle="The latest pieces from our European workshops."
          cta={{ label: "All new pieces", to: "/shop", search: { sort: "newest" } }}
        />
      </Reveal>
      <div className="mt-16 grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {newArrivals.slice(0, 3).map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.08}>
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
        <img src={IMG.heroAlt} alt="" aria-hidden="true" className="size-full object-cover" />
        <div className="absolute inset-0 bg-primary/88" />
      </div>
      <div className="relative mx-auto max-w-[1400px] px-6 py-28 sm:px-8 lg:px-12 lg:py-40">
        <Reveal>
          <div className="max-w-2xl text-primary-foreground">
            <p className="text-eyebrow text-primary-foreground/70">
              <span className="mr-3 inline-block h-px w-10 align-middle bg-primary-foreground/40" />
              The Design Studio
            </p>
            <h2 className="mt-5 font-display text-4xl tracking-tight sm:text-5xl lg:text-[3.5rem]">
              A private design service, by appointment.
            </h2>
            <p className="mt-6 max-w-xl text-primary-foreground/80">
              From a single statement piece to a complete residence — our senior designers compose
              interiors for private clients, architects and hospitality groups worldwide.
            </p>
          </div>
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {designServices.map((s, i) => {
            const Icon = serviceIcons[s.icon as keyof typeof serviceIcons] ?? Sparkles;
            return (
              <Reveal key={s.id} delay={i * 0.08}>
                <div className="h-full border border-primary-foreground/15 bg-primary-foreground/[0.04] p-8 text-primary-foreground backdrop-blur-sm transition-colors hover:border-accent/60">
                  <span className="flex size-12 items-center justify-center border border-primary-foreground/20 text-accent">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-display text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-primary-foreground/75">{s.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.15}>
          <Button asChild size="lg" variant="secondary" className="mt-12 h-12 px-7 tracking-[0.22em]">
            <Link to="/account">Book a Private Consultation</Link>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}

function ClientProjects() {
  return (
    <section className="mx-auto max-w-[1400px] px-6 py-24 sm:px-8 lg:px-12 lg:py-36">
      <Reveal>
        <SectionHeader
          eyebrow="Selected Projects"
          title="From our portfolio"
          subtitle="A selection of recent residences, hospitality interiors and commercial spaces furnished by Aurum."
        />
      </Reveal>
      <div className="mt-16 grid auto-rows-[280px] grid-cols-1 gap-6 md:grid-cols-3 md:auto-rows-[320px] lg:auto-rows-[380px]">
        {PROJECTS.map((p, i) => {
          const span = i === 0 ? "md:col-span-2 md:row-span-2" : i === 3 ? "md:col-span-2" : "";
          return (
            <Reveal key={p.id} delay={(i % 3) * 0.08}>
              <figure className={`hover-zoom group relative h-full overflow-hidden ${span}`}>
                <img src={p.image} alt={p.title} loading="lazy" className="size-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                <figcaption className="absolute inset-x-0 bottom-0 p-6 text-background">
                  <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-background/70">
                    {p.location}
                  </p>
                  <h3 className="mt-2 font-display text-2xl">{p.title}</h3>
                </figcaption>
              </figure>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="bg-secondary/40">
      <div className="mx-auto max-w-[1400px] px-6 py-24 sm:px-8 lg:px-12 lg:py-36">
        <Reveal>
          <SectionHeader
            eyebrow="In Their Words"
            title="The voices of our clients"
            subtitle="Designers, architects and private collectors on the Aurum experience."
            align="center"
          />
        </Reveal>
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={(i % 3) * 0.08}>
              <figure className="flex h-full flex-col bg-background p-8">
                <Quote className="size-7 text-accent/50" aria-hidden="true" />
                <blockquote className="mt-5 flex-1 font-display text-lg leading-relaxed text-foreground">
                  "{t.quote}"
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3 border-t border-border/70 pt-5">
                  <div className="flex-1">
                    <p className="text-sm font-medium tracking-wide text-foreground">{t.name}</p>
                    <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{t.location}</p>
                  </div>
                  <StarRating rating={t.rating} />
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:px-8 lg:px-12 lg:py-32">
        <Reveal>
          <span className="mx-auto flex size-12 items-center justify-center border border-primary-foreground/20 text-accent">
            <Mail className="size-5" aria-hidden="true" />
          </span>
          <p className="mt-6 text-eyebrow text-primary-foreground/70">Private Mailing List</p>
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">
            Editorial dispatches from the atelier.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-primary-foreground/75">
            New collection previews, private viewing invitations and design conversations — sent
            quietly, never often.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!email) return;
              toast.success("Welcome to the Aurum circle.");
              setEmail("");
            }}
            className="mx-auto mt-10 flex max-w-md flex-col gap-3 sm:flex-row"
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
              placeholder="your@email.com"
              className="border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/40"
            />
            <Button type="submit" variant="secondary" className="shrink-0 tracking-[0.2em]">
              Subscribe
            </Button>
          </form>
          <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-primary-foreground/55">
            Unsubscribe at any time
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
      <Craftsmanship />
      <ShopByRoom />
      <BestSellers />
      <MaterialsStrip />
      <RoomInspiration />
      <NewArrivals />
      <DesignServices />
      <ClientProjects />
      <Testimonials />
      <Newsletter />
    </>
  );
}
