import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Aurum Interiors" },
      { name: "description", content: "Secure checkout for your Aurum Interiors order." },
      { name: "robots", content: "noindex" },
    ],
    links: [{ rel: "canonical", href: "/checkout" }],
  }),
  component: CheckoutPage,
});

const STEPS = ["Customer", "Delivery", "Shipping", "Payment", "Review", "Done"];

function CheckoutPage() {
  const cart = useCart();
  const [step, setStep] = useState(0);
  const [orderId] = useState(() => "NH-" + Math.floor(100000 + Math.random() * 900000));

  if (cart.items.length === 0 && step < 5) {
    return (
      <div className="mx-auto max-w-md px-4 py-16 text-center">
        <p className="text-muted-foreground">Your cart is empty.</p>
        <Button asChild className="mt-4"><Link to="/shop">Shop now</Link></Button>
      </div>
    );
  }

  const next = (e: React.FormEvent) => { e.preventDefault(); setStep((s) => Math.min(s + 1, 5)); if (step === 4) cart.clear(); };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-3xl font-semibold">Checkout</h1>
      <ol className="mt-6 flex flex-wrap gap-2 text-xs">
        {STEPS.map((s, i) => (
          <li key={s} className={`flex items-center gap-1.5 rounded-full px-3 py-1 ${i <= step ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}`}>
            {i < step ? <Check className="size-3" /> : <span>{i + 1}</span>} {s}
          </li>
        ))}
      </ol>

      <div className="mt-8 rounded-lg border bg-card p-6">
        {step === 0 && (
          <form onSubmit={next} className="space-y-4">
            <h2 className="font-display text-lg font-semibold">Customer Information</h2>
            <div className="space-y-1.5"><Label htmlFor="email">Email</Label><Input id="email" type="email" required /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label htmlFor="fn">First name</Label><Input id="fn" required /></div>
              <div className="space-y-1.5"><Label htmlFor="ln">Last name</Label><Input id="ln" required /></div>
            </div>
            <Button type="submit" className="w-full">Continue</Button>
          </form>
        )}
        {step === 1 && (
          <form onSubmit={next} className="space-y-4">
            <h2 className="font-display text-lg font-semibold">Delivery Information</h2>
            <div className="space-y-1.5"><Label htmlFor="addr">Address</Label><Input id="addr" required /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label htmlFor="city">City</Label><Input id="city" required /></div>
              <div className="space-y-1.5"><Label htmlFor="zip">Postal code</Label><Input id="zip" required /></div>
            </div>
            <div className="space-y-1.5"><Label htmlFor="phone">Phone</Label><Input id="phone" type="tel" required /></div>
            <Button type="submit" className="w-full">Continue</Button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={next} className="space-y-4">
            <h2 className="font-display text-lg font-semibold">Shipping Method</h2>
            <RadioGroup defaultValue="standard" className="space-y-2">
              <Label className="flex items-center justify-between rounded-md border p-3"><span className="flex items-center gap-2"><RadioGroupItem value="standard" /> Standard (5–7 days)</span><span>Free</span></Label>
              <Label className="flex items-center justify-between rounded-md border p-3"><span className="flex items-center gap-2"><RadioGroupItem value="express" /> White-glove (2–3 days)</span><span>{formatPrice(199)}</span></Label>
            </RadioGroup>
            <Button type="submit" className="w-full">Continue</Button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={next} className="space-y-4">
            <h2 className="font-display text-lg font-semibold">Payment Information</h2>
            <div className="space-y-1.5"><Label htmlFor="card">Card number</Label><Input id="card" inputMode="numeric" placeholder="4242 4242 4242 4242" required /></div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1.5"><Label htmlFor="exp">Expiry</Label><Input id="exp" placeholder="MM/YY" required /></div>
              <div className="space-y-1.5"><Label htmlFor="cvc">CVC</Label><Input id="cvc" inputMode="numeric" placeholder="123" required /></div>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><ShieldCheck className="size-4 text-accent" /> Secure 256-bit SSL encrypted payment</p>
            <p className="text-xs leading-relaxed text-muted-foreground">
              By placing your order you agree to our{" "}
              <Link to="/terms-of-service" className="underline underline-offset-2 hover:text-foreground">Terms of Service</Link>
              {" "}and{" "}
              <Link to="/privacy-policy" className="underline underline-offset-2 hover:text-foreground">Privacy Policy</Link>.
            </p>
            <Button type="submit" className="w-full">Review order</Button>

          </form>
        )}
        {step === 4 && (
          <form onSubmit={next} className="space-y-4">
            <h2 className="font-display text-lg font-semibold">Order Review</h2>
            <ul className="divide-y text-sm">
              {cart.items.map((it, i) => {
                const p = cart.getProductFor(it);
                return <li key={i} className="flex justify-between py-2"><span>{p?.name} × {it.qty}</span><span>{formatPrice(it.unitPrice * it.qty)}</span></li>;
              })}
            </ul>
            <div className="flex justify-between border-t pt-2 font-semibold"><span>Total</span><span>{formatPrice(cart.total)}</span></div>
            <Button type="submit" className="w-full">Place order</Button>
          </form>
        )}
        {step === 5 && (
          <div className="space-y-4 text-center">
            <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-accent/10 text-accent"><Check className="size-7" /></span>
            <h2 className="font-display text-2xl font-semibold">Thank you!</h2>
            <p className="text-muted-foreground">Your order <strong>{orderId}</strong> is confirmed. A receipt is on its way to your inbox.</p>
            <Button asChild><Link to="/shop">Continue shopping</Link></Button>
          </div>
        )}
      </div>
    </div>
  );
}