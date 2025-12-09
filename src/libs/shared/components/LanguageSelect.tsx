"use client";
import { languageList } from "@/constants";
import { UK_FLAG, VN_FLAG } from "@/constants";
import { usePathname, useRouter } from "@/libs/i18n/navigation";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Locale, useTranslations } from "next-intl";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useState, useTransition } from "react";

export const LanguageSelect = () => {
  const t = useTranslations("Translation");

  const [langValue, setLangValue] = useState<Locale>();

  const router = useRouter();
  const pathname = usePathname();

  const params = useParams();

  useEffect(() => {
    if (!params.locale) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLangValue(params.locale as Locale);
  }, [params]);

  const [isPending, startTransition] = useTransition();

  const onChangeLanguage = useCallback(
    (nextLocale: Locale) => {
      setLangValue(nextLocale);
      startTransition(() => {
        // Dùng pathname từ next-intl (canonical path)
        // next-intl router.replace sẽ tự động convert nó sang locale mới
        // @ts-expect-error - next-intl router handles pathname conversion
        router.replace({ pathname, params }, { locale: nextLocale });
      });
    },
    [router, pathname, params],
  );

  return (
    <Menu as="div" className="relative mx-3">
      <div>
        <MenuButton
          disabled={isPending}
          className="relative cursor-pointer flex rounded-md! hover:ring-offset-primary/80 dark:bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-hidden"
        >
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          <Image
            src={langValue === "en" ? UK_FLAG : VN_FLAG}
            alt={`${langValue}-img`}
            width={30}
            height={24}
            layout="fixed"
            className="rounded-[5px]!"
          />
        </MenuButton>
      </div>
      <MenuItems
        transition
        className="absolute right-0 z-10 mt-4 w-48 origin-top-right rounded-md bg-white py-1 ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in cursor-pointer"
      >
        {languageList.map((l) => {
          return (
            <MenuItem key={l.value}>
              <button
                className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 "
                onClick={() => onChangeLanguage(l.value)}
              >
                <div className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-200 focus:bg-gray-300">
                  <Image
                    src={l.img}
                    alt={l.name}
                    width={30}
                    height={24}
                    layout="fixed"
                    className="rounded-[5px]!"
                  />
                  <span className="text-base">
                    {t("settings.language", { lng: l.name })}
                  </span>
                </div>
              </button>
            </MenuItem>
          );
        })}
      </MenuItems>
    </Menu>
  );
};
