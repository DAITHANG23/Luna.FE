import { AllNotificationResponse, CheckNotification } from "@/@types/models";
import { API_VERSION_V1 } from "@/constants";
import apiRequest from "@/features/hooks/useApiRequest";
import { buildQueryString } from "@/utils";
export type GetNotificationsParams = {
  limit?: number;
  cursor?: string;
};

const baseURL = `${API_VERSION_V1}/notifications`;
const bookings = {
  getAllNotifications: async (
    params?: GetNotificationsParams
  ): Promise<AllNotificationResponse> => {
    const query = buildQueryString(params);
    return await apiRequest(`${baseURL}${query}`, "GET");
  },
  checkReadNotification: async (id: string): Promise<CheckNotification> => {
    return await apiRequest(`${baseURL}/checkReadNotification`, "PATCH", {
      id,
    });
  },
  getNotification: async ({
    id,
  }: {
    id: string;
  }): Promise<CheckNotification> => {
    return await apiRequest(`${baseURL}/${id}`, "GET");
  },
  deleteNotification: async ({ id }: { id: string }) => {
    return await apiRequest(`${baseURL}/${id}`, "DELETE");
  },
};

export default bookings;
