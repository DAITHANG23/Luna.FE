"use client";
import { ErrorResponse, UserLogin } from "@/@types/models";
import apiService from "@/api/endpoints/index";
import { useMutation } from "@tanstack/react-query";
import useNotification from "@/features/hooks/useNotification";
import { AxiosError } from "axios";
import { useRouter } from "@/libs/i18n/navigation";

const registerAccount = async (formData: UserLogin) => {
  return await apiService.account.register({ formData });
};
const useRegister = () => {
  const { showError, showSuccess } = useNotification();

  const router = useRouter();
  return useMutation<unknown, AxiosError<ErrorResponse>, UserLogin>({
    mutationFn: registerAccount,
    onSuccess: () => {
      showSuccess("OTP is sent, please check your email!");

      router.push("/verify-otp");
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useRegister;
