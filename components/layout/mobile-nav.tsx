"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "./nav-items";
import { LanguageSwitcher } from "./language-switcher";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const pathname = usePathname();

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label={t("openMenu")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border md:hidden"
        >
          <Menu size={18} />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="radix-fade-animated fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="radix-panel-animated fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col gap-8 border-l border-border bg-background p-6">
          <div className="flex items-center justify-between">
            <Dialog.Title className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              {tCommon("siteName")}
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label={t("closeMenu")}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border"
              >
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          <nav className="flex flex-1 flex-col gap-1">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-3 text-lg font-medium transition-colors",
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-foreground/70 hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {t(item.key)}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 border-t border-border pt-6">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
