"use client";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { CameraIcon } from "@heroicons/react/24/solid";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { DEFAULT_AVATAR, REGEX_VALIDATE_EMAIL, ROUTES } from "@/constants";
import { differenceInYears, parseISO } from "date-fns";
import { Gender, UserLogin, UserModel, UserResponse } from "@/@types/models";
import useUpdateProfile from "@/features/hooks/AccountHooks/useUpdateProfile";
import apiService from "@/api/endpoints/index";
import useNotification from "@/features/hooks/useNotification";
import {
  ArrowPathIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import Skeleton from "./Skeleton";

import {
  ButtonLoading,
  FieldInput,
  ModalNotification,
  RadioGroup,
} from "@/libs/shared/components";
import { useRouter } from "@/libs/i18n/navigation";
import { useTranslations } from "next-intl";

interface GenderList {
  id: string;
  name: string;
  value: Gender;
  title: string;
}

const GENDER_LIST = [
  { id: "male-radio", name: "gender", value: "male", title: "profile.male" },
  {
    id: "female-radio",
    name: "gender",
    value: "female",
    title: "profile.female",
  },
] as Array<GenderList>;

interface ProfileDetailProps {
  userData: UserResponse | undefined;
  isLoading: boolean;
}

export const ProfileDetail = ({ userData, isLoading }: ProfileDetailProps) => {
  const { showSuccess } = useNotification();
  const t = useTranslations("Profile");

  const router = useRouter();

  const {
    mutate: updateAccount,
    isSuccess: isUpdateSuccess,
    isPending: isUpdateLoading,
  } = useUpdateProfile();
  const [isOpenModalUpdate, setIsOpenModalUpdate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(
    userData?.data.data.avatarUrl || DEFAULT_AVATAR
  );

  useEffect(() => {
    if (userData?.data.data.avatarUrl)
      setPreviewImage(userData?.data.data.avatarUrl);
  }, [userData?.data.data.avatarUrl]);

  useEffect(() => {
    if (isUpdateSuccess) {
      setIsOpenModalUpdate(false);
    }
  }, [isUpdateSuccess]);

  const initialValues: UserLogin = {
    email: userData?.data.data.email || "",
    avatarUrl: userData?.data.data.avatarUrl || "",
    firstName: userData?.data.data.firstName || "",
    lastName: userData?.data.data.lastName || "",
    numberPhone: userData?.data.data.numberPhone || "",
    address: userData?.data.data.address || "",
    dateOfBirth: userData?.data.data.dateOfBirth || "",
    gender: userData?.data.data.gender || "male",
  };

  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string()
        .trim()
        .required("Please enter your email!")
        .matches(REGEX_VALIDATE_EMAIL, "Invalid Email!"),
      firstName: Yup.string()
        .trim()
        .min(3, t("profile.validate.minFirstName"))
        .max(50, t("profile.validate.maxFirstName"))
        .required(t("profile.validate.firstName")),
      lastName: Yup.string()
        .trim()
        .min(2, t("profile.validate.minLastName"))
        .max(50, t("profile.validate.maxLastName"))
        .required(t("profile.validate.lastName")),
      gender: Yup.string().trim().required("Please provide your gender!"),
      numberPhone: Yup.string()
        .trim()
        .min(10, t("profile.validate.minNumberPhone"))
        .max(15, t("profile.validate.maxNumberPhone"))
        .required(t("profile.validate.numberPhone")),
      address: Yup.string()
        .trim()
        .min(5, t("profile.validate.minAddress"))
        .max(100, t("profile.validate.maxAddress"))
        .required(t("profile.validate.address")),
      dateOfBirth: Yup.string()
        .trim()
        .required(t("profile.validate.dateOfBirth"))
        .test(
          "is-old-enough",
          t("profile.validate.ageRequirement"),
          (value) => {
            if (!value) return false;
            const birthDate = parseISO(value);
            const today = new Date();
            return differenceInYears(today, birthDate) >= 13;
          }
        ),
    });
  }, [t]);

  const handleSubmit = useCallback((values: UserLogin) => {
    const data: Partial<UserModel> = {};

    (Object.keys(values) as Array<keyof UserLogin>).forEach((key) => {
      const value = values[key];

      if (typeof value === "string" || typeof value === "number") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (data as any)[key] = value;
      }
    });

    const firstName = values.firstName || "";
    const lastName = values.lastName || "";
    const fullName = `${firstName} ${lastName}`.trim();

    data.avatar = values.avatar;
    data.fullName = fullName;

    updateAccount(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteAccount = async () => {
    try {
      await apiService.account.deleteAccount();
      showSuccess("Account deleted successful!");
      router.push(ROUTES.LOGIN.INDEX);
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };
  if (isLoading) return <Skeleton />;

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
      validateOnMount={true}
    >
      {({ setFieldValue, isValid }) => {
        const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFieldValue("avatar", file);
            setPreviewImage(URL.createObjectURL(file));
          }
        };
        return (
          <Form>
            {isOpenModalDelete && (
              <ModalNotification
                title={t("modal.delete.title")}
                content={t("modal.delete.content")}
                icon={
                  <ExclamationTriangleIcon
                    aria-hidden="true"
                    className="size-6 text-red-600"
                  />
                }
                open={isOpenModalDelete}
                setOpen={setIsOpenModalDelete}
                labelButton={t("modal.delete.labelButton")}
                type="delete"
                action={
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-primary/80 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-primary/90 sm:ml-3 sm:w-auto"
                    onClick={handleDeleteAccount}
                  >
                    {t("modal.delete.button")}
                  </button>
                }
              />
            )}
            {isOpenModalUpdate && (
              <ModalNotification
                title={t("modal.update.title")}
                content={t("modal.update.content")}
                icon={
                  <ArrowPathIcon
                    aria-hidden="true"
                    className="w-8 h-8 text-green-500 animate-[spin_3s_linear_infinite]"
                    type="update"
                  />
                }
                open={isOpenModalUpdate}
                setOpen={setIsOpenModalUpdate}
                labelButton={t("modal.update.labelButton")}
                type="update"
                action={
                  <ButtonLoading
                    type="submit"
                    title={t("modal.update.button")}
                    isLoading={isUpdateLoading}
                    onHandleSubmit={handleSubmit}
                    sizeButton="large"
                    className="!sm:w-[100px]"
                  />
                }
              />
            )}
            <div
              className="flex flex-col items-start justify-start gap-6 lg:flex-row"
              style={{ fontFamily: "Inter" }}
            >
              <div className="w-full lg:w-[30%] h-[462px] dark:bg-[#1C252E] shadow-[rgba(145,158,171,0.16)_0px_4px_8px_0px] rounded-2xl overflow-hidden bg-white text-primary-text flex flex-col items-center justify-center ">
                <div className="text-center w-[144px] h-[144px] cursor-pointer overflow-hidden p-[8px] border border-dashed border-[rgba(145,158,171,0.2)] rounded-full relative">
                  <label className="cursor-pointer block">
                    <input
                      name="avatar"
                      type="file"
                      className="hidden"
                      onChange={handleImageChange}
                    />
                    <div className="w-full h-full overflow-hidden rounded-full relative">
                      <div className="relative w-full h-full rounded-full cursor-pointer">
                        <Image
                          src={previewImage}
                          alt="Avatar"
                          width={100}
                          height={100}
                          className="w-full h-full object-cover tex"
                        />

                        <div className="absolute inset-0 flex flex-col gap-2 items-center justify-center bg-[rgba(22,28,36,0.64)] text-white opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100">
                          <CameraIcon className="w-8 h-8" />
                          <span className="text-xs font-normal">
                            {t("photoUpdate")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>

                <span className="mt-6 mx-auto text-xs font-nomal leading-6 text-primary-text block text-center">
                  {t("allowType")}
                  <br />
                  {t("maxSize")}
                </span>

                <button
                  type="button"
                  onClick={() => setIsOpenModalDelete(true)}
                  className="p-2 border-none rounded-lg font-bold text-sm text-white bg-primary/70 hover:bg-primary mt-[50px]"
                >
                  {t("modal.delete.title")}
                </button>
              </div>
              <div
                className="w-full lg:w-[70%] dark:bg-[#1C252E] flex flex-col h-auto p-4 shadow-[rgba(145,158,171,0.16)_0px_4px_8px_0px] rounded-2xl overflow-hidden bg-white text-primary-text font-inter"
                style={{ fontFamily: "Inter" }}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FieldInput
                    title="Email"
                    name="email"
                    required
                    type="text"
                    isReadOnly
                  />
                  <FieldInput
                    title={t("profile.firstName")}
                    name="firstName"
                    required
                    type="text"
                  />
                  <FieldInput
                    title={t("profile.lastName")}
                    name="lastName"
                    required
                    type="text"
                  />

                  <div>
                    <RadioGroup
                      title={t("profile.gender")}
                      itemList={GENDER_LIST}
                    />
                  </div>
                  <FieldInput
                    title={t("profile.address")}
                    name="address"
                    required
                    type="text"
                  />
                  <FieldInput
                    title={t("profile.numberPhone")}
                    name="numberPhone"
                    required
                    type="text"
                  />
                  <FieldInput
                    title={t("profile.dateOfBirth")}
                    name="dateOfBirth"
                    required
                    type="date"
                  />
                </div>
                <div className="justify-end text-end">
                  <button
                    type={isValid ? "button" : "submit"}
                    className="cursor-pointer text-white bg-primary/70 hover:bg-primary/80 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm text-center me-2 dark:focus:ring-primary inline-flex items-center"
                    onClick={() => {
                      if (isValid) {
                        setIsOpenModalUpdate(true);
                      }
                    }}
                  >
                    <p className={"my-2! mx-2! text-sm  opacity-100"}>
                      {t("profile.button")}
                    </p>
                  </button>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
