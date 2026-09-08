import { ArrowLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default async function LocaleNotFound() {
  const t = await getTranslations("common");

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="font-display text-7xl font-bold text-primary/30">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold">
        {t("notFoundTitle")}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {t("notFoundDescription")}
      </p>
      <Button asChild className="mt-8">
        <Link href="/">
          <ArrowLeft size={16} />
          {t("backHome")}
        </Link>
      </Button>
    </div>
  );
}
