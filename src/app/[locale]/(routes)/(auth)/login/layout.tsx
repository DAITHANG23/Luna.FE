import { Locale } from "next-intl";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(
  props: Omit<LayoutProps<"/[locale]">, "children">,
) {
  const { locale } = await props.params;
  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "Translation",
  });
  return {
    title: t("headTitle.login"),
    description: "This is the login page for Domique Restaurant customer.",
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
