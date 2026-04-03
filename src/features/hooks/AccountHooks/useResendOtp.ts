"use client";
import { useMutation } from "@tanstack/react-query";
import useNotification from "../useNotification";
import apiService from "@/api/endpoints/index";
import { ErrorResponse, ForgotPasswordType } from "@/@types/models";
import { RESEND_OTP_CODE } from "@/app/constants/queryKeys";
import { getErrorDetail, getErrorMessage } from "@/utils";
import { ERROR_KEY } from "@/utils/errorKey";
import { useTranslations } from "next-intl";

const resendOtpCode = (formData: ForgotPasswordType) => {
  return apiService.account.resendOtp({ formData });
};

const useResendOtp = () => {
  const { notify, types } = useNotification();
  const t = useTranslations("Translation");
  return useMutation<unknown, ErrorResponse, ForgotPasswordType>({
    mutationFn: resendOtpCode,
    mutationKey: [RESEND_OTP_CODE],
    onSuccess: async () => {
      notify(t("forgotPassword.validate.sendingEmailSuccess"), {
        type: types.success,
      });
      localStorage.removeItem("resendOtp");
    },
    onError: (err: ErrorResponse) => {
      const { key: errorCode, data: errorDetails } = getErrorDetail({
        error: err,
      });

      const messages = {
        [ERROR_KEY.EMAIL_IS_NOT_EXISTED]: t(
          "forgotPassword.validate.emailIsNotExisted"
        ),
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

export default useResendOtp;
