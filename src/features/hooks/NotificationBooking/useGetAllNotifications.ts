"use client";
import { AllNotificationResponse } from "@/@types/models";
import apiService from "@/api/endpoints/index";
import { GetNotificationsParams } from "@/api/endpoints/notifications";
import { GET_ALL_NOTIFICATIONS_KEY } from "@/app/constants/queryKeys";
import { cleanEmptyFields } from "@/utils";
import { useQuery } from "@tanstack/react-query";

const getAllnotifications = async (
  params: GetNotificationsParams,
): Promise<AllNotificationResponse> => {
  const paramsConfig = cleanEmptyFields(params);

  return await apiService.notifications.getAllNotifications(paramsConfig);
};

const useGetAllNotifications = (params: GetNotificationsParams) => {
  const {
    data: notificationsData,
    isLoading,
    refetch,
  } = useQuery<AllNotificationResponse>({
    queryFn: () => getAllnotifications(params),
    queryKey: [GET_ALL_NOTIFICATIONS_KEY, params],
  });

  return { notificationsData, isLoading, refetch };
};

export default useGetAllNotifications;
