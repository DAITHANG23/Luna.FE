"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotification from "../useNotification";
import { AxiosError } from "axios";
import { ErrorResponse } from "@/@types/models";
import apiService from "@/api/endpoints/index";
import { BookingModel, BookingResponse } from "@/@types/models/booking";
import {
  GET_ALL_RESEVATIONS_KEY,
  UPDATE_RESERVATION_KEY,
} from "@/app/constants/queryKeys";

const updateReservation = async (
  formData: BookingModel,
): Promise<BookingResponse> => {
  return await apiService.bookings.updateReservation({ formData });
};

const useUpdateReservation = () => {
  const { showError } = useNotification();
  const queryClient = useQueryClient();
  return useMutation<BookingResponse, AxiosError<ErrorResponse>, BookingModel>({
    mutationFn: updateReservation,
    mutationKey: [UPDATE_RESERVATION_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_ALL_RESEVATIONS_KEY],
      });
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useUpdateReservation;
