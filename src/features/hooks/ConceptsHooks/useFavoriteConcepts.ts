"use client";
import { ErrorResponse, FavoriteConcepts, UserResponse } from "@/@types/models";
import apiService from "@/api/endpoints/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useNotification from "../useNotification";
import {
  CONCEPTS_FAVORITE_KEY,
  GET_DATA_USER_QUERY_KEY,
} from "@/app/constants/queryKeys";

const conceptsFavorite = (
  formData: FavoriteConcepts,
): Promise<UserResponse> => {
  return apiService.user.favoriteConcepts({ formData });
};
const useFavoriteConcepts = () => {
  const { showError } = useNotification();
  const queryClient = useQueryClient();
  return useMutation<UserResponse, AxiosError<ErrorResponse>, FavoriteConcepts>(
    {
      mutationFn: conceptsFavorite,
      mutationKey: [CONCEPTS_FAVORITE_KEY],
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [GET_DATA_USER_QUERY_KEY] });
      },
      onError: (err: AxiosError<ErrorResponse>) => {
        showError(err.message);
      },
    },
  );
};

export default useFavoriteConcepts;
