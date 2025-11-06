"use client";
import { ROUTES } from "@/constants";
import { AuthorizationImage } from "@/libs/assets";
import { useRouter } from "@/libs/i18n/navigation";
import { useTranslations } from "next-intl";

const AuthorizePage = () => {
  const router = useRouter();
  const t = useTranslations("Translation");

  return (
    <div className="flex flex-col gap-4 justify-center items-center text-center my-20 sm:my-34">
      <AuthorizationImage />

      <h2 className="text-primary mt-4">{t("authorize")}</h2>

      <button
        className="text-white bg-gray-800 hover:bg-gray-600 rounded-lg shadow-lg px-4 py-[6px]"
        onClick={() => router.push(`${ROUTES.LOGIN.INDEX}`)}
      >
        {t("returnLogin")}
      </button>
    </div>
  );
};

export default AuthorizePage;
