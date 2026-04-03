"use client";
import { CheckNotification, ErrorResponse } from "@/@types/models";
import { useMutation } from "@tanstack/react-query";
import useNotification from "../useNotification";
import apiService from "@/api/endpoints/index";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import {
  getAllNotifications,
  unReadNotifications,
} from "@/libs/redux/masterData/masterDataSlice";
import { CHECK_READ_NOTIFICATION_KEY } from "@/app/constants/queryKeys";
import { unReadNotificationsLength } from "@/libs/redux/masterData/selectors";
import { getErrorDetail, getErrorMessage } from "@/utils";
import { ERROR_KEY } from "@/utils/errorKey";
import { useTranslations } from "next-intl";

const checkReadNotification = async (
  id: string
): Promise<CheckNotification> => {
  return await apiService.notifications.checkReadNotification(id);
};

const useCheckReadNotification = () => {
  const { notify } = useNotification();
  const dispatch = useAppDispatch();
  const t = useTranslations("Notification");
  const unReadNotificationsQuantities = useAppSelector(
    unReadNotificationsLength
  );
  return useMutation<CheckNotification, ErrorResponse, string>({
    mutationFn: checkReadNotification,
    mutationKey: [CHECK_READ_NOTIFICATION_KEY],
    onSuccess: () => {
      dispatch(
        unReadNotifications({
          unReadNotificationsQuantity: unReadNotificationsQuantities - 1,
        })
      );
      dispatch(getAllNotifications());
    },
    onError: (err: ErrorResponse) => {
      const { key: errorCode, data: errorDetails } = getErrorDetail({
        error: err,
      });

      const messages = {
        [ERROR_KEY.MISSING_ID_NOTIFICATION]: t("missingIdNotification"),
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

export default useCheckReadNotification;
