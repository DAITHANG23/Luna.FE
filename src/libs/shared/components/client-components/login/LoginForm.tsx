"use client";
import React, { useMemo } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import useLogin from "@/features/hooks/AccountHooks/useLoginUser";
import { UserLogin } from "@/@types/models";
import {
  ButtonLoading,
  FieldInput,
  FormLayout,
} from "@/libs/shared/components";
import SocialLogin from "./SocialLogin";
import { REGEX_VALIDATE_EMAIL, ROUTES } from "@/constants";
import { useTranslations } from "next-intl";
import { Link } from "@/libs/i18n/navigation";

const LoginForm = () => {
  const initialValues = {
    email: "test236@gmail.com",
    password: "Daithang@2306",
  };

  const t = useTranslations("Translation");
  const { mutate: loginAccount, isPending: isLoadingLogin } = useLogin();

  const validationSchema = useMemo(() => {
    return Yup.object({
      email: Yup.string()
        .trim()
        .required(t(`login.validate.email`))
        .matches(REGEX_VALIDATE_EMAIL, t(`login.validate.invalidEmail`)),
      password: Yup.string().trim().required(t(`login.validate.password`)),
    });
  }, [t]);

  const handleSubmit = (formData: UserLogin) => {
    loginAccount(formData);
  };

  return (
    <>
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {() => {
          return (
            <FormLayout>
              <Form>
                <FieldInput title="Email" name="email" required type="text" />

                <h5 className="text-right mt-5">
                  <Link
                    href={`${ROUTES.RESET_PASSWORD.INDEX}`}
                    className="no-underline [&:hover]:!underline hover:underline-offset-2 text-primary-text"
                  >
                    {t(`login.forgotPassword`)}
                  </Link>
                </h5>
                <FieldInput
                  title={t("login.password")}
                  name="password"
                  required
                  type="password"
                  isPasswordFied
                />

                <ButtonLoading
                  type="submit"
                  title={t("button.signIn")}
                  isLoading={isLoadingLogin}
                  sizeButton="large"
                  className="w-full! ml-0! font-bold! text-base! text-white text-center py-1 px-4"
                />
              </Form>
              <SocialLogin />
            </FormLayout>
          );
        }}
      </Formik>
    </>
  );
};

export default LoginForm;
