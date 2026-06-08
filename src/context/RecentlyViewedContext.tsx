import { createContext, useContext, useCallback, type ReactNode } from "react";
import { useLocalStorage } from "./use-local-storage";

interface RecentlyViewedContextValue {
  slugs: string[];
  record: (slug: string) => void;
}

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(null);
const MAX = 10;

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useLocalStorage<string[]>("nh_recently_viewed", []);

  const record = useCallback(
    (slug: string) =>
      setSlugs((prev) => [slug, ...prev.filter((s) => s !== slug)].slice(0, MAX)),
    [setSlugs],
  );

  return (
    <RecentlyViewedContext.Provider value={{ slugs, record }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) throw new Error("useRecentlyViewed must be used within RecentlyViewedProvider");
  return ctx;
}