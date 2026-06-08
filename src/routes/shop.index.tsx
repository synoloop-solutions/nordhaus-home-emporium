import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { zodValidator, fallback } from "@tanstack/zod-adapter";
import { z } from "zod";
import { SlidersHorizontal } from "lucide-react";
import { products, allCategories, allStyles, allColors } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";

const searchSchema = z.object({
  room: fallback(z.string().optional(), undefined),
  category: fallback(z.string().optional(), undefined),
  style: fallback(z.string().optional(), undefined),
  color: fallback(z.string().optional(), undefined),
  search: fallback(z.string().optional(), undefined),
  filter: fallback(z.enum(["new", "sale"]).optional(), undefined),
  sort: fallback(z.enum(["featured", "best", "price-asc", "price-desc", "newest", "rating"]), "featured").default("featured"),
  max: fallback(z.number().optional(), undefined),
});

export const Route = createFileRoute("/shop/")({
  validateSearch: zodValidator(searchSchema),
  head: () => ({
    meta: [
      { title: "Shop All Furniture — Aurum Interiors" },
      { name: "description", content: "Browse sofas, beds, dining, office and outdoor furniture with advanced filters." },
      { property: "og:title", content: "Shop All Furniture — Aurum Interiors" },
      { property: "og:description", content: "Browse the full Aurum Interiors furniture collection." },
    ],
    links: [{ rel: "canonical", href: "/shop" }],
  }),
  component: ShopPage,
});

function ShopPage() {
  const sp = Route.useSearch();
  const navigate = Route.useNavigate();
  const [maxPrice, setMaxPrice] = useState(sp.max ?? 3500);

  const filtered = useMemo(() => {
    let list = [...products];
    if (sp.room) list = list.filter((p) => p.room === sp.room);
    if (sp.category) list = list.filter((p) => p.category === sp.category);
    if (sp.style) list = list.filter((p) => p.style === sp.style);
    if (sp.color) list = list.filter((p) => p.colors.some((c) => c.label === sp.color));
    if (sp.filter === "new") list = list.filter((p) => p.isNew);
    if (sp.filter === "sale") list = list.filter((p) => p.salePrice);
    if (sp.search) {
      const t = sp.search.toLowerCase();
      list = list.filter((p) => (p.name + p.category + p.style).toLowerCase().includes(t));
    }
    list = list.filter((p) => (p.salePrice ?? p.price) <= maxPrice);
    switch (sp.sort) {
      case "price-asc": list.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price)); break;
      case "price-desc": list.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price)); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "newest": list.sort((a, b) => Number(!!b.isNew) - Number(!!a.isNew)); break;
      case "best": list.sort((a, b) => Number(!!b.bestSeller) - Number(!!a.bestSeller)); break;
    }
    return list;
  }, [sp, maxPrice]);

  const setParam = (key: string, value: string | undefined) =>
    navigate({ search: (prev: Record<string, unknown>) => ({ ...prev, [key]: value || undefined }) });

  const filters = (
    <div className="space-y-6">
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Category</legend>
        <div className="space-y-2">
          {allCategories.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm">
              <Checkbox checked={sp.category === c} onCheckedChange={(v) => setParam("category", v ? c : undefined)} />
              {c}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Style</legend>
        <div className="space-y-2">
          {allStyles.map((c) => (
            <label key={c} className="flex items-center gap-2 text-sm">
              <Checkbox checked={sp.style === c} onCheckedChange={(v) => setParam("style", v ? c : undefined)} />
              {c}
            </label>
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Colour</legend>
        <div className="flex flex-wrap gap-2">
          {allColors.map((c) => (
            <button
              key={c.label}
              type="button"
              onClick={() => setParam("color", sp.color === c.label ? undefined : c.label)}
              aria-label={c.label}
              aria-pressed={sp.color === c.label}
              className={`size-7 rounded-full border-2 ${sp.color === c.label ? "border-accent" : "border-border"}`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </fieldset>
      <fieldset>
        <legend className="mb-2 text-sm font-semibold">Max price: ${maxPrice}</legend>
        <Slider min={100} max={3500} step={100} value={[maxPrice]} onValueChange={(v) => setMaxPrice(v[0])} />
      </fieldset>
    </div>
  );

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold">Shop All Furniture</h1>
      <p className="mt-1 text-sm text-muted-foreground">{filtered.length} products</p>

      <div className="mt-6 flex items-center justify-between gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2 lg:hidden">
              <SlidersHorizontal className="size-4" /> Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 overflow-y-auto">
            <SheetTitle className="mb-4">Filters</SheetTitle>
            {filters}
          </SheetContent>
        </Sheet>
        <div className="ml-auto">
          <Select value={sp.sort} onValueChange={(v) => setParam("sort", v)}>
            <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="best">Best Selling</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Customer Rating</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[220px_1fr]">
        <aside className="hidden lg:block" aria-label="Filters">{filters}</aside>
        <div>
          {filtered.length === 0 ? (
            <div className="rounded-lg border border-dashed p-12 text-center">
              <p className="text-muted-foreground">No products match your filters.</p>
              <Button asChild variant="outline" className="mt-4">
                <Link to="/shop" search={{ sort: "featured" }}>Clear filters</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 xl:grid-cols-4">
              {filtered.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}