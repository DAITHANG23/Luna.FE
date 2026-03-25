"use client";
import { ROUTES } from "@/constants";
import { AuthorizationImage } from "@/libs/assets";
import { useRouter } from "@/libs/next-intl/navigation";
import { useTranslations } from "next-intl";

const AuthorizePage = () => {
  const router = useRouter();
  const t = useTranslations("Translation");

  return (
    <div className="my-20 flex flex-col items-center justify-center gap-4 text-center sm:my-34">
      <AuthorizationImage />

      <h2 className="text-primary mt-4">{t("authorize")}</h2>

      <button
        className="rounded-lg bg-gray-800 px-4 py-[6px] text-white shadow-lg hover:bg-gray-600"
        onClick={() => router.push(`${ROUTES.LOGIN.INDEX}`)}
      >
        {t("returnLogin")}
      </button>
    </div>
  );
};

export default AuthorizePage;
