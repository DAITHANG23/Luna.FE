"use client";
import { ErrorResponse, UserLogin, UserResponse } from "@/@types/models";
import useNotification from "@/features/hooks/useNotification";
import apiService from "@/api/endpoints/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useAppDispatch } from "@/libs/redux/hooks";
import { getAccountInfo } from "@/libs/redux/authSlice";
import { GET_DATA_USER_QUERY_KEY } from "@/app/constants/queryKeys";

const updateAccount = async (formData: UserLogin): Promise<UserResponse> => {
  return await apiService.account.updateUser({ formData });
};

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const { showError, showSuccess } = useNotification();
  return useMutation<UserResponse, AxiosError<ErrorResponse>, UserLogin>({
    mutationFn: updateAccount,
    onSuccess: () => {
      showSuccess("Update account successful!");
      dispatch(getAccountInfo());
      queryClient.invalidateQueries({ queryKey: [GET_DATA_USER_QUERY_KEY] });
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useUpdateProfile;
