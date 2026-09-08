"use client";

import { useLocale, useTranslations } from "next-intl";
import { Check, Globe } from "lucide-react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, localeLabels, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LanguageSwitcher() {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label={t("switchLanguage")}
          className="flex h-10 items-center gap-1.5 rounded-full border border-border px-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-secondary"
        >
          <Globe size={16} />
          <span className="uppercase">{locale}</span>
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="radix-content-animated z-50 min-w-40 overflow-hidden rounded-2xl border border-border bg-card p-1.5 text-card-foreground shadow-xl shadow-black/10"
        >
          {routing.locales.map((loc) => (
            <DropdownMenu.Item
              key={loc}
              onSelect={() => router.replace(pathname, { locale: loc })}
              className={cn(
                "flex cursor-pointer items-center justify-between rounded-xl px-3 py-2 text-sm outline-none transition-colors hover:bg-secondary",
                loc === locale && "font-semibold"
              )}
            >
              {localeLabels[loc]}
              {loc === locale && <Check size={14} />}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
