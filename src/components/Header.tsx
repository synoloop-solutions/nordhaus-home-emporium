import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
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
  { label: "Shop the Room", to: "/rooms" as const, search: {} },
  ...roomCategories.map((r) => ({ label: r.name, to: "/shop" as const, search: { room: r.slug } })),
  { label: "New Arrivals", to: "/shop" as const, search: { filter: "new" as const } },
  { label: "Sale", to: "/shop" as const, search: { filter: "sale" as const } },
];

function CountBadge({ count }: { count: number }) {
  if (count === 0) return null;
  return (
    <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-accent text-[10px] font-semibold text-accent-foreground">
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
      <div className="bg-primary px-4 py-2 text-center text-xs font-medium text-primary-foreground">
        Free delivery on orders over $999 · Easy 30-day returns
      </div>

      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80 p-0">
              <SheetTitle className="border-b p-4 font-display text-lg">NordHaus Living</SheetTitle>
              <nav aria-label="Mobile" className="flex flex-col p-2">
                {navLinks.map((l) => (
                  <SheetClose asChild key={l.label}>
                    <Link
                      to={l.to}
                      search={l.search}
                      className="rounded-md px-3 py-2.5 text-sm font-medium hover:bg-secondary"
                    >
                      {l.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <Link to="/" className="font-display text-xl font-bold tracking-tight">
            NordHaus<span className="text-accent"> Living</span>
          </Link>

          <nav aria-label="Primary" className="ml-6 hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                search={l.search}
                className="rounded-md px-2.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="ml-auto flex items-center gap-1">
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