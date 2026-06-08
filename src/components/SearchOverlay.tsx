import { useState, useMemo } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export function SearchOverlay({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term) ||
          p.style.toLowerCase().includes(term),
      )
      .slice(0, 6);
  }, [q]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!q.trim()) return;
    onOpenChange(false);
    navigate({ to: "/shop", search: { search: q.trim() } });
    setQ("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-24 max-w-xl translate-y-0 gap-0 p-0">
        <DialogTitle className="sr-only">Search products</DialogTitle>
        <form onSubmit={submit} className="flex items-center gap-2 border-b px-4">
          <Search className="size-5 text-muted-foreground" aria-hidden="true" />
          <label htmlFor="site-search" className="sr-only">
            Search products
          </label>
          <Input
            id="site-search"
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search sofas, beds, lighting…"
            className="border-0 px-1 shadow-none focus-visible:ring-0"
          />
          {q && (
            <button type="button" onClick={() => setQ("")} aria-label="Clear search">
              <X className="size-4 text-muted-foreground" />
            </button>
          )}
        </form>
        <div className="max-h-80 overflow-y-auto p-2">
          {q.trim() && results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-muted-foreground">
              No products found for “{q}”.
            </p>
          )}
          {results.map((p) => (
            <Link
              key={p.slug}
              to="/shop/$slug"
              params={{ slug: p.slug }}
              onClick={() => onOpenChange(false)}
              className="flex items-center gap-3 rounded-md px-3 py-2 hover:bg-secondary"
            >
              <img src={p.images[0]} alt="" className="size-12 rounded object-cover" />
              <span className="flex-1">
                <span className="block text-sm font-medium">{p.name}</span>
                <span className="block text-xs text-muted-foreground">{p.category}</span>
              </span>
              <span className="text-sm font-semibold">{formatPrice(p.salePrice ?? p.price)}</span>
            </Link>
          ))}
          {results.length > 0 && (
            <button
              type="button"
              onClick={submit}
              className="mt-1 w-full rounded-md px-3 py-2 text-center text-sm font-medium text-accent hover:bg-secondary"
            >
              View all results for “{q}”
            </button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}