"use client";
import { cn } from "@/utils";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { conceptNavigation } from "../Header/contants";
import { CONCEPTS_ROUTES } from "@/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { Params } from "next/dist/server/request/params";

interface NavbarConceptProps {
  params: Params;
}

const NavbarConcept = ({ params }: NavbarConceptProps) => {
  const pathnameLocale = params?.locale;
  const mainPathname = `/${params?.concept}`;
  const navbarPathname = `/${params?.navbar}`;

  const [itemNavbar, setItemNavbar] = useState("");
  const t = useTranslations("Concept");

  useEffect(() => {
    setItemNavbar(navbarPathname);
  }, [navbarPathname]);

  const route = useMemo(() => {
    return CONCEPTS_ROUTES.find((c) => `/${c.route}` === mainPathname);
  }, [mainPathname]);

  return (
    <div className="flex text-center gap-[10px] sm:gap-33 px-6 py-2 dark:bg-gray-500 rounded-md mb-2">
      <Link href={`/${pathnameLocale}/${mainPathname}`}>
        <Image
          src={route?.logo || "/favico.ico"}
          width={route?.width || 200}
          height={route?.height || 100}
          alt={route?.name || "img"}
          className="cursor-pointer"
        />
      </Link>

      <div className="lg:ml-20 block content-center">
        <div className="flex space-x-4 ">
          {conceptNavigation.map((item) => (
            <Link
              key={item.name}
              href={`/${pathnameLocale}${mainPathname}${item.href}`}
              className={cn(
                itemNavbar === item.href
                  ? "text-primary underline!"
                  : "text-primary-text dark:text-gray-300 hover:bg-primary dark:hover:bg-gray-700 hover:text-white",
                "rounded-md px-3 py-2 text-sm font-medium flex items-center justify-center",
              )}
              onClick={() => setItemNavbar(item.href)}
            >
              <p className="text-[16px]">
                {t("navbar", { navbar: `${item.name}` })}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavbarConcept;
