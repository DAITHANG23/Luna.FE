"use client";
import { ForgotPasswordType } from "@/@types/models";
import { useAppContext } from "@/contexts/AppContext";
import { ROUTES } from "@/constants";
import useVerifyOtp from "@/features/hooks/AccountHooks/useVerifyOtp";
import { IllustrationDashboardImage } from "@/libs/assets";
import {
  ButtonLoading,
  FieldInput,
  FormLayout,
  OTPInput,
  ResendButton,
} from "@/libs/shared/components";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import { Form, Formik } from "formik";
import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/libs/next-intl/navigation";

export const VerifyOTP = () => {
  const router = useRouter();
  const { registerData } = useAppContext();
  const t = useTranslations("Translation");
  const [userOtp, setUserOtp] = useState("");

  useEffect(() => {
    localStorage.setItem("resendOtp", "true");
  }, []);

  const emailResetPassword =
    typeof window !== "undefined"
      ? localStorage.getItem("emailResetPassword") || ""
      : "";

  const { mutate: verifyOtp, isPending: isLoadingVerifyOtp } = useVerifyOtp();

  const initialValues = {
    email: emailResetPassword || "",
    firstName: registerData?.firstName || "",
    lastName: registerData?.lastName || "",
    password: registerData?.password || "",
    fullName: registerData?.fullName || "",
    numberPhone: registerData?.numberPhone || "",
    passwordConfirm: registerData?.passwordConfirm || "",
    address: registerData?.address || "",
    dateOfBirth: registerData?.dateOfBirth || "",
  };

  const handleOTPComplete = useCallback(
    (otp: string) => {
      setUserOtp(otp);
    },
    [setUserOtp]
  );

  const handleSubmit = (formData: ForgotPasswordType) => {
    const newFormData = { ...formData, otp: userOtp };

    verifyOtp(newFormData);
  };

  return (
    <Formik onSubmit={handleSubmit} initialValues={initialValues}>
      {() => {
        return (
          <FormLayout>
            <Form>
              <div className="flex w-full flex-col items-center gap-4">
                <IllustrationDashboardImage />
                <h3> {t("resetPassword.title")}</h3>
                <p className="text-center">{t("resetPassword.content")}</p>
                <div className="w-full">
                  <FieldInput
                    title="Email"
                    name="email"
                    required
                    type="text"
                    isReadOnly
                    classNameInput="dark:text-black"
                  />
                </div>
                <OTPInput
                  name="otp"
                  length={6}
                  onComplete={handleOTPComplete}
                />

                <ButtonLoading
                  type="submit"
                  title={t("resetPassword.verify")}
                  isLoading={isLoadingVerifyOtp}
                  sizeButton="large"
                  className="mt-4 ml-0! w-full! px-4 py-1 text-center text-base! font-bold! text-white"
                />
              </div>
            </Form>
            <div className="mt-6 flex flex-col items-center gap-4 text-center">
              <ResendButton />

              <button
                type="button"
                className="text-primary-text flex items-center gap-2 hover:underline"
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
