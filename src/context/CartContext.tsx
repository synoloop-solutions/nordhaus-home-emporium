import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useLocalStorage } from "./use-local-storage";
import { getProduct } from "@/data/products";
import { FREE_DELIVERY_THRESHOLD } from "@/data/catalog";
import type { Product } from "@/data/types";

export interface CartItem {
  slug: string;
  qty: number;
  unitPrice: number; // computed at add time (base + customizations)
  options: Record<string, string>;
}

interface PromoCode {
  code: string;
  discount: number; // fraction, e.g. 0.1
}

const PROMOS: PromoCode[] = [
  { code: "WELCOME10", discount: 0.1 },
  { code: "NORD15", discount: 0.15 },
];

const TAX_RATE = 0.08;

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
  updateQty: (index: number, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  promo: PromoCode | null;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  freeDeliveryThreshold: number;
  getProductFor: (item: CartItem) => Product | undefined;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>("nh_cart", []);
  const [promoCode, setPromoCode] = useLocalStorage<string | null>("nh_promo", null);

  const addItem = (item: CartItem) =>
    setItems((prev) => {
      const idx = prev.findIndex(
        (p) => p.slug === item.slug && JSON.stringify(p.options) === JSON.stringify(item.options),
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + item.qty };
        return next;
      }
      return [...prev, item];
    });

  const removeItem = (index: number) => setItems((prev) => prev.filter((_, i) => i !== index));
  const updateQty = (index: number, qty: number) =>
    setItems((prev) => prev.map((p, i) => (i === index ? { ...p, qty: Math.max(1, qty) } : p)));
  const clear = () => {
    setItems([]);
    setPromoCode(null);
  };

  const promo = useMemo(() => PROMOS.find((p) => p.code === promoCode) ?? null, [promoCode]);

  const applyPromo = (code: string) => {
    const found = PROMOS.find((p) => p.code === code.trim().toUpperCase());
    if (found) {
      setPromoCode(found.code);
      return true;
    }
    return false;
  };
  const removePromo = () => setPromoCode(null);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.unitPrice * i.qty, 0);
  const discount = promo ? Math.round(subtotal * promo.discount) : 0;
  const afterDiscount = subtotal - discount;
  const shipping = afterDiscount === 0 || afterDiscount >= FREE_DELIVERY_THRESHOLD ? 0 : 149;
  const tax = Math.round(afterDiscount * TAX_RATE);
  const total = afterDiscount + shipping + tax;

  const value: CartContextValue = {
    items,
    addItem,
    removeItem,
    updateQty,
    clear,
    count,
    subtotal,
    promo,
    applyPromo,
    removePromo,
    discount,
    shipping,
    tax,
    total,
    freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
    getProductFor: (item) => getProduct(item.slug),
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}