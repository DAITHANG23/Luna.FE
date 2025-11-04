"use client";
import { NotFound } from "@/libs/assets";
import { useRouter } from "@/libs/i18n/navigation";
import { useTranslations } from "next-intl";
import React from "react";

const NotFoundPage = () => {
  const router = useRouter();
  const t = useTranslations("Translation");

  return (
    <div className="flex flex-col gap-4 justify-center items-center text-center my-[5rem] sm:my-[8.5rem]">
      <NotFound />
      <h2 className="text-primary mt-[16px]">{t("notFound")}</h2>

      <button
        className="text-white bg-gray-800 hover:bg-gray-600 rounded-lg shadow-lg px-4 py-[6px]"
        onClick={() => router.push(`/`)}
      >
        {t("returnHome")}
      </button>
    </div>
  );
};

export default NotFoundPage;
