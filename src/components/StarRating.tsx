import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export function StarRating({
  rating,
  size = 14,
  className,
  showValue = false,
}: {
  rating: number;
  size?: number;
  className?: string;
  showValue?: boolean;
}) {
  return (
    <div
      className={cn("flex items-center gap-0.5", className)}
      aria-label={`Rated ${rating.toFixed(1)} out of 5`}
      role="img"
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          width={size}
          height={size}
          aria-hidden="true"
          className={cn(
            i <= Math.round(rating) ? "fill-accent text-accent" : "fill-muted text-muted",
          )}
        />
      ))}
      {showValue && <span className="ml-1 text-xs text-muted-foreground">{rating.toFixed(1)}</span>}
    </div>
  );
}