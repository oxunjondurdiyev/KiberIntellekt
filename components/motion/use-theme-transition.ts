"use client";

import { useCallback } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";

export function useThemeTransition() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = useCallback(
    (event?: React.MouseEvent<HTMLElement>) => {
      const next = resolvedTheme === "dark" ? "light" : "dark";
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (
        !event ||
        prefersReducedMotion ||
        typeof document === "undefined" ||
        typeof document.startViewTransition !== "function"
      ) {
        setTheme(next);
        return;
      }

      const root = document.documentElement;
      const x = event.clientX;
      const y = event.clientY;
      const endRadius = Math.hypot(
        Math.max(x, window.innerWidth - x),
        Math.max(y, window.innerHeight - y)
      );

      root.style.setProperty("--theme-toggle-x", `${x}px`);
      root.style.setProperty("--theme-toggle-y", `${y}px`);
      root.style.setProperty("--theme-toggle-r", `${endRadius}px`);

      document.startViewTransition(() => {
        flushSync(() => {
          setTheme(next);
        });
      });
    },
    [resolvedTheme, setTheme]
  );

  return { toggleTheme, resolvedTheme };
}
