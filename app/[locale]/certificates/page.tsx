import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/shared/page-hero";
import { CertificateGallery } from "@/components/certificates/certificate-gallery";
import {
  getAllCertificates,
  getCertificateCategories,
} from "@/lib/content/certificates";
import { certificateCategorySchema } from "@/lib/content/schemas";
import type { AppLocale } from "@/i18n/routing";
import { buildLanguageAlternates, canonicalUrl } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: AppLocale };
  const t = await getTranslations({ locale, namespace: "certificates" });
  return {
    title: t("title"),
    description: t("subtitle"),
    alternates: {
      canonical: canonicalUrl(locale, "/certificates"),
      languages: buildLanguageAlternates("/certificates"),
    },
  };
}

export default async function CertificatesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = (await params) as { locale: AppLocale };
  const t = await getTranslations({ locale, namespace: "certificates" });
  const tCommon = await getTranslations({ locale, namespace: "common" });
  const certificates = getAllCertificates();
  const categories = getCertificateCategories();

  const categoryLabels = Object.fromEntries(
    certificateCategorySchema.options.map((category) => [
      category,
      t(`categories.${category}`),
    ])
  );

  return (
    <div>
      <PageHero title={t("title")} subtitle={t("subtitle")} />

      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <CertificateGallery
          certificates={certificates}
          categories={categories}
          locale={locale}
          allLabel={tCommon("allCategories")}
          categoryLabels={categoryLabels}
          issuedByLabel={t("issuedBy")}
          issueDateLabel={t("issueDate")}
          verifyLabel={t("verifyLink")}
          openLargeLabel={t("openLarge")}
          emptyLabel={t("emptyState")}
          closeLabel={tCommon("close")}
          previousLabel={tCommon("previous")}
          nextLabel={tCommon("next")}
        />
      </div>
    </div>
  );
}
