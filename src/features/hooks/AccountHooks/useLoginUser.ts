"use client";
import { ErrorResponse, LoginResponse, UserLogin } from "@/@types/models";
import apiService from "@/api/endpoints/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ACCOUNT_LOGIN_QUERY_KEY,
  GET_DATA_USER_QUERY_KEY,
} from "@app/constants/queryKeys";
import { sessionId, authentication } from "@/libs/redux/auth/authSlice";
import useNotification from "@/features/hooks/useNotification";
import { getAllNotifications } from "@/libs/redux/masterData/masterDataSlice";
import { useAppDispatch } from "@/libs/redux/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { getErrorDetail, getErrorMessage } from "@/utils";
import { ERROR_KEY } from "@/utils/errorKey";

const loginAccount = async (formData: UserLogin): Promise<LoginResponse> => {
  return await apiService.account.login({ formData });
};
const useLogin = () => {
  const queryClient = useQueryClient();
  const t = useTranslations("Translation");
  const { notify, types } = useNotification();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = decodeURIComponent(searchParams.get("from") || "/");

  return useMutation<LoginResponse, ErrorResponse, UserLogin>({
    mutationFn: loginAccount,
    mutationKey: [ACCOUNT_LOGIN_QUERY_KEY],
    onSuccess: async (res: LoginResponse) => {
      notify(t("login.loginSuccess"), { type: types.success });

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
    onError: (err: ErrorResponse) => {
      const { key: errorCode, data: errorDetails } = getErrorDetail({
        error: err,
      });

      const messages = {
        [ERROR_KEY.EMAIL_IS_NOT_EXISTED]: t("login.validate.emailIsNotExisted"),
        [ERROR_KEY.INCORRECT_PASSWORD]: t("login.validate.incorrectPassword"),
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

export default useLogin;
