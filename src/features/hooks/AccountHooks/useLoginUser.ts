"use client";
import { ErrorResponse, LoginResponse, UserLogin } from "@/@types/models";
import apiService from "@/api/endpoints/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ACCOUNT_LOGIN_QUERY_KEY,
  GET_DATA_USER_QUERY_KEY,
} from "@app/constants/queryKeys";
import { sessionId, authentication } from "@/libs/redux/authSlice";
import useNotification from "@/features/hooks/useNotification";
import { AxiosError } from "axios";
import { getAllNotifications } from "@/libs/redux/masterDataSlice";
import { useAppDispatch } from "@/libs/redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";

const loginAccount = async (formData: UserLogin): Promise<LoginResponse> => {
  return await apiService.account.login({ formData });
};
const useLogin = () => {
  const queryClient = useQueryClient();

  const { showSuccess, showError } = useNotification();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = decodeURIComponent(searchParams.get("from") || "/");

  return useMutation<LoginResponse, AxiosError<ErrorResponse>, UserLogin>({
    mutationFn: loginAccount,
    mutationKey: [ACCOUNT_LOGIN_QUERY_KEY],
    onSuccess: async (res: LoginResponse) => {
      showSuccess("Login successful!");
      const sessionIdResponse = res?.sessionId;

      const ttlSeconds = 60 * 60 * 24 * 7;
      if (sessionIdResponse && process.env.NODE_ENV !== "production") {
        document.cookie = `sessionId=${sessionIdResponse}; path=/; SameSite=Lax; Expires=${new Date(Date.now() + ttlSeconds * 1000)}`;
      }

      localStorage.setItem("sessionId", sessionIdResponse as string);
      dispatch(sessionId({ sessionId: sessionIdResponse as string }));
      dispatch(getAllNotifications());
      dispatch(authentication({ isAuthenticated: true }));
      queryClient.invalidateQueries({
        queryKey: [GET_DATA_USER_QUERY_KEY],
      });
      router.replace(from || "/");
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useLogin;
