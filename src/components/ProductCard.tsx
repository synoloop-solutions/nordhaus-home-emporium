import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Eye } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { StarRating } from "./StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useWishlist } from "@/context/WishlistContext";
import { QuickViewDialog } from "./QuickViewDialog";

export function ProductCard({ product }: { product: Product }) {
  const { has, toggle } = useWishlist();
  const [quickOpen, setQuickOpen] = useState(false);
  const wished = has(product.slug);
  const price = product.salePrice ?? product.price;
  const hoverImg = product.images[1] ?? product.images[0];

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-muted">
        <Link
          to="/shop/$slug"
          params={{ slug: product.slug }}
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            width={600}
            height={600}
            className="absolute inset-0 size-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <img
            src={hoverImg}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={600}
            height={600}
            className="absolute inset-0 size-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
        </Link>

        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.salePrice && <Badge className="bg-accent text-accent-foreground">Sale</Badge>}
          {product.isNew && <Badge variant="secondary">New</Badge>}
          {!product.inStock && <Badge variant="outline" className="bg-background">Sold out</Badge>}
        </div>

        <button
          type="button"
          onClick={() => {
            toggle(product.slug);
            toast(wished ? "Removed from wishlist" : "Added to wishlist");
          }}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wished}
          className="absolute right-3 top-3 flex size-9 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Heart className={cn("size-4", wished && "fill-accent text-accent")} aria-hidden="true" />
        </button>

        <div className="absolute inset-x-3 bottom-3 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="w-full gap-2"
            onClick={() => setQuickOpen(true)}
          >
            <Eye className="size-4" aria-hidden="true" /> Quick view
          </Button>
        </div>
      </div>

      <div className="mt-3 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-muted-foreground">({product.reviewCount})</span>
        </div>
        <h3 className="text-sm font-medium leading-snug">
          <Link to="/shop/$slug" params={{ slug: product.slug }} className="hover:text-accent">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{formatPrice(price)}</span>
          {product.salePrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        {product.colors.length > 0 && (
          <div className="mt-1 flex items-center gap-1" aria-hidden="true">
            {product.colors.slice(0, 5).map((c) => (
              <span
                key={c.label}
                title={c.label}
                className="size-3.5 rounded-full border"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
        )}
      </div>

      <QuickViewDialog product={product} open={quickOpen} onOpenChange={setQuickOpen} />
    </article>
  );
}