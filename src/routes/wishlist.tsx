import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { getProduct } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/wishlist")({
  head: () => ({
    meta: [
      { title: "Your Wishlist — Aurum Interiors" },
      { name: "description", content: "Saved furniture and decor from Aurum Interiors." },
    ],
    links: [{ rel: "canonical", href: "/wishlist" }],
  }),
  component: WishlistPage,
});

function WishlistPage() {
  const { slugs } = useWishlist();
  const items = slugs.map(getProduct).filter(Boolean);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold">Your Wishlist</h1>
      {items.length === 0 ? (
        <div className="mt-10 rounded-lg border border-dashed p-12 text-center">
          <Heart className="mx-auto size-10 text-muted-foreground" aria-hidden="true" />
          <p className="mt-4 text-muted-foreground">Your wishlist is empty.</p>
          <Button asChild className="mt-4"><Link to="/shop">Explore products</Link></Button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => <ProductCard key={p!.slug} product={p!} />)}
        </div>
      )}
    </div>
  );
}