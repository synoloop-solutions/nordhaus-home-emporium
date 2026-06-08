import { useRecentlyViewed } from "@/context/RecentlyViewedContext";
import { getProduct } from "@/data/products";
import { ProductCard } from "./ProductCard";

export function RecentlyViewed({ excludeSlug }: { excludeSlug?: string }) {
  const { slugs } = useRecentlyViewed();
  const items = slugs
    .filter((s) => s !== excludeSlug)
    .map(getProduct)
    .filter(Boolean)
    .slice(0, 5);

  if (items.length === 0) return null;

  return (
    <section aria-labelledby="recently-viewed" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 id="recently-viewed" className="mb-6 font-display text-2xl font-semibold">
        Recently viewed
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {items.map((p) => (
          <ProductCard key={p!.slug} product={p!} />
        ))}
      </div>
    </section>
  );
}