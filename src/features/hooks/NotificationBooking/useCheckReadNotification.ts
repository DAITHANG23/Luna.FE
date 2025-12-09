"use client";
import { CheckNotification, ErrorResponse } from "@/@types/models";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useNotification from "../useNotification";
import apiService from "@/api/endpoints/index";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import {
  getAllNotifications,
  unReadNotifications,
} from "@/libs/redux/masterDataSlice";
import { CHECK_READ_NOTIFICATION_KEY } from "@/app/constants/queryKeys";

const checkReadNotification = async (
  id: string,
): Promise<CheckNotification> => {
  return await apiService.notifications.checkReadNotification(id);
};

const useCheckReadNotification = () => {
  const { showError } = useNotification();
  const dispatch = useAppDispatch();

  const unReadNotificationsQuantities = useAppSelector(
    (state) => state.masterData.unReadNotificationsQuantity,
  );
  return useMutation<CheckNotification, AxiosError<ErrorResponse>, string>({
    mutationFn: checkReadNotification,
    mutationKey: [CHECK_READ_NOTIFICATION_KEY],
    onSuccess: () => {
      dispatch(
        unReadNotifications({
          unReadNotificationsQuantity: unReadNotificationsQuantities - 1,
        }),
      );
      dispatch(getAllNotifications());
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useCheckReadNotification;
