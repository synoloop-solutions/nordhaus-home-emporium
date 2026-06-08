import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Heart, Eye } from "lucide-react";
import { toast } from "sonner";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { StarRating } from "./StarRating";
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
      <div className="relative aspect-[4/5] overflow-hidden bg-muted">
        <Link
          to="/shop/$slug"
          params={{ slug: product.slug }}
          aria-label={`View ${product.name}`}
        >
          <img
            src={product.images[0]}
            alt={product.name}
            loading="lazy"
            width={800}
            height={1000}
            className="absolute inset-0 size-full object-cover transition-all duration-[1200ms] ease-out group-hover:scale-[1.04] group-hover:opacity-0"
          />
          <img
            src={hoverImg}
            alt=""
            aria-hidden="true"
            loading="lazy"
            width={800}
            height={1000}
            className="absolute inset-0 size-full object-cover opacity-0 transition-all duration-[1200ms] ease-out group-hover:scale-[1.04] group-hover:opacity-100"
          />
        </Link>

        <div className="absolute left-4 top-4 flex flex-col gap-1.5">
          {product.salePrice && (
            <span className="border border-accent/60 bg-background/85 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-accent backdrop-blur-sm">
              Atelier Offer
            </span>
          )}
          {product.isNew && (
            <span className="border border-foreground/40 bg-background/85 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-foreground backdrop-blur-sm">
              New
            </span>
          )}
          {!product.inStock && (
            <span className="border border-foreground/40 bg-background/85 px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur-sm">
              On Request
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={() => {
            toggle(product.slug);
            toast(wished ? "Removed from wishlist" : "Saved to wishlist");
          }}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={wished}
          className="absolute right-4 top-4 flex size-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition hover:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Heart className={cn("size-4", wished && "fill-accent text-accent")} aria-hidden="true" />
        </button>

        <div className="absolute inset-x-4 bottom-4 translate-y-3 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            className="w-full gap-2 tracking-[0.16em]"
            onClick={() => setQuickOpen(true)}
          >
            <Eye className="size-4" aria-hidden="true" /> Quick View
          </Button>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-1.5 text-center">
        <h3 className="font-display text-xl leading-tight">
          <Link to="/shop/$slug" params={{ slug: product.slug }} className="transition-colors hover:text-accent">
            {product.name}
          </Link>
        </h3>
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <StarRating rating={product.rating} />
          <span>({product.reviewCount})</span>
        </div>
        <div className="mt-1 flex items-center justify-center gap-2 text-sm">
          <span className="font-medium tracking-wide text-foreground">{formatPrice(price)}</span>
          {product.salePrice && (
            <span className="text-xs text-muted-foreground line-through">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
        {product.colors.length > 0 && (
          <div className="mt-1 flex items-center justify-center gap-1.5" aria-hidden="true">
            {product.colors.slice(0, 5).map((c) => (
              <span
                key={c.label}
                title={c.label}
                className="size-3 rounded-full border border-border/70"
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
