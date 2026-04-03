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
import { CREATE_NEW_PASSWORD_QUERY_KEY } from "@/app/constants/queryKeys";
import { useParams, useRouter } from "next/navigation";
import { getErrorDetail, getErrorMessage } from "@/utils";
import { ERROR_KEY } from "@/utils/errorKey";
import { useTranslations } from "next-intl";

const createNewPassword = (
  formData: ForgotPasswordType
): Promise<LoginResponse> => {
  return apiService.account.createNewPassword({ formData });
};

const useResetPassword = () => {
  const { notify, types } = useNotification();

  const t = useTranslations("Translation");
  const params = useParams();
  const router = useRouter();
  return useMutation<LoginResponse, ErrorResponse, ForgotPasswordType>({
    mutationFn: createNewPassword,
    mutationKey: [CREATE_NEW_PASSWORD_QUERY_KEY],
    onSuccess: async () => {
      notify(t("resetPassword.resetPasswordSuccess"), { type: types.success });
      localStorage.removeItem("emailResetPassword");
      router.push(`/${params.locale}${ROUTES.LOGIN.INDEX}`);
    },
    onError: (err: ErrorResponse) => {
      const { key: errorCode, data: errorDetails } = getErrorDetail({
        error: err,
      });

      const messages = {
        [ERROR_KEY.EMAIL_IS_NOT_EXISTED]: t(
          "forgotPassword.validate.emailIsNotExisted"
        ),
        [ERROR_KEY.EMAIL_IS_REQUIRED]: t(
          "resetPassword.validate.emailIsRequired"
        ),
        [ERROR_KEY.OTP_IS_NULL]: t("resetPassword.validate.otpIsRequired"),
        [ERROR_KEY.INVALID_OTP_REQUEST]: t(
          "resetPassword.validate.invalidOtpRequest"
        ),
        [ERROR_KEY.OTP_IS_EXPIRED]: t("resetPassword.validate.otpIsExpired"),
      };

      const errorMessage = getErrorMessage({
        translate: t,
        errorCode,
        data: messages,
      });
      notify(errorMessage, errorDetails);
    },
  });
};

export default useResetPassword;
