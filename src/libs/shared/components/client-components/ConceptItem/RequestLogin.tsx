import { ROUTES } from "@/constants";
import SocialLogin from "../login/SocialLogin";
import Link from "next/link";
import { useTranslations } from "next-intl";

const RequestLogin = () => {
  const t = useTranslations("Concept");
  return (
    <div className="mx-auto w-[380px] p-4">
      <h2 className="pb-2 text-center">
        {t("loginRequest.titleLoginRequest")}
      </h2>
      <p className="py-2 text-center">{t("loginRequest.contentRequest")}</p>
      <ul className="!list-disc space-y-2 pl-5">
        <li>{t("loginRequest.text1")}</li>
        <li>{t("loginRequest.text2")}</li>
        <li>{t("loginRequest.text3")}</li>
        <li>{t("loginRequest.text4")}</li>
      </ul>
      <div className="pt-12">
        <SocialLogin isButtonGoogleBelow />

        <Link href={ROUTES.LOGIN.INDEX} className="text-center">
          <p className="py-4 underline underline-offset-4 transition duration-300 hover:scale-105">
            {t("loginRequest.login")}
          </p>
        </Link>
      </div>
    </div>
  );
};

export default RequestLogin;
