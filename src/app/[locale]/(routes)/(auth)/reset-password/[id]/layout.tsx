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
    title: t("headTitle.resetPassword"),
    description: "Create a new password for your account.",
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
