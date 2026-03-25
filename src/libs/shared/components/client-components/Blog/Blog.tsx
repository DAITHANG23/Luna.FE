"use client";
import { Updating } from "@/libs/assets";
import { useRouter } from "@/libs/next-intl/navigation";
import { useTranslations } from "next-intl";
import React from "react";

export const Blog = () => {
  const t = useTranslations("Translation");
  const router = useRouter();

  return (
    <div className="mt-34 flex flex-col items-center justify-center gap-10">
      <Updating />
      <button
        className="rounded-lg bg-gray-800 px-4 py-[6px] text-white shadow-lg hover:bg-gray-600"
        onClick={() => router.push(`/`)}
      >
        {t("returnHome")}
      </button>
    </div>
  );
};
