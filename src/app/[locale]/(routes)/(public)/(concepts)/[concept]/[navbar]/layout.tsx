import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";
import _ from "lodash";

export async function generateMetadata(
  props: Omit<LayoutProps<"/[locale]/[concept]/[navbar]">, "children">
) {
  const { locale, concept, navbar } = await props.params;
  const titleConcept = _.startCase(_.toLower(concept));
  const titleNavbar = _.startCase(_.toLower(navbar));
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "Translation",
  });
  return {
    title: t("headTitle.navbar", {
      concept: titleConcept,
      navbar: titleNavbar,
    }),
    description: "Explore our diverse restaurant concepts at Domique Fusion.",
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
