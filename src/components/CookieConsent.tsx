import { useEffect, useState, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import { Cookie, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const STORAGE_KEY = "aurum.cookie-consent.v1";
const OPEN_EVENT = "aurum:open-cookie-settings";

export type CookiePrefs = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  decidedAt: string;
};

const DEFAULT_PREFS: CookiePrefs = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
  decidedAt: "",
};

function readPrefs(): CookiePrefs | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CookiePrefs) : null;
  } catch {
    return null;
  }
}

function writePrefs(prefs: CookiePrefs) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    /* ignore */
  }
}

export function openCookieSettings() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(OPEN_EVENT));
  }
}

const CATEGORIES: Array<{
  key: keyof Omit<CookiePrefs, "decidedAt" | "necessary">;
  title: string;
  description: string;
}> = [
  {
    key: "analytics",
    title: "Analytics",
    description:
      "Helps us understand how the atelier is used so we can refine the editorial experience. Aggregated and anonymous.",
  },
  {
    key: "marketing",
    title: "Marketing",
    description:
      "Allows tailored editorial dispatches and curated collection previews across partner platforms.",
  },
  {
    key: "preferences",
    title: "Preferences",
    description:
      "Remembers your region, language and recently viewed pieces to personalise your visit.",
  },
];

export function CookieConsent() {
  const [bannerOpen, setBannerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [prefs, setPrefs] = useState<CookiePrefs>(DEFAULT_PREFS);

  useEffect(() => {
    const existing = readPrefs();
    if (!existing) {
      setBannerOpen(true);
    } else {
      setPrefs(existing);
    }
    const handler = () => {
      const current = readPrefs() ?? DEFAULT_PREFS;
      setPrefs(current);
      setModalOpen(true);
    };
    window.addEventListener(OPEN_EVENT, handler);
    return () => window.removeEventListener(OPEN_EVENT, handler);
  }, []);

  const persist = useCallback((next: CookiePrefs) => {
    writePrefs(next);
    setPrefs(next);
    setBannerOpen(false);
    setModalOpen(false);
  }, []);

  const acceptAll = () =>
    persist({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
      decidedAt: new Date().toISOString(),
    });

  const rejectAll = () =>
    persist({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
      decidedAt: new Date().toISOString(),
    });

  const savePrefs = () =>
    persist({ ...prefs, necessary: true, decidedAt: new Date().toISOString() });

  return (
    <>
      {bannerOpen && (
        <div
          role="region"
          aria-label="Cookie consent"
          className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:right-6 lg:left-auto lg:right-8 lg:max-w-md"
        >
          <div className="rounded-lg border border-border/60 bg-card p-5 shadow-2xl sm:p-6">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                <Cookie className="size-4" aria-hidden="true" />
              </span>
              <div className="flex-1">
                <p className="font-display text-lg font-semibold text-foreground">
                  A note on cookies
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  We use cookies for essential functionality and, with your consent, to
                  refine your experience. Read our{" "}
                  <Link
                    to="/cookie-policy"
                    className="underline underline-offset-2 hover:text-foreground"
                  >
                    Cookie Policy
                  </Link>
                  .
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button size="sm" onClick={acceptAll} className="tracking-[0.16em]">
                    Accept all
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={rejectAll}
                    className="tracking-[0.16em]"
                  >
                    Reject non-essential
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setPrefs(readPrefs() ?? DEFAULT_PREFS);
                      setModalOpen(true);
                    }}
                    className="tracking-[0.16em]"
                  >
                    Customise
                  </Button>
                </div>
              </div>
              <button
                type="button"
                aria-label="Dismiss cookie banner"
                onClick={rejectAll}
                className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <X className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              Cookie preferences
            </DialogTitle>
            <DialogDescription>
              Choose which categories of cookies Aurum Interiors may use during your
              visit. You can revisit this at any time from the footer.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="flex items-start justify-between gap-4 rounded-md border border-border/60 bg-secondary/40 p-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Strictly necessary</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Required for cart, checkout, security and core site functionality.
                  These cookies cannot be disabled.
                </p>
              </div>
              <Switch checked disabled aria-label="Necessary cookies (always on)" />
            </div>

            {CATEGORIES.map((c) => (
              <div
                key={c.key}
                className="flex items-start justify-between gap-4 rounded-md border border-border/60 p-4"
              >
                <div>
                  <p className="text-sm font-semibold text-foreground">{c.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {c.description}
                  </p>
                </div>
                <Switch
                  checked={prefs[c.key]}
                  onCheckedChange={(v) =>
                    setPrefs((p) => ({ ...p, [c.key]: Boolean(v) }))
                  }
                  aria-label={`${c.title} cookies`}
                />
              </div>
            ))}
          </div>

          <DialogFooter className="flex-col gap-2 sm:flex-row sm:justify-between">
            <Button variant="ghost" onClick={rejectAll} className="tracking-[0.16em]">
              Reject non-essential
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={savePrefs} className="tracking-[0.16em]">
                Save preferences
              </Button>
              <Button onClick={acceptAll} className="tracking-[0.16em]">
                Accept all
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
