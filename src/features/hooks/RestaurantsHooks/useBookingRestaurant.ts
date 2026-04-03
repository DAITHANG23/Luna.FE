"use client";
import {
  ErrorResponse,
  RestaurantBooking,
  RestaurantBookingResponse,
} from "@/@types/models";
import apiService from "@/api/endpoints/index";
import { useMutation } from "@tanstack/react-query";
import useNotification from "@/features/hooks/useNotification";
import { useRouter } from "@/libs/next-intl/navigation";
import { ROUTES } from "@/constants";
import { useTranslations } from "next-intl";

const bookingRestaurant = async (
  formData: RestaurantBooking
): Promise<RestaurantBookingResponse> => {
  return await apiService.bookings.bookingRestaurant({ formData });
};

const useBookingRestaurant = (onSuccess: () => void) => {
  const t = useTranslations("Restaurant");
  const { notify, types } = useNotification();
  const router = useRouter();
  return useMutation<
    RestaurantBookingResponse,
    ErrorResponse,
    RestaurantBooking
  >({
    mutationFn: bookingRestaurant,
    onSuccess: () => {
      notify(t("bookingSuccessfully"), { type: types.success });
      onSuccess();
      router.push(ROUTES.BOOKING.INDEX);
    },
    onError: (err: ErrorResponse) => {
      notify(err.message);
    },
  });
};

export default useBookingRestaurant;
