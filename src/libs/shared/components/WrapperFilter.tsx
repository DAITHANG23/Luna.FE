"use client";
import useBreakPoints from "@/features/hooks/useBreakPoints";
import { cn } from "@/utils/css";
import { useTranslations } from "next-intl";
import { ScrollTextIcon } from "lucide-react";

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
  const tNotification = useTranslations("Notification");

  if (!hasMounted) return null;

  return isDesktopSize ? (
    <div className="py-5">{children}</div>
  ) : (
    <div className="relative w-full">
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity duration-300"
          onClick={handleCloseMenu}
        />
      )}
      <div
        className="relative z-50 mb-4 flex cursor-pointer flex-row flex-nowrap justify-start gap-2 rounded-lg border border-solid border-gray-500 bg-white p-3 shadow-lg dark:border-white dark:bg-gray-900 dark:shadow-white/20"
        onClick={() => setOpen(!open)}
      >
        <ScrollTextIcon
          className={cn("size-6", open ? "text-primary" : "text-primary-text")}
        />
        <span className={cn(open ? "text-primary" : "text-primary-text")}>
          {tNotification("title")}
        </span>
      </div>
      <div
        className={cn(
          classNameMenu,
          "shadow-custom-blue absolute top-[150%] left-0 flex w-full translate-y-[-2em] flex-col! flex-nowrap justify-between rounded-lg bg-white px-2 py-4 opacity-0 transition-all duration-300",
          open
            ? "visible top-full z-50 h-auto translate-y-[0%] opacity-100"
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
