import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import type { Product } from "@/data/types";
import { formatPrice } from "@/lib/format";
import { StarRating } from "./StarRating";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export function QuickViewDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product;
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const { addItem } = useCart();
  const price = product.salePrice ?? product.price;

  const add = () => {
    addItem({
      slug: product.slug,
      qty: 1,
      unitPrice: price,
      options: Object.fromEntries(
        product.customizations.map((g) => [g.id, g.options[0]?.label ?? ""]),
      ),
    });
    toast.success(`${product.name} added to cart`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl gap-0 overflow-hidden p-0 sm:grid sm:grid-cols-2">
        <img
          src={product.images[0]}
          alt={product.name}
          className="aspect-square w-full object-cover"
        />
        <div className="flex flex-col gap-3 p-6">
          <DialogHeader className="space-y-1 text-left">
            <DialogTitle className="font-display text-xl">{product.name}</DialogTitle>
            <DialogDescription className="sr-only">
              Quick view of {product.name}
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} />
            <span className="text-xs text-muted-foreground">{product.reviewCount} reviews</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">{formatPrice(price)}</span>
            {product.salePrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{product.description}</p>
          <div className="mt-auto flex flex-col gap-2 pt-4">
            <Button onClick={add} disabled={!product.inStock}>
              {product.inStock ? "Add to cart" : "Sold out"}
            </Button>
            <Button asChild variant="outline">
              <Link to="/shop/$slug" params={{ slug: product.slug }} onClick={() => onOpenChange(false)}>
                View full details
              </Link>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}