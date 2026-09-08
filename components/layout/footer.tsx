import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { navItems } from "./nav-items";
import { SocialLinks } from "@/components/shared/social-links";

export async function Footer() {
  const t = await getTranslations("nav");
  const tCommon = await getTranslations("common");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="font-display text-lg font-bold text-foreground">
              {tCommon("siteName")}
            </p>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {tCommon("tagline")}
            </p>
          </div>

          <nav className="flex flex-col gap-2 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div>
            <SocialLinks />
          </div>
        </div>

        <div className="mt-10 border-t border-border/60 pt-6 text-xs text-muted-foreground">
          © {year} {tCommon("siteName")}. {tCommon("footerRights")}
        </div>
      </div>
    </footer>
  );
}
