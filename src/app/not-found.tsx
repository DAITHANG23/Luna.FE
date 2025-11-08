import NotFoundPage from "@/libs/shared/components/client-components/NotFound/NotFound";
import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(
  props: Omit<LayoutProps<"/[locale]">, "children">
) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "Translation",
  });
  return {
    title: t("headTitle.notFound"),
    description: "'The page you are looking for does not exist.'",
  };
}
export default async function NotFound() {
  const t = await getTranslations("Translation");
  return (
    <div>
      <NotFoundPage title={t("notFound")} buttonText={t("returnHome")} />
    </div>
  );
}
