"use client";
import { REGEX_VALIDTATE_PASSWORD } from "@/constants";
import { Form, Formik } from "formik";
import React, { useMemo, useState } from "react";
import * as Yup from "yup";
import useUpdatePassword from "@/features/hooks/AccountHooks/useUpdatePassword";
import { UpdatePasswordType } from "@/@types/models";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { ShieldAlertIcon } from "lucide-react";
import {
  ButtonLoading,
  FieldInput,
  ModalNotification,
  Popover,
} from "@/libs/shared/components";
import { useLocale, useTranslations } from "next-intl";
import { useAppDispatch } from "@/libs/redux/hooks";
import {
  authentication,
  enteredWrongCurrentPasswordNumber,
  logout,
} from "@/libs/redux/auth/authSlice";

export const Security = () => {
  const t = useTranslations("Profile");

  const dispatch = useAppDispatch();
  const locale = useLocale();

  const [fillWrongCurrentPasswordNumber, setFillWrongCurrentPasswordNumber] =
    useState(0);

  const [isOpenModalErrorNotification, setIsOpenModalErrorNotification] =
    useState(false);

  const { mutate: updatePasswordAccount, isPending: isLoadingUpdatePassword } =
    useUpdatePassword();

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
          t("security.validate.formatPassword")
        ),
      passwordCurrent: Yup.string()
        .trim()
        .required(t("security.validate.currentPassword"))
        .min(8, t("security.validate.minPassword"))
        .max(20, t("security.validate.maxPassword"))
        .matches(
          REGEX_VALIDTATE_PASSWORD,
          t("security.validate.formatPassword")
        ),
      passwordConfirm: Yup.string()
        .trim()
        .required(t("security.validate.confirmPassword"))
        .oneOf([Yup.ref("password")], t("security.validate.matchPassword")),
    });
  }, [t]);

  const handleSubmit = (formData: UpdatePasswordType) => {
    updatePasswordAccount(formData, {
      onError: error => {
        if (error?.error?.fillWrongCurrentPasswordNumber) {
          setFillWrongCurrentPasswordNumber(
            error?.error?.fillWrongCurrentPasswordNumber
          );
          setIsOpenModalErrorNotification(
            error?.error?.fillWrongCurrentPasswordNumber < 5
          );

          if (error?.error?.fillWrongCurrentPasswordNumber >= 5) {
            dispatch(
              enteredWrongCurrentPasswordNumber({
                enteredWrongCurrentPasswordNumber: 5,
              })
            );

            dispatch(authentication({ isAuthenticated: false }));
            dispatch(logout(locale));
          }
        }
      },
    });
  };
  return (
    <>
      {isOpenModalErrorNotification && (
        <ModalNotification
          title={t("security.modal.title")}
          content={t("security.modal.content", {
            count: String(fillWrongCurrentPasswordNumber),
          })}
          icon={
            <ShieldAlertIcon
              aria-hidden="true"
              className="h-8 w-8 text-yellow-300"
            />
          }
          open={isOpenModalErrorNotification}
          setOpen={setIsOpenModalErrorNotification}
          labelButton={t("modal.update.labelButton")}
          type="warning"
        />
      )}

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {() => {
          return (
            <Form className="m-auto w-full lg:w-[70%]">
              <div className="text-primary-text flex flex-col overflow-hidden rounded-2xl bg-white p-6 shadow-[rgba(145,158,171,0.16)_0px_4px_8px_0px] dark:bg-[#1C252E]">
                <div className="grid w-full grid-cols-1 gap-4">
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
                            onMouseDown={e => e.preventDefault()}
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
                <div className="mt-4 justify-end text-end">
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
    </>
  );
};
