import {
  ArrowRight,
  Check,
  FlaskConical,
  GraduationCap,
  Lightbulb,
  ShieldCheck,
} from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup, StaggerItem } from "@/components/motion/stagger-group";
import { PageHero } from "@/components/shared/page-hero";
import { DecorativeOrbs } from "@/components/shared/decorative-orbs";
import { getAllServices } from "@/lib/content/services";
import type { AppLocale } from "@/i18n/routing";
import { buildLanguageAlternates, canonicalUrl } from "@/lib/seo";

const iconMap = { GraduationCap, Lightbulb, ShieldCheck, FlaskConical } as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: AppLocale };
  const t = await getTranslations({ locale, namespace: "services" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: canonicalUrl(locale, "/services"),
      languages: buildLanguageAlternates("/services"),
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: AppLocale };
  const t = await getTranslations({ locale, namespace: "services" });
  const services = getAllServices();

  return (
    <div>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <StaggerGroup className="grid gap-6 sm:grid-cols-2">
          {services.map((service) => {
            const Icon =
              iconMap[service.icon as keyof typeof iconMap] ?? Lightbulb;
            return (
              <StaggerItem key={service.slug}>
                <div className="card-hover h-full rounded-2xl border border-border bg-card p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/20 to-accent/15 text-primary">
                    <Icon size={26} />
                  </div>
                  <h2 className="mt-5 font-display text-xl font-bold">
                    {service.title[locale]}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {service.description[locale]}
                  </p>
                  {service.highlights.length > 0 && (
                    <ul className="mt-5 space-y-2">
                      {service.highlights.map((h) => (
                        <li
                          key={h[locale]}
                          className="flex items-start gap-2 text-sm text-foreground/80"
                        >
                          <Check
                            size={16}
                            className="mt-0.5 shrink-0 text-primary"
                          />
                          {h[locale]}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

        <Reveal className="relative mt-20 overflow-hidden rounded-3xl border border-border bg-secondary/40 p-10 text-center sm:p-14">
          <DecorativeOrbs className="opacity-60" />
          <h2 className="relative font-display text-2xl font-bold sm:text-3xl">
            {t("ctaTitle")}
          </h2>
          <p className="relative mx-auto mt-3 max-w-xl text-muted-foreground">
            {t("ctaDescription")}
          </p>
          <Button asChild size="lg" className="relative mt-8">
            <Link href="/contact">
              {t("ctaButton")}
              <ArrowRight size={16} />
            </Link>
          </Button>
        </Reveal>
      </div>
    </div>
  );
}
