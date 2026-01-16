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
    <div className="grid p-4 sm:px-10 sm:p-0 sm:grid-cols-2 lg:grid-cols-3 mb-12 sm:gap-4">
      <div className="flex sm:col-span-1 lg:col-span-1 justify-center items-center text-center flex-col p-4 hidden sm:inline-flex">
        <h2 className="text-primary max-w-[450px]">{t("title")}</h2>
        <p className="text-primary-text pb-6 max-w-[450px]">{t("content")}</p>
        <RestaurantLogin />
      </div>

      <div className="flex-1 sm:col-span-1 lg:col-span-2 flex flex-col justify-start items-center">
        {!isResetPasswordPage && (
          <h4 className="mt-20 text-primary-text">
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
                className="no-underline text-success [&:hover]:!underline hover:underline-offset-2"
              >
                {t("button.getStarted")}
              </Link>
            </span>
          </p>
        )}
        <div
          className={clsx(
            isResetPasswordPage ? "mt-[120px]" : "mt-2",
            "w-full max-w-md",
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
