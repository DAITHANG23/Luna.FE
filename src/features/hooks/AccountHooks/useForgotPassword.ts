"use client";
import { useMutation } from "@tanstack/react-query";
import useNotification from "../useNotification";
import apiService from "@/api/endpoints/index";
import { ErrorResponse, ForgotPasswordType } from "@/@types/models";
import { AxiosError } from "axios";
import { FORGOT_PASSWORD_QUERY_KEY } from "@/app/constants/queryKeys";
import { getErrorDetail, getErrorMessage } from "@/utils";
import { ERROR_KEY } from "@/utils/errorKey";
import { useTranslations } from "next-intl";

const forgotPassword = (formData: ForgotPasswordType) => {
  return apiService.account.resetPassword({ formData });
};

const useForgotPassword = () => {
  const { notify, types } = useNotification();

  const t = useTranslations("Translation");

  return useMutation<unknown, ErrorResponse, ForgotPasswordType>({
    mutationFn: forgotPassword,
    mutationKey: [FORGOT_PASSWORD_QUERY_KEY],
    onSuccess: async () => {
      notify(t("forgotPassword.validate.sendingEmailSuccess"), {
        type: types.success,
      });
    },
    onError: (err: ErrorResponse) => {
      const { key: errorCode, data: errorDetails } = getErrorDetail({
        error: err,
      });

      const message = {
        [ERROR_KEY.EMAIL_IS_NOT_EXISTED]: t(
          "forgotPassword.validate.emailIsNotExisted"
        ),
        [ERROR_KEY.SENDING_EMAIL_FAIL]: t(
          "forgotPassword.validate.sendingEmailFail"
        ),
      };

      const errorMessage = getErrorMessage({
        translate: t,
        errorCode,
        data: message,
      });

      notify(errorMessage, errorDetails);
    },
  });
};

export default useForgotPassword;
