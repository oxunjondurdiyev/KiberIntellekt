"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useThemeTransition } from "@/components/motion/use-theme-transition";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { toggleTheme, resolvedTheme } = useThemeTransition();
  const t = useTranslations("nav");

  // next-themes resolves the real theme synchronously on the client (from
  // localStorage), so checking `resolvedTheme` alone would make the very
  // first client render diverge from the server's markup. Deferring the
  // flip to an effect guarantees the first client render matches the
  // server's fallback, avoiding a hydration mismatch.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={(event) => toggleTheme(event)}
      aria-label={t("toggleTheme")}
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border text-foreground/80 transition-colors hover:bg-secondary"
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted ? (
          <motion.span
            key={isDark ? "moon" : "sun"}
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.25 }}
            className="flex"
          >
            {isDark ? <Moon size={18} /> : <Sun size={18} />}
          </motion.span>
        ) : (
          <span className="flex opacity-0">
            <Sun size={18} />
          </span>
        )}
      </AnimatePresence>
    </button>
  );
}
