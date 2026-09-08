import { Mail } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/shared/page-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { SocialLinks } from "@/components/shared/social-links";
import { getSocialLinks } from "@/lib/content/social-links";
import type { AppLocale } from "@/i18n/routing";
import { buildLanguageAlternates, canonicalUrl } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: AppLocale };
  const t = await getTranslations({ locale, namespace: "contact" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: canonicalUrl(locale, "/contact"),
      languages: buildLanguageAlternates("/contact"),
    },
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: AppLocale };
  const t = await getTranslations({ locale, namespace: "contact" });
  const social = getSocialLinks();

  return (
    <div>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-5">
          <Reveal className="rounded-3xl border border-border bg-card p-8 lg:col-span-3">
            <h2 className="font-display text-xl font-bold">
              {t("formTitle")}
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="relative overflow-hidden rounded-3xl border border-border bg-secondary/40 p-8">
              <h2 className="font-display text-xl font-bold">
                {t("socialTitle")}
              </h2>
              <SocialLinks className="mt-6" />

              {social.email && (
                <div className="mt-8 border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground">
                    {t("directEmailLabel")}
                  </p>
                  <a
                    href={`mailto:${social.email}`}
                    className="mt-2 flex items-center gap-2 font-medium text-primary hover:underline"
                  >
                    <Mail size={16} />
                    {social.email}
                  </a>
                </div>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
