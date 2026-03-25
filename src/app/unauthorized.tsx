import { ROUTES } from "@/constants";
import { AuthorizationImage } from "@/libs/assets";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

const UnauthorizedPage = async () => {
  const t = await getTranslations("Translation");

  return (
    <div className="my-[5rem] flex flex-col items-center justify-center gap-4 text-center sm:my-[8.5rem]">
      <AuthorizationImage />

      <h2 className="text-primary mt-4">{t("authorize")}</h2>

      <Link href={`${ROUTES.LOGIN.INDEX}`}>
        <button className="rounded-lg bg-gray-800 px-4 py-[6px] text-white shadow-lg hover:bg-gray-600">
          {t("returnLogin")}
        </button>
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
