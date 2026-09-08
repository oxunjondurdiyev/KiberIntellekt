import { cn } from "@/lib/utils";

export function DecorativeOrbs({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <div className="glow-orb animate-float-slow absolute -left-24 -top-16 h-80 w-80 rounded-full bg-primary/25" />
      <div className="glow-orb animate-float-slower absolute -right-20 top-24 h-72 w-72 rounded-full bg-accent/20" />
    </div>
  );
}
