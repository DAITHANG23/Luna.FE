"use client";
import { ErrorResponse, UserLogin, UserResponse } from "@/@types/models";
import useNotification from "@/features/hooks/useNotification";
import apiService from "@/api/endpoints/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAppDispatch } from "@/libs/redux/hooks";
import { getAccountInfo } from "@/libs/redux/auth/authSlice";
import { GET_DATA_USER_QUERY_KEY } from "@/app/constants/queryKeys";
import { useRouter, useSearchParams } from "next/navigation";
import { getErrorDetail, getErrorMessage } from "@/utils";
import { ERROR_KEY } from "@/utils/errorKey";
import { useTranslations } from "next-intl";

const updateAccount = async (formData: UserLogin): Promise<UserResponse> => {
  return await apiService.account.updateUser({ formData });
};

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { notify, types } = useNotification();
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("Profile");
  const from = decodeURIComponent(searchParams.get("from") || "");
  return useMutation<UserResponse, ErrorResponse, UserLogin>({
    mutationFn: updateAccount,
    onSuccess: async () => {
      notify(t("profile.updateAccountSuccess"), { type: types.success });
      dispatch(getAccountInfo());
      await queryClient.refetchQueries({
        queryKey: [GET_DATA_USER_QUERY_KEY],
      });
      if (from) {
        router.replace(from);
      }
    },
    onError: (err: ErrorResponse) => {
      const { key: errorCode, data: errorDetails } = getErrorDetail({
        error: err,
      });

      const messages = {
        [ERROR_KEY.NOT_ALLOW_UPDATE_PASSWORD]: t(
          "profile.validate.notAllowUpdatePassword"
        ),
        [ERROR_KEY.UPLOAD_TO_CLOUDINARY_FAILED]: t(
          "profile.validate.uploadToCloudinaryFailed"
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

export default useUpdateProfile;
