import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { toast } from "sonner";
import { roomCategories } from "@/data/catalog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { openCookieSettings } from "@/components/CookieConsent";


export function Footer() {
  const [email, setEmail] = useState("");
  return (
    <footer className="mt-24 border-t border-border/60 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-[1400px] px-6 py-20 sm:px-8 lg:px-12">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <p className="font-display text-3xl tracking-[0.16em]">AURUM <span className="text-accent">·</span> INTERIORS</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-primary-foreground/75">
              Handcrafted furniture and bespoke interiors. Composed in our European atelier from
              Italian leather, solid oak, travertine and brass — made to be inherited.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="https://instagram.com" aria-label="Instagram" className="text-primary-foreground/70 hover:text-accent"><Instagram className="size-5" /></a>
              <a href="https://facebook.com" aria-label="Facebook" className="text-primary-foreground/70 hover:text-accent"><Facebook className="size-5" /></a>
              <a href="https://twitter.com" aria-label="Twitter" className="text-primary-foreground/70 hover:text-accent"><Twitter className="size-5" /></a>
            </div>
          </div>
          <nav aria-label="Collections">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.28em] text-accent">Collections</h2>
            <ul className="mt-5 space-y-3 text-sm text-primary-foreground/75">
              {roomCategories.map((r) => (
                <li key={r.slug}>
                  <Link to="/shop" search={{ room: r.slug }} className="transition-colors hover:text-primary-foreground">{r.name}</Link>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="The Atelier">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.28em] text-accent">The Atelier</h2>
            <ul className="mt-5 space-y-3 text-sm text-primary-foreground/75">
              <li><Link to="/rooms" className="transition-colors hover:text-primary-foreground">Shop the Room</Link></li>
              <li><Link to="/account" className="transition-colors hover:text-primary-foreground">Design Consultation</Link></li>
              <li><Link to="/account" className="transition-colors hover:text-primary-foreground">Trade Program</Link></li>
              <li><Link to="/wishlist" className="transition-colors hover:text-primary-foreground">Wishlist</Link></li>
              <li><Link to="/account" className="transition-colors hover:text-primary-foreground">My Account</Link></li>
            </ul>
          </nav>
          <nav aria-label="Legal">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.28em] text-accent">Legal</h2>
            <ul className="mt-5 space-y-3 text-sm text-primary-foreground/75">
              <li><Link to="/privacy-policy" className="transition-colors hover:text-primary-foreground">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="transition-colors hover:text-primary-foreground">Terms of Service</Link></li>
              <li><Link to="/cookie-policy" className="transition-colors hover:text-primary-foreground">Cookie Policy</Link></li>
              <li>
                <button
                  type="button"
                  onClick={openCookieSettings}
                  className="text-left transition-colors hover:text-primary-foreground"
                >
                  Cookie Settings
                </button>
              </li>
            </ul>
          </nav>
          <div>
            <h2 className="text-[11px] font-medium uppercase tracking-[0.28em] text-accent">Private Mailing List</h2>
            <p className="mt-5 text-sm text-primary-foreground/75">
              Receive editorial dispatches, new collection previews and invitations to private viewings.
            </p>
            <form
              className="mt-4 flex flex-col gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (!email.includes("@")) return toast.error("Enter a valid email");
                toast.success("Welcome to the Aurum circle.");
                setEmail("");
              }}
            >
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <Input
                id="footer-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/40"
              />
              <Button type="submit" variant="secondary" className="self-start tracking-[0.18em]">
                Subscribe
              </Button>
              <p className="text-[11px] leading-relaxed text-primary-foreground/55">
                By subscribing you agree to our{" "}
                <Link to="/privacy-policy" className="underline underline-offset-2 hover:text-primary-foreground">Privacy Policy</Link>
                {" "}and{" "}
                <Link to="/terms-of-service" className="underline underline-offset-2 hover:text-primary-foreground">Terms</Link>.
              </p>
            </form>
          </div>

        </div>
        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-primary-foreground/15 pt-8 text-[11px] uppercase tracking-[0.22em] text-primary-foreground/55 sm:flex-row">
          <p>© {new Date().getFullYear()} Aurum Interiors · All rights reserved</p>
          <p>Handcrafted in Europe · White-Glove Delivery · Lifetime Warranty</p>
        </div>
      </div>
    </footer>
  );
}
