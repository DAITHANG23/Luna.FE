"use client";
import {
  ErrorResponse,
  UserLogin,
  VerifyOtpCreateAccountResponse,
} from "@/@types/models/account";
import apiService from "@/api/endpoints/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ROUTES } from "@/constants";
import useNotification from "@/features/hooks/useNotification";
import { ACCOUNT_REGISTER_QUERY_KEY } from "@/app/constants/queryKeys";
import { useRouter } from "@/libs/next-intl/navigation";
import { getErrorDetail, getErrorMessage } from "@/utils";
import { ERROR_KEY } from "@/utils/errorKey";
import { useTranslations } from "next-intl";

const verifyOtpRegister = async (
  formData: UserLogin
): Promise<VerifyOtpCreateAccountResponse> => {
  return await apiService.account.verifyOtp({ formData });
};
const useVerifyOtp = () => {
  const queryClient = useQueryClient();
  const { notify, types } = useNotification();

  const t = useTranslations("Profile");
  const router = useRouter();
  return useMutation<VerifyOtpCreateAccountResponse, ErrorResponse, UserLogin>({
    mutationFn: verifyOtpRegister,
    onSuccess: () => {
      notify(t("profile.verifyOtpSuccess"), { type: types.success });
      localStorage.removeItem("resendOtp");

      queryClient.invalidateQueries({ queryKey: [ACCOUNT_REGISTER_QUERY_KEY] });
      router.push(ROUTES.LOGIN.INDEX);
    },
    onError: (err: ErrorResponse) => {
      const { key: errorCode, data: errorDetails } = getErrorDetail({
        error: err,
      });

      const messages = {
        [ERROR_KEY.OTP_IS_NULL]: t("profile.otpIsRequired"),
        [ERROR_KEY.OTP_IS_EXPIRED]: t("profile.otpIsExpired"),
        [ERROR_KEY.OTP_IS_INCORRECT]: t("profile.otpIsIncorrect"),
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

export default useVerifyOtp;
