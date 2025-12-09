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
import { useParams, useRouter } from "next/navigation";

const createNewPassword = (
  formData: ForgotPasswordType,
): Promise<LoginResponse> => {
  return apiService.account.createNewPassword({ formData });
};

const useResetPassword = () => {
  const { showSuccess, showError } = useNotification();

  const params = useParams();
  const router = useRouter();
  return useMutation<
    LoginResponse,
    AxiosError<ErrorResponse>,
    ForgotPasswordType
  >({
    mutationFn: createNewPassword,
    mutationKey: [CREATE_NEW_PASSWORD_QUERY_KEY],
    onSuccess: async () => {
      showSuccess(
        "Change password successful! Please login your account again!",
      );
      localStorage.removeItem("emailResetPassword");
      router.push(`/${params.locale}${ROUTES.LOGIN.INDEX}`);
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useResetPassword;
