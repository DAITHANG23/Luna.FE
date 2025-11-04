"use client";
import { cn } from "@/utils/css";
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
interface SearchFieldProps {
  className?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  classNameContainer?: string;
}
export const SearchField = ({
  className,
  classNameContainer,
  placeholder,
  ...props
}: SearchFieldProps) => {
  const t = useTranslations("Restaurant");

  return (
    <div className={cn(classNameContainer, "relative w-full lg:w-[15.75rem]")}>
      <input
        type="text"
        id="default-search"
        className={cn(
          "w-full p-2 text-sm text-gray-900 border border-gray-300 rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white",
          className
        )}
        placeholder={placeholder || t("concepts.placeholder.search")}
        {...props}
      />
      <div className="absolute right-3 top-2">
        <MagnifyingGlassIcon
          className="text-stone-600 dark:text-stone-200"
          width={20}
          height={20}
        />
      </div>
    </div>
  );
};
