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
    title: t("headTitle.home"),
    description:
      "Trang chủ của nhà hàng đặt bàn trực tuyến - Tìm kiếm và đặt bàn tại các nhà hàng yêu thích của bạn.",
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="mt-16 sm:mt-24">{children}</div>;
}
