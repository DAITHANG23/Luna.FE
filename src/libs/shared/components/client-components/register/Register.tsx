"use client";
import React, { useEffect, useMemo } from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import { UserLogin } from "@/@types/models";
import useRegister from "@/features/hooks/AccountHooks/useRegisterAccount";
import { differenceInYears, parseISO } from "date-fns";
import { useAppContext } from "@/contexts/AppContext";
import {
  ButtonLoading,
  FieldInput,
  FormLayout,
} from "@/libs/shared/components";
import {
  REGEX_VALIDATE_EMAIL,
  REGEX_VALIDTATE_PASSWORD,
  ROUTES,
} from "@/constants";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

const Register = () => {
  const t = useTranslations("Translation");
  const { mutate: registerAccount, isPending: isLoadingRegister } =
    useRegister();

  const router = useRouter();
  const { setRegisterData } = useAppContext();

  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId) {
      router.push(ROUTES.HOME.INDEX);
    }
  }, [router]);

  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string()
        .trim()
        .required(t("register.validate.email"))
        .matches(REGEX_VALIDATE_EMAIL, t("register.validate.invalidEmail")),
      password: Yup.string()
        .trim()
        .required(t("register.validate.password"))
        .min(8, t("register.validate.minPassword"))
        .max(20, t("register.validate.maxPassword"))
        .matches(
          REGEX_VALIDTATE_PASSWORD,
          t("register.validate.formatPassword")
        ),
      firstName: Yup.string()
        .trim()
        .min(3, t("register.validate.minFirstName"))
        .max(50, t("register.validate.maxFirstName"))
        .required(t("register.validate.firstName")),
      lastName: Yup.string()
        .trim()
        .min(3, t("register.validate.minLastName"))
        .max(50, t("register.validate.maxLastName"))
        .required(t("register.validate.lastName")),
      numberPhone: Yup.string()
        .trim()
        .min(10, t("register.validate.minNumberPhone"))
        .max(15, t("register.validate.maxNumberPhone"))
        .required(t("register.validate.numberPhone")),
      passwordConfirm: Yup.string()
        .trim()
        .oneOf([Yup.ref("password")], t("register.validate.matchPassword"))
        .required(t("register.validate.confirmPassword")),
      address: Yup.string()
        .trim()
        .min(5, t("register.validate.minAddress"))
        .max(100, t("register.validate.maxAddress"))
        .required(t("register.validate.address")),
      dateOfBirth: Yup.string()
        .trim()
        .required(t("register.validate.dateOfBirth"))
        .test("is-old-enough", t("register.validate.ageRequirement"), value => {
          if (!value) return false;
          const birthDate = parseISO(value);
          const today = new Date();
          return differenceInYears(today, birthDate) >= 13;
        }),
    });
  }, [t]);

  const handleSubmit = (formData: UserLogin) => {
    const { firstName, lastName } = formData;

    if (typeof window !== "undefined") {
      localStorage.setItem("resendOtp", "true");
    }

    if (formData?.email) {
      localStorage.setItem("emailResetPassword", formData.email);
    }

    const fullName = `${firstName} ${lastName}`;
    const newFormData = { ...formData, fullName };
    setRegisterData(newFormData);
    registerAccount(newFormData);
  };

  const initialValues: UserLogin = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    numberPhone: "",
    passwordConfirm: "",
    address: "",
    dateOfBirth: "",
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
              <div className="flex justify-between gap-4">
                <FieldInput
                  title={t("register.firstName")}
                  name="firstName"
                  required
                  type="text"
                  className="w-full"
                />
                <FieldInput
                  title={t("register.lastName")}
                  name="lastName"
                  required
                  type="text"
                  className="w-full"
                />
              </div>

              <div className="flex justify-between gap-4">
                <FieldInput
                  title={t("register.dateOfBirth")}
                  name="dateOfBirth"
                  required
                  type="date"
                  className="w-full"
                />
                <FieldInput
                  title={t("register.numberPhone")}
                  name="numberPhone"
                  required
                  type="text"
                  className="w-full"
                />
              </div>
              <FieldInput title="Email" name="email" required type="text" />
              <FieldInput
                title={t("register.address")}
                name="address"
                required
                type="text"
              />
              <FieldInput
                title={t("register.password")}
                name="password"
                required
                type="password"
                isPasswordFied
              />

              <FieldInput
                title={t("register.confirmPassword")}
                name="passwordConfirm"
                required
                type="password"
                isPasswordFied
              />
              <ButtonLoading
                type="submit"
                title={t("register.createAccount")}
                isLoading={isLoadingRegister}
                sizeButton="large"
                className="ml-0! w-full! px-4 py-1 text-center text-base! font-bold! text-white"
              />
            </Form>
          </FormLayout>
        );
      }}
    </Formik>
  );
};

export default Register;
