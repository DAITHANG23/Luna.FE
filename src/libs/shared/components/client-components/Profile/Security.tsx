"use client";
import { REGEX_VALIDTATE_PASSWORD } from "@/constants";
import { Form, Formik } from "formik";
import React, { useMemo } from "react";
import * as Yup from "yup";
import useUpdatePassword from "@/features/hooks/AccountHooks/useUpdatePassword";
import { UpdatePasswordType } from "@/@types/models";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ButtonLoading, FieldInput, Popover } from "@/libs/shared/components";
import { useTranslations } from "next-intl";

export const Security = () => {
  const { mutate: updatePasswordAccount, isPending: isLoadingUpdatePassword } =
    useUpdatePassword();
  const t = useTranslations("Profile");
  const initialValues = {
    passwordCurrent: "",
    password: "",
    passwordConfirm: "",
  };

  const validationSchema = useMemo(() => {
    return Yup.object({
      password: Yup.string()
        .trim()
        .required(t("security.validate.newPassword"))
        .min(8, t("security.validate.minPassword"))
        .max(20, t("security.validate.maxPassword"))
        .matches(
          REGEX_VALIDTATE_PASSWORD,
          t("security.validate.formatPassword"),
        ),
      passwordCurrent: Yup.string()
        .trim()
        .required(t("security.validate.currentPassword"))
        .min(8, "Password must be at least 8 characters!")
        .max(20, "Password must be max 20 characters!")
        .matches(
          REGEX_VALIDTATE_PASSWORD,
          t("security.validate.formatPassword"),
        ),
      passwordConfirm: Yup.string()
        .trim()
        .required(t("security.validate.confirmPassword"))
        .oneOf([Yup.ref("password")], t("security.validate.matchPassword")),
    });
  }, [t]);

  const handleSubmit = (formData: UpdatePasswordType) => {
    updatePasswordAccount(formData);
  };
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {() => {
        return (
          <Form className="w-full lg:w-[70%] m-auto">
            <div className="p-6 dark:bg-[#1C252E] shadow-[rgba(145,158,171,0.16)_0px_4px_8px_0px] rounded-2xl overflow-hidden bg-white text-primary-text flex flex-col">
              <div className="grid grid-cols-1 gap-4 w-full">
                <FieldInput
                  title={t("security.currentPassword")}
                  name="passwordCurrent"
                  required
                  isPasswordFied
                />
                <div className="relative">
                  <FieldInput
                    title={t("security.newPassword")}
                    name="password"
                    required
                    isPasswordFied
                  />
                  <div className="absolute top-0 right-0">
                    <Popover
                      iconButton={
                        <InformationCircleIcon
                          onMouseDown={(e) => e.preventDefault()}
                          width={20}
                          height={20}
                        />
                      }
                      content={<p>{t("security.validate.formatPassword")}</p>}
                    />
                  </div>
                </div>

                <FieldInput
                  title={t("security.confirmPassword")}
                  name="passwordConfirm"
                  required
                  isPasswordFied
                />
              </div>
              <div className="justify-end text-end mt-4">
                <ButtonLoading
                  isLoading={isLoadingUpdatePassword}
                  title={t("security.save")}
                />
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
