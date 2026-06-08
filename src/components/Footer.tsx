import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { toast } from "sonner";
import { roomCategories } from "@/data/catalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="mt-16 border-t bg-secondary/40">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="font-display text-lg font-bold">NordHaus Living</p>
            <p className="mt-3 text-sm text-muted-foreground">
              Considered, warm, and built to last. Scandinavian-inspired furniture for the modern home.
            </p>
            <div className="mt-4 flex gap-2">
              <a href="https://instagram.com" aria-label="Instagram" className="text-muted-foreground hover:text-foreground"><Instagram className="size-5" /></a>
              <a href="https://facebook.com" aria-label="Facebook" className="text-muted-foreground hover:text-foreground"><Facebook className="size-5" /></a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-muted-foreground hover:text-foreground"><Twitter className="size-5" /></a>
            </div>
          </div>
          <nav aria-label="Shop by room">
            <h2 className="text-sm font-semibold">Shop by Room</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {roomCategories.map((r) => (
                <li key={r.slug}>
                  <Link to="/shop" search={{ room: r.slug }} className="hover:text-foreground">{r.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Support">
            <h2 className="text-sm font-semibold">Customer Care</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><Link to="/shop" className="hover:text-foreground">Shop all</Link></li>
              <li><Link to="/wishlist" className="hover:text-foreground">Wishlist</Link></li>
              <li><Link to="/cart" className="hover:text-foreground">Cart</Link></li>
              <li><Link to="/account" className="hover:text-foreground">My account</Link></li>
            </ul>
          </nav>
          <div>
            <h2 className="text-sm font-semibold">Join the list</h2>
            <p className="mt-3 text-sm text-muted-foreground">Exclusive offers and design tips, twice a month.</p>
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.includes("@")) return toast.error("Enter a valid email");
                toast.success("Thanks for subscribing!");
                setEmail("");
              }}
            >
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <Input id="footer-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" required />
              <Button type="submit">Join</Button>
            </form>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t pt-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} NordHaus Living. All rights reserved.</p>
          <p>Secure checkout · Free delivery over $999 · 5-year warranty</p>
        </div>
      </div>
    </footer>
  );
}