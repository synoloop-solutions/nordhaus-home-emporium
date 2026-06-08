import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, User, Menu } from "lucide-react";
import { roomCategories } from "@/data/catalog";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchOverlay } from "./SearchOverlay";

const navLinks = [
  { label: "Collections", to: "/shop" as const, search: { sort: "featured" as const } },
  { label: "Shop the Room", to: "/rooms" as const, search: {} },
  { label: "Living", to: "/shop" as const, search: { room: "living-room" } },
  { label: "Bedroom", to: "/shop" as const, search: { room: "bedroom" } },
  { label: "Dining", to: "/shop" as const, search: { room: "dining-room" } },
  { label: "New", to: "/shop" as const, search: { filter: "new" as const } },
];

function CountBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-medium text-accent-foreground">
      {count > 9 ? "9+" : count}
    </span>
  );
}

export function Header() {
  const { count: cartCount } = useCart();
  const { count: wishCount } = useWishlist();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="bg-primary px-4 py-2.5 text-center text-[11px] font-medium uppercase tracking-[0.22em] text-primary-foreground">
        Complimentary White-Glove Delivery · Bespoke Atelier · Lifetime Craftsmanship Warranty
      </div>

      <div className="border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <div className="mx-auto flex h-20 max-w-[1400px] items-center gap-6 px-6 sm:px-8 lg:px-12">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetTitle className="border-b p-5 font-display text-2xl tracking-wide">AURUM INTERIORS</SheetTitle>
              <nav aria-label="Mobile" className="flex flex-col p-2">
                {navLinks.map((l) => (
                  <SheetClose asChild key={l.label}>
                    <Link
                      to={l.to}
                      search={l.search}
                      className="rounded-sm px-4 py-3 text-sm font-medium tracking-wide hover:bg-secondary"
                    >
                      {l.label}
                    </Link>
                  </SheetClose>
                ))}
                <div className="mt-4 border-t p-4">
                  <SheetClose asChild>
                    <Button asChild className="w-full" size="lg">
                      <Link to="/account">Book Consultation</Link>
                    </Button>
                  </SheetClose>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="shrink-0 font-display text-xl tracking-[0.18em] sm:text-2xl" style={{ whiteSpace: "nowrap" }}>
            AURUM<span className="text-accent">&nbsp;·&nbsp;</span><span className="text-sm tracking-[0.28em]">INTERIORS</span>
          </Link>

          <nav aria-label="Primary" className="ml-4 hidden min-w-0 flex-1 items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                search={l.search}
                className="whitespace-nowrap px-3 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-foreground/75 transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <Button asChild variant="outline" className="hidden border-foreground/30 px-4 text-[11px] font-medium uppercase tracking-[0.22em] hover:bg-primary hover:text-primary-foreground xl:inline-flex">
              <Link to="/account">Book Consultation</Link>
            </Button>
            <Button variant="ghost" size="icon" aria-label="Search" onClick={() => setSearchOpen(true)}>
              <Search className="size-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Account">
                  <User className="size-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild><Link to="/account">Sign in</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/account">Create account</Link></DropdownMenuItem>
                <DropdownMenuItem asChild><Link to="/wishlist">Wishlist</Link></DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/wishlist" aria-label={`Wishlist, ${wishCount} items`}>
                <Heart className="size-5" />
                <CountBadge count={wishCount} />
              </Link>
            </Button>

            <Button variant="ghost" size="icon" className="relative" asChild>
              <Link to="/cart" aria-label={`Cart, ${cartCount} items`}>
                <ShoppingBag className="size-5" />
                <CountBadge count={cartCount} />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <SearchOverlay open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  );
}
