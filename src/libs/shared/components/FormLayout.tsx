"use client";
import { ROUTES } from "@/constants";
import { RestaurantLogin } from "@/libs/assets";
import { Link, usePathname } from "@/libs/next-intl/navigation";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import React from "react";

interface FormLayoutProps {
  children: React.ReactNode;
}

export const FormLayout = ({ children }: FormLayoutProps) => {
  const pathname = usePathname();
  const t = useTranslations("Translation");
  const isLoginPage = pathname === `${ROUTES.LOGIN.INDEX}`;
  const isResetPasswordPage =
    !(pathname === `${ROUTES.LOGIN.INDEX}`) &&
    !(pathname === `${ROUTES.REGISTER.INDEX}`);

  return (
    <div className="mb-12 grid p-4 sm:grid-cols-2 sm:gap-4 sm:p-0 sm:px-10 lg:grid-cols-3">
      <div className="flex hidden flex-col items-center justify-center p-4 text-center sm:col-span-1 sm:inline-flex lg:col-span-1">
        <h2 className="text-primary max-w-[450px]">{t("title")}</h2>
        <p className="text-primary-text max-w-[450px] pb-6">{t("content")}</p>
        <RestaurantLogin />
      </div>

      <div className="flex flex-1 flex-col items-center justify-start sm:col-span-1 lg:col-span-2">
        {!isResetPasswordPage && (
          <h4 className="text-primary-text mt-20">
            {isLoginPage ? t("login.titleLogin") : t("register.titleRegister")}
          </h4>
        )}
        {!isResetPasswordPage && (
          <p className="text-primary-text">
            {isLoginPage
              ? t("login.dontHaveAccount")
              : t("register.alreadyHaveAnAccount")}
            <span className="ml-1">
              <Link
                href={
                  isLoginPage
                    ? `${ROUTES.REGISTER.INDEX}`
                    : `${ROUTES.LOGIN.INDEX}`
                }
                className="text-success no-underline hover:underline-offset-2 [&:hover]:!underline"
              >
                {t("button.getStarted")}
              </Link>
            </span>
          </p>
        )}
        <div
          className={clsx(
            isResetPasswordPage ? "mt-[120px]" : "mt-2",
            "w-full max-w-md"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
