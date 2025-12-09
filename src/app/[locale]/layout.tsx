import { routing } from "@/libs/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale, Locale, NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import AppProviders from "./(routes)/AppProviders";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: Omit<LayoutProps<"/[locale]">, "children">,
) {
  const { locale } = await props.params;

  const t = await getTranslations({
    locale: locale as Locale,
    namespace: "Translation",
  });
  return {
    title: t("title"),
    content: t("content"),
  };
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <NextIntlClientProvider locale={locale}>
      <AppProviders>{children}</AppProviders>
    </NextIntlClientProvider>
  );
}
