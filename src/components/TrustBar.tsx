import { Truck, RotateCcw, ShieldCheck, BadgeCheck } from "lucide-react";
import { trustSignals } from "@/data/catalog";

const icons = { Truck, RotateCcw, ShieldCheck, BadgeCheck };

export function TrustBar({ variant = "full" }: { variant?: "full" | "compact" }) {
  if (variant === "compact") {
    return (
      <ul className="grid grid-cols-2 gap-4 border-y border-border/70 py-5 sm:grid-cols-4">
        {trustSignals.map((t) => {
          const Icon = icons[t.icon as keyof typeof icons];
          return (
            <li key={t.id} className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.18em]">
              <Icon className="size-4 shrink-0 text-accent" aria-hidden="true" />
              <span className="font-medium text-foreground">{t.title}</span>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <section aria-label="The Aurum service" className="border-y border-border/60 bg-card">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-10 px-6 py-14 sm:px-8 lg:grid-cols-4 lg:px-12">
        {trustSignals.map((t) => {
          const Icon = icons[t.icon as keyof typeof icons];
          return (
            <div key={t.id} className="flex flex-col items-center gap-3 text-center">
              <span className="flex size-12 items-center justify-center rounded-full border border-accent/30 text-accent">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="font-display text-xl text-foreground">{t.title}</h3>
              <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{t.text}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
