"use client";
import { useMutation } from "@tanstack/react-query";
import useNotification from "../useNotification";
import apiService from "@/api/endpoints/index";
import {
  ErrorResponse,
  ForgotPasswordType,
  LoginResponse,
} from "@/@types/models";
import { ROUTES } from "@/constants";
import { AxiosError } from "axios";
import { CREATE_NEW_PASSWORD_QUERY_KEY } from "@/app/constants/queryKeys";
import { redirect } from "@/libs/i18n/navigation";
import { useLocale } from "next-intl";

const createNewPassword = (
  formData: ForgotPasswordType
): Promise<LoginResponse> => {
  return apiService.account.createNewPassword({ formData });
};

const useResetPassword = () => {
  const { showSuccess, showError } = useNotification();
  const locale = useLocale();
  return useMutation<
    LoginResponse,
    AxiosError<ErrorResponse>,
    ForgotPasswordType
  >({
    mutationFn: createNewPassword,
    mutationKey: [CREATE_NEW_PASSWORD_QUERY_KEY],
    onSuccess: async () => {
      showSuccess(
        "Change password successful! Please login your account again!"
      );
      localStorage.removeItem("emailResetPassword");
      redirect({ href: ROUTES.LOGIN.INDEX, locale: locale });
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useResetPassword;
