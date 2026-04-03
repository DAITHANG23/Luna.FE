"use client";
import { ErrorResponse, UserLogin } from "@/@types/models";
import apiService from "@/api/endpoints/index";
import { useMutation } from "@tanstack/react-query";
import useNotification from "@/features/hooks/useNotification";
import { AxiosError } from "axios";
import { useRouter } from "@/libs/next-intl/navigation";
import { getErrorDetail, getErrorMessage } from "@/utils";
import { ERROR_KEY } from "@/utils/errorKey";
import { useTranslations } from "next-intl";

const registerAccount = async (formData: UserLogin) => {
  return await apiService.account.register({ formData });
};
const useRegister = () => {
  const { notify, types } = useNotification();
  const t = useTranslations("Translation.register");
  const router = useRouter();
  return useMutation<unknown, ErrorResponse, UserLogin>({
    mutationFn: registerAccount,
    onSuccess: () => {
      notify(t("sendOtp"), { type: types.success });

      router.push("/verify-otp");
    },
    onError: (err: ErrorResponse) => {
      const { key: errorCode, data: errorDetails } = getErrorDetail({
        error: err,
      });

      const messages = {
        [ERROR_KEY.EMAIL_IS_EXISTED]: t("validate.emailIsExisted"),
        [ERROR_KEY.MISSING_FIELDS]: t("validate.missingFields"),
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

export default useRegister;
