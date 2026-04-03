"use client";
import { ErrorResponse, FavoriteConcepts, UserResponse } from "@/@types/models";
import apiService from "@/api/endpoints/index";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotification from "../useNotification";
import {
  CONCEPTS_FAVORITE_KEY,
  GET_DATA_USER_QUERY_KEY,
} from "@/app/constants/queryKeys";
import { getErrorDetail, getErrorMessage } from "@/utils";
import { ERROR_KEY } from "@/utils/errorKey";
import { useTranslations } from "next-intl";

const conceptsFavorite = (
  formData: FavoriteConcepts
): Promise<UserResponse> => {
  return apiService.user.favoriteConcepts({ formData });
};
const useFavoriteConcepts = () => {
  const { notify } = useNotification();
  const queryClient = useQueryClient();

  const t = useTranslations();
  return useMutation<UserResponse, ErrorResponse, FavoriteConcepts>({
    mutationFn: conceptsFavorite,
    mutationKey: [CONCEPTS_FAVORITE_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_DATA_USER_QUERY_KEY] });
    },
    onError: (err: ErrorResponse) => {
      const { key: errorCode, data: errorDetails } = getErrorDetail({
        error: err,
      });

      const messages = {
        [ERROR_KEY.TOKEN_IS_INVALID]: t("Translation.tokenIsInvalid"),
        [ERROR_KEY.ACCOUNT_MUST_BE_CUSTOMER]: t(
          "Translation.accountMustBeCustomer"
        ),
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

export default useFavoriteConcepts;
