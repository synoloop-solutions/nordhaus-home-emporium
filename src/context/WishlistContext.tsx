import { createContext, useContext, type ReactNode } from "react";
import { useLocalStorage } from "./use-local-storage";

interface WishlistContextValue {
  slugs: string[];
  toggle: (slug: string) => void;
  has: (slug: string) => boolean;
  remove: (slug: string) => void;
  count: number;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useLocalStorage<string[]>("nh_wishlist", []);

  const toggle = (slug: string) =>
    setSlugs((prev) => (prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]));
  const remove = (slug: string) => setSlugs((prev) => prev.filter((s) => s !== slug));
  const has = (slug: string) => slugs.includes(slug);

  return (
    <WishlistContext.Provider value={{ slugs, toggle, has, remove, count: slugs.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}