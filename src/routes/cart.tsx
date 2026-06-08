import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingBag, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TrustBar } from "@/components/TrustBar";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Shopping Cart — NordHaus Living" },
      { name: "description", content: "Review the items in your NordHaus Living cart." },
    ],
    links: [{ rel: "canonical", href: "/cart" }],
  }),
  component: CartPage,
});

function CartPage() {
  const cart = useCart();
  const [code, setCode] = useState("");

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6">
        <ShoppingBag className="mx-auto size-10 text-muted-foreground" aria-hidden="true" />
        <h1 className="mt-4 font-display text-2xl font-semibold">Your cart is empty</h1>
        <Button asChild className="mt-6"><Link to="/shop">Start shopping</Link></Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-semibold">Shopping Cart</h1>
      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_360px]">
        <ul className="divide-y">
          {cart.items.map((item, i) => {
            const p = cart.getProductFor(item);
            if (!p) return null;
            return (
              <li key={i} className="flex gap-4 py-5">
                <img src={p.images[0]} alt={p.name} className="size-24 rounded-md object-cover" />
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-2">
                    <Link to="/shop/$slug" params={{ slug: p.slug }} className="font-medium hover:text-accent">{p.name}</Link>
                    <span className="font-semibold">{formatPrice(item.unitPrice * item.qty)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {Object.values(item.options).filter(Boolean).join(" · ")}
                  </p>
                  <div className="mt-auto flex items-center gap-3">
                    <div className="flex items-center rounded-md border">
                      <button className="px-2 py-1" aria-label="Decrease quantity" onClick={() => cart.updateQty(i, item.qty - 1)}>−</button>
                      <span className="w-8 text-center text-sm">{item.qty}</span>
                      <button className="px-2 py-1" aria-label="Increase quantity" onClick={() => cart.updateQty(i, item.qty + 1)}>+</button>
                    </div>
                    <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive" onClick={() => cart.removeItem(i)}>
                      <Trash2 className="size-3.5" /> Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="h-fit rounded-lg border bg-card p-6">
          <h2 className="font-display text-lg font-semibold">Order Summary</h2>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatPrice(cart.subtotal)}</dd></div>
            {cart.discount > 0 && <div className="flex justify-between text-accent"><dt>Discount ({cart.promo?.code})</dt><dd>−{formatPrice(cart.discount)}</dd></div>}
            <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd>{cart.shipping === 0 ? "Free" : formatPrice(cart.shipping)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Tax</dt><dd>{formatPrice(cart.tax)}</dd></div>
            <div className="flex justify-between border-t pt-2 text-base font-semibold"><dt>Total</dt><dd>{formatPrice(cart.total)}</dd></div>
          </dl>
          <form className="mt-4 flex gap-2" onSubmit={(e) => { e.preventDefault(); cart.applyPromo(code) ? toast.success("Promo applied") : toast.error("Invalid code"); }}>
            <label htmlFor="promo" className="sr-only">Promo code</label>
            <Input id="promo" placeholder="Promo code (try WELCOME10)" value={code} onChange={(e) => setCode(e.target.value)} />
            <Button type="submit" variant="outline">Apply</Button>
          </form>
          <Button asChild className="mt-4 w-full"><Link to="/checkout">Proceed to checkout</Link></Button>
          <Button asChild variant="ghost" className="mt-2 w-full"><Link to="/shop">Continue shopping</Link></Button>
          <div className="mt-4"><TrustBar variant="compact" /></div>
        </aside>
      </div>
    </div>
  );
}