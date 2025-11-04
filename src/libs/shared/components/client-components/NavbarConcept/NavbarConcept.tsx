"use client";
import { cn } from "@/utils";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { conceptNavigation } from "../Header/contants";
import { CONCEPTS_ROUTES } from "@/constants";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import Link from "next/link";

interface NavbarConceptProps {
  pathname: string;
}

const NavbarConcept = ({ pathname }: NavbarConceptProps) => {
  const pathnameNavbar = pathname?.split("/")[2] || pathname;
  const mainPathname = `/${pathname?.split("/")[1]}` || pathname;
  const router = useRouter();
  const locale = useLocale();
  const [itemNavbar, setItemNavbar] = useState(pathnameNavbar);
  const t = useTranslations("Concept");

  useEffect(() => {
    setItemNavbar(pathnameNavbar);
  }, [pathnameNavbar]);

  const route = useMemo(() => {
    return CONCEPTS_ROUTES.find((c) => `/${c.route}` === mainPathname);
  }, [mainPathname]);

  return (
    <div className="flex text-center gap-[10px] sm:gap-[8.25rem] p-2">
      <Image
        src={route?.logo || "/favico.ico"}
        width={route?.width || 200}
        height={route?.height || 100}
        alt={route?.name || "img"}
        className="cursor-pointer"
        onClick={() => router.push(`${locale}/${mainPathname}`)}
      />

      <div className="lg:ml-20 block content-center">
        <div className="flex space-x-4 ">
          {conceptNavigation.map((item) => (
            <Link
              key={item.name}
              href={`${locale}/${route?.route}/${item.href}`}
              className={cn(
                itemNavbar === item.href
                  ? "text-primary !underline"
                  : "text-primary-text dark:text-gray-300 hover:bg-primary dark:hover:bg-gray-700 hover:text-white",
                "rounded-md px-3 py-2 text-sm font-medium flex items-center justify-center"
              )}
              onClick={() => setItemNavbar(item.name)}
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
