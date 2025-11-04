"use client";
import {
  ErrorResponse,
  RestaurantBooking,
  RestaurantBookingResponse,
} from "@/@types/models";
import apiService from "@/api/endpoints/index";
import { useMutation } from "@tanstack/react-query";
import useNotification from "@/features/hooks/useNotification";
import { AxiosError } from "axios";
import { useRouter } from "@/libs/i18n/navigation";
import { ROUTES } from "@/constants";
import { useTranslations } from "next-intl";

const bookingRestaurant = async (
  formData: RestaurantBooking
): Promise<RestaurantBookingResponse> => {
  return await apiService.bookings.bookingRestaurant({ formData });
};

const useBookingRestaurant = (onSuccess: () => void) => {
  const t = useTranslations("Restaurant");
  const { showError, showSuccess } = useNotification();
  const router = useRouter();
  return useMutation<
    RestaurantBookingResponse,
    AxiosError<ErrorResponse>,
    RestaurantBooking
  >({
    mutationFn: bookingRestaurant,
    onSuccess: () => {
      showSuccess(t("bookingSuccessfully"));
      onSuccess();
      router.push(ROUTES.BOOKING.INDEX);
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useBookingRestaurant;
