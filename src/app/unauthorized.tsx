import { ROUTES } from "@/constants";
import { AuthorizationImage } from "@/libs/assets";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import React from "react";

const UnauthorizedPage = async () => {
  const t = await getTranslations("Translation");

  return (
    <div className="flex flex-col gap-4 justify-center items-center text-center my-[5rem] sm:my-[8.5rem]">
      <AuthorizationImage />

      <h2 className="text-primary mt-4">{t("authorize")}</h2>

      <Link href={`${ROUTES.LOGIN.INDEX}`}>
        <button className="text-white bg-gray-800 hover:bg-gray-600 rounded-lg shadow-lg px-4 py-[6px]">
          {t("returnLogin")}
        </button>
      </Link>
    </div>
  );
};

export default UnauthorizedPage;
