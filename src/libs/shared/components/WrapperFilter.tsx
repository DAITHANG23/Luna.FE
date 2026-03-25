"use client";
import useBreakPoints from "@/features/hooks/useBreakPoints";
import { FilterIcon } from "@/libs/assets";
import { FilterOpenIcon } from "@/libs/assets";
import { cn } from "@/utils/css";
import { useTranslations } from "next-intl";

import React, { useEffect, useState } from "react";

interface WrapperFilterProps {
  children: React.ReactNode;
  classNameMenu?: string;
  isConfirmButton?: boolean;
  isHandleCloseMenu?: boolean;
}
export const WrapperFilter = ({
  children,
  classNameMenu,
  isConfirmButton = false,
  isHandleCloseMenu = false,
}: WrapperFilterProps) => {
  const { isDesktopSize } = useBreakPoints();
  const [open, setOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHasMounted(true);
  }, []);

  const handleCloseMenu = () => {
    setOpen(false);
  };

  const t = useTranslations("Translation");

  if (!hasMounted) return null;

  return isDesktopSize ? (
    <div className="py-5">{children}</div>
  ) : (
    <div className="relative w-full">
      <div
        className="mb-4 flex cursor-pointer flex-row flex-nowrap justify-between rounded-lg border border-solid border-gray-500 p-3"
        onClick={() => setOpen(!open)}
      >
        {open ? <FilterOpenIcon /> : <FilterIcon />}
      </div>
      <div
        className={cn(
          classNameMenu,
          "shadow-custom-blue absolute top-[150%] left-0 block flex w-full translate-y-[-2em] flex-col! flex-nowrap justify-between rounded-lg bg-white px-2 py-4 opacity-0 transition-all duration-300",
          open
            ? "visible top-full z-10 h-auto translate-y-[0%] opacity-100"
            : "z-[-5]"
        )}
        onClick={() => {
          if (isHandleCloseMenu) handleCloseMenu();
        }}
      >
        {children}
        {isConfirmButton && (
          <button
            className="bg-primary mt-4 w-full rounded-lg px-4 py-2 text-center text-base text-white"
            onClick={() => {
              setOpen(false);
            }}
          >
            {t("button.confirm")}
          </button>
        )}
      </div>
    </div>
  );
};
