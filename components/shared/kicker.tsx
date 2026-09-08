import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Kicker({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary backdrop-blur-sm",
        className
      )}
    >
      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
      {children}
    </span>
  );
}
