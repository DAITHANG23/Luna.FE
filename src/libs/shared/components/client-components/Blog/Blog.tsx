"use client";
import { Updating } from "@/libs/assets";
import { useRouter } from "@/libs/next-intl/navigation";
import { useTranslations } from "next-intl";
import React from "react";

export const Blog = () => {
  const t = useTranslations("Translation");
  const router = useRouter();

  return (
    <div className="mt-34 flex flex-col justify-center items-center gap-10">
      <Updating />
      <button
        className="text-white bg-gray-800 hover:bg-gray-600 rounded-lg shadow-lg px-4 py-[6px]"
        onClick={() => router.push(`/`)}
      >
        {t("returnHome")}
      </button>
    </div>
  );
};
