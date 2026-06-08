import { Truck, RotateCcw, ShieldCheck, BadgeCheck } from "lucide-react";
import { trustSignals } from "@/data/catalog";
import { cn } from "@/lib/utils";

const icons = { Truck, RotateCcw, ShieldCheck, BadgeCheck };

export function TrustBar({ variant = "full" }: { variant?: "full" | "compact" }) {
  if (variant === "compact") {
    return (
      <ul className="grid grid-cols-2 gap-3 rounded-lg border bg-card p-4 sm:grid-cols-4">
        {trustSignals.map((t) => {
          const Icon = icons[t.icon as keyof typeof icons];
          return (
            <li key={t.id} className="flex items-center gap-2 text-sm">
              <Icon className="size-4 shrink-0 text-accent" aria-hidden="true" />
              <span className="font-medium text-foreground">{t.title}</span>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <section aria-label="Why shop with us" className="border-y bg-secondary/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:px-8">
        {trustSignals.map((t) => {
          const Icon = icons[t.icon as keyof typeof icons];
          return (
            <div key={t.id} className="flex flex-col items-center gap-2 text-center">
              <span className="flex size-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                <Icon className="size-6" aria-hidden="true" />
              </span>
              <h3 className="text-base font-semibold text-foreground">{t.title}</h3>
              <p className="text-sm text-muted-foreground">{t.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}