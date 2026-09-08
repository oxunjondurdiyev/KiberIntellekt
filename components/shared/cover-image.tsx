import Image from "next/image";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function CoverImage({
  src,
  alt,
  className,
  sizes,
  priority,
}: {
  src?: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  if (src) {
    return (
      <div className={cn("relative overflow-hidden", className)}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(min-width: 1024px) 33vw, 100vw"}
          priority={priority}
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-dot-grid relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/20 via-secondary to-accent/15",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute -left-6 -top-6 h-28 w-28 rounded-full bg-primary/25 blur-2xl" />
      <div className="absolute -bottom-8 -right-4 h-32 w-32 rounded-full bg-accent/25 blur-2xl" />
      <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/40 bg-white/10 shadow-lg backdrop-blur-sm dark:border-white/10">
        <Sparkles className="h-6 w-6 text-primary" strokeWidth={1.75} />
      </div>
    </div>
  );
}
