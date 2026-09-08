"use client";

import { useCallback, useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ListFilter,
  X,
} from "lucide-react";
import { CoverImage } from "@/components/shared/cover-image";
import type { Certificate, CertificateCategory } from "@/lib/content/schemas";
import type { AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function CertificateGallery({
  certificates,
  categories,
  locale,
  allLabel,
  categoryLabels,
  issuedByLabel,
  issueDateLabel,
  verifyLabel,
  openLargeLabel,
  emptyLabel,
  closeLabel,
  previousLabel,
  nextLabel,
}: {
  certificates: Certificate[];
  categories: CertificateCategory[];
  locale: AppLocale;
  allLabel: string;
  categoryLabels: Record<string, string>;
  issuedByLabel: string;
  issueDateLabel: string;
  verifyLabel: string;
  openLargeLabel: string;
  emptyLabel: string;
  closeLabel: string;
  previousLabel: string;
  nextLabel: string;
}) {
  const [active, setActive] = useState<CertificateCategory | "all">("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () =>
      active === "all"
        ? certificates
        : certificates.filter((c) => c.category === active),
    [certificates, active]
  );

  const current = openIndex !== null ? filtered[openIndex] : null;

  const goTo = useCallback(
    (delta: number) => {
      setOpenIndex((i) => {
        if (i === null || filtered.length === 0) return i;
        return (i + delta + filtered.length) % filtered.length;
      });
    },
    [filtered.length]
  );

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <ListFilter
          size={16}
          className="mr-1 shrink-0 text-muted-foreground"
        />
        <button
          type="button"
          onClick={() => setActive("all")}
          className={cn(
            "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
            active === "all"
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border text-foreground/70 hover:bg-secondary"
          )}
        >
          {allLabel}
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              active === category
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-foreground/70 hover:bg-secondary"
            )}
          >
            {categoryLabels[category]}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-muted-foreground">
          {emptyLabel}
        </p>
      ) : (
        <div key={active} className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cert, index) => (
            <button
              key={cert.slug}
              type="button"
              onClick={() => setOpenIndex(index)}
              className="card-hover group overflow-hidden rounded-2xl border border-border bg-card text-left"
              aria-label={openLargeLabel}
            >
              <CoverImage
                src={cert.image}
                alt={cert.title[locale]}
                className="aspect-[4/3] w-full"
              />
              <div className="p-5">
                <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {categoryLabels[cert.category]}
                </span>
                <h3 className="mt-3 font-semibold text-foreground">
                  {cert.title[locale]}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {cert.issuer}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      <Dialog.Root
        open={openIndex !== null}
        onOpenChange={(open) => !open && setOpenIndex(null)}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="radix-fade-animated fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />
          <Dialog.Content
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft") goTo(-1);
              if (event.key === "ArrowRight") goTo(1);
            }}
            className="radix-content-animated fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-card"
          >
            {current && (
              <div className="relative">
                <Dialog.Title className="sr-only">
                  {current.title[locale]}
                </Dialog.Title>
                <Dialog.Description className="sr-only">
                  {current.issuer}
                </Dialog.Description>
                <CoverImage
                  src={current.image}
                  alt={current.title[locale]}
                  className="aspect-[4/3] w-full sm:aspect-video"
                  priority
                />
                <div className="flex flex-wrap items-start justify-between gap-4 p-6">
                  <div>
                    <h3 className="font-display text-xl font-bold">
                      {current.title[locale]}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {issuedByLabel}: {current.issuer}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {issueDateLabel}:{" "}
                      {new Intl.DateTimeFormat(locale, {
                        year: "numeric",
                        month: "2-digit",
                      }).format(new Date(current.issueDate))}
                    </p>
                  </div>
                  {current.credentialUrl && (
                    <a
                      href={current.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      {verifyLabel}
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>

                <Dialog.Close asChild>
                  <button
                    type="button"
                    aria-label={closeLabel}
                    className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
                  >
                    <X size={16} />
                  </button>
                </Dialog.Close>

                {filtered.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => goTo(-1)}
                      aria-label={previousLabel}
                      className="absolute left-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      type="button"
                      onClick={() => goTo(1)}
                      aria-label={nextLabel}
                      className="absolute right-4 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur transition-colors hover:bg-black/60"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}
