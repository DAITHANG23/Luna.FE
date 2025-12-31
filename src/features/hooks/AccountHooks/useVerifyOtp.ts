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
import { AxiosError } from "axios";
import { ACCOUNT_REGISTER_QUERY_KEY } from "@/app/constants/queryKeys";
import { useRouter } from "@/libs/i18n/navigation";

const verifyOtpRegister = async (
  formData: UserLogin,
): Promise<VerifyOtpCreateAccountResponse> => {
  return await apiService.account.verifyOtp({ formData });
};
const useVerifyOtp = () => {
  const queryClient = useQueryClient();
  const { showError, showSuccess } = useNotification();

  const router = useRouter();
  return useMutation<VerifyOtpCreateAccountResponse, AxiosError<ErrorResponse>, UserLogin>({
    mutationFn: verifyOtpRegister,
    onSuccess: () => {
      showSuccess("Verify successful, your account is actived!");
      localStorage.removeItem("resendOtp");
      
      queryClient.invalidateQueries({ queryKey: [ACCOUNT_REGISTER_QUERY_KEY] });
      router.push(ROUTES.LOGIN.INDEX);
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useVerifyOtp;
