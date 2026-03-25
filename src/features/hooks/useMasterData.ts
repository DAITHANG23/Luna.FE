import {
  AllConceptsResponse,
  AllNotificationResponse,
  AllRestaurantResponse,
} from "@/@types/models";
import {
  GET_ALL_CONCEPTS_QUERY_KEY,
  GET_ALL_NOTIFICATIONS_KEY,
  GET_ALL_RESEVATIONS_KEY,
  GET_ALL_RESTAURANTS_QUERY_KEY,
} from "@/app/constants/queryKeys";
import { useQueryClient } from "@tanstack/react-query";

const useMasterData = () => {
  const queryClient = useQueryClient();

  const allConcepts =
    queryClient.getQueryData<AllConceptsResponse>([GET_ALL_CONCEPTS_QUERY_KEY])
      ?.data.data || [];

  const allRestaurants =
    queryClient.getQueryData<AllRestaurantResponse>([
      GET_ALL_RESTAURANTS_QUERY_KEY,
    ])?.data.data || [];

  const allNotifications =
    queryClient.getQueryData<AllNotificationResponse>([
      GET_ALL_NOTIFICATIONS_KEY,
    ])?.data.data || [];

  const getAllReservations = () => {
    return queryClient.getQueryData([GET_ALL_RESEVATIONS_KEY]) || [];
  };

  return { allConcepts, allRestaurants, allNotifications, getAllReservations };
};

export default useMasterData;
