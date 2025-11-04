"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotification from "../useNotification";
import { AxiosError } from "axios";
import { ErrorResponse, FavoriteConcepts } from "@/@types/models";
import apiService from "@/api/endpoints/index";
import {
  CHECK_IN_FAVORITE_CONCEPTS_KEY,
  GET_DATA_USER_QUERY_KEY,
} from "@/app/constants/queryKeys";

const checkInConcept = (formData: FavoriteConcepts) => {
  return apiService.user.checkInConcept({ formData });
};

const useCheckInConcept = () => {
  const { showError } = useNotification();
  const queryClient = useQueryClient();
  return useMutation<unknown, AxiosError<ErrorResponse>, FavoriteConcepts>({
    mutationFn: checkInConcept,
    mutationKey: [CHECK_IN_FAVORITE_CONCEPTS_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_DATA_USER_QUERY_KEY],
      });
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useCheckInConcept;
