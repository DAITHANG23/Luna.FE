"use client";
import { ForgotPasswordType } from "@/@types/models";
import { REGEX_VALIDTATE_PASSWORD, ROUTES } from "@/constants";
import useResetPassword from "@/features/hooks/AccountHooks/useResetPassword";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import React, { useCallback, useMemo, useState } from "react";
import * as Yup from "yup";
import { IllustrationDashboardImage } from "@/libs/assets";
import {
  ButtonLoading,
  FieldInput,
  FormLayout,
  OTPInput,
  ResendButton,
} from "@/libs/shared/components";
import { useTranslations } from "next-intl";
import { useRouter } from "@/libs/i18n/navigation";
interface CreateNewPasswordProps {
  id: string;
}

export const CreateNewPassword = ({ id }: CreateNewPasswordProps) => {
  const router = useRouter();
  const t = useTranslations("Translation");
  const [userOtp, setUserOtp] = useState("");

  const emailResetPassword =
    typeof window !== "undefined" && localStorage.getItem("emailResetPassword");

  const { mutate: createNewPassword, isPending: isLoadingCreateNewPassword } =
    useResetPassword();

  const initialValues = {
    email: emailResetPassword || "",
    password: "",
    passwordConfirm: "",
  };

  const validationSchema = useMemo(() => {
    return Yup.object({
      password: Yup.string()
        .trim()
        .required(t("resetPassword.validate.password"))
        .min(8, t("resetPassword.validate.minPassword"))
        .max(20, t("resetPassword.validate.maxPassword"))
        .matches(
          REGEX_VALIDTATE_PASSWORD,
          t("resetPassword.validate.formatPassword")
        ),
      passwordConfirm: Yup.string()
        .trim()
        .oneOf([Yup.ref("password")], t("resetPassword.validate.matchPassword"))
        .required(t("resetPassword.validate.confirmPassword")),
    });
  }, [t]);

  const handleOTPComplete = useCallback(
    (otp: string) => {
      setUserOtp(otp);
    },
    [setUserOtp]
  );

  const handleSubmit = (formData: ForgotPasswordType) => {
    const newFormData = { ...formData, token: id as string, otp: userOtp };
    createNewPassword(newFormData);
  };
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {() => {
        return (
          <FormLayout>
            <Form>
              <div className="flex flex-col items-center gap-4 w-full">
                <IllustrationDashboardImage />
                <h3 className="text-primary-text">
                  {t("resetPassword.title")}
                </h3>
                <p className="text-center text-secondary-text">
                  {t("resetPassword.content")}
                </p>
                <div className="w-full">
                  <FieldInput
                    title="Email"
                    name="email"
                    required
                    type="text"
                    isReadOnly
                  />
                </div>
                <OTPInput length={6} onComplete={handleOTPComplete} />
                <div className="w-full">
                  <FieldInput
                    title={t("resetPassword.password")}
                    name="password"
                    required
                    type="password"
                    isPasswordFied
                  />
                </div>

                <div className="w-full">
                  <FieldInput
                    title={t("resetPassword.confirmPassword")}
                    name="passwordConfirm"
                    required
                    type="password"
                    isPasswordFied
                  />
                </div>

                <ButtonLoading
                  type="submit"
                  title={t("resetPassword.updatePassword")}
                  isLoading={isLoadingCreateNewPassword}
                  sizeButton="large"
                  className="w-full! ml-0! font-bold! text-base! text-white text-center py-1 px-4"
                />
              </div>
            </Form>
            <div className="flex flex-col mt-6 text-center items-center gap-4">
              <ResendButton />
              <button
                type="button"
                className="flex items-center gap-1 hover:underline mr-2"
                onClick={() => router.push(`${ROUTES.LOGIN.INDEX}`)}
              >
                <ChevronLeftIcon width={16} height={16} />
                <span>{t("resetPassword.return")}</span>
              </button>
            </div>
          </FormLayout>
        );
      }}
    </Formik>
  );
};
