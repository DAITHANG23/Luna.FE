"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import useLogin from "@/features/hooks/AccountHooks/useLoginUser";
import { UserLogin } from "@/@types/models";
import {
  ButtonLoading,
  FieldInput,
  FormLayout,
  ModalNotification,
} from "@/libs/shared/components";
import SocialLogin from "./SocialLogin";
import { REGEX_VALIDATE_EMAIL, ROUTES } from "@/constants";
import { useTranslations } from "next-intl";
import { Link } from "@/libs/next-intl/navigation";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/libs/redux/store";
import { ShieldAlertIcon } from "lucide-react";
import { useAppSelector } from "@/libs/redux/hooks";
import { accountInfo } from "@/libs/redux/auth/selectors";

const LoginForm = () => {
  const initialValues = {
    email: "test236@gmail.com",
    password: "Daithang@230697",
  };

  const router = useRouter();

  const enteredWrongCurrentPasswordNumber = useSelector(
    (state: RootState) => state.auth.enteredWrongCurrentPasswordNumber
  );

  const userData = useAppSelector(accountInfo);

  const [isOpenModalErrorNotification, setIsOpenModalErrorNotification] =
    useState(false);

  const t = useTranslations("Translation");
  const tProfile = useTranslations("Profile");
  const { mutate: loginAccount, isPending: isLoadingLogin } = useLogin();

  // Redirect to home page if user is already logged in
  useEffect(() => {
    const sessionId = localStorage.getItem("sessionId");
    if (sessionId || userData) {
      router.push(ROUTES.HOME.INDEX);
    }
  }, [router, userData]);

  const [prevEnteredWrong, setPrevEnteredWrong] = useState(
    enteredWrongCurrentPasswordNumber
  );

  if (enteredWrongCurrentPasswordNumber !== prevEnteredWrong) {
    setPrevEnteredWrong(enteredWrongCurrentPasswordNumber);
    if (enteredWrongCurrentPasswordNumber >= 5) {
      setIsOpenModalErrorNotification(true);
    }
  }

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
    if (enteredWrongCurrentPasswordNumber >= 5) {
      setIsOpenModalErrorNotification(true);
      return;
    }

    loginAccount(formData, {
      onError: error => {
        if (
          error?.error?.fillWrongCurrentPasswordNumber &&
          error?.error?.fillWrongCurrentPasswordNumber >= 5
        ) {
          setIsOpenModalErrorNotification(true);
        }
      },
    });
  };

  return (
    <>
      {isOpenModalErrorNotification && (
        <ModalNotification
          title={tProfile("security.modal.title")}
          content={tProfile("security.modal.content2")}
          icon={
            <ShieldAlertIcon
              aria-hidden="true"
              className="h-8 w-8 text-yellow-300"
            />
          }
          open={isOpenModalErrorNotification}
          setOpen={setIsOpenModalErrorNotification}
          labelButton={tProfile("modal.update.labelButton")}
          type="warning"
        />
      )}
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

                <h5 className="mt-5 text-right">
                  <Link
                    href={`${ROUTES.RESET_PASSWORD.INDEX}`}
                    className="text-primary-text no-underline hover:underline-offset-2 [&:hover]:underline!"
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
                  className="ml-0! w-full! px-4 py-1 text-center text-base! font-bold! text-white"
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
