"use client";
import {
  ErrorResponse,
  LoginResponse,
  UpdatePasswordType,
} from "@/@types/models";
import useNotification from "@/features/hooks/useNotification";
import { logout } from "@/libs/redux/auth/authSlice";
import { useAppDispatch } from "@/libs/redux/hooks";
import apiService from "@/api/endpoints/index";
import { useMutation } from "@tanstack/react-query";
import { useLocale, useTranslations } from "next-intl";

const updatePasswordAccount = async (
  formData: UpdatePasswordType
): Promise<LoginResponse> => {
  return await apiService.account.updatePassword({ formData });
};

const useUpdatePassword = () => {
  const { notify, types } = useNotification();
  const dispatch = useAppDispatch();
  const t = useTranslations("Profile");
  const locale = useLocale();
  return useMutation<LoginResponse, ErrorResponse, UpdatePasswordType>({
    mutationFn: updatePasswordAccount,
    onSuccess: () => {
      notify(t("security.validate.updateSuccess"), { type: types.success });
      dispatch(logout(locale));
    },
  });
};

export default useUpdatePassword;
