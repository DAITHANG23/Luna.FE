"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotification from "../useNotification";
import { ErrorResponse, FavoriteConcepts } from "@/@types/models";
import apiService from "@/api/endpoints/index";
import {
  CHECK_IN_FAVORITE_CONCEPTS_KEY,
  GET_DATA_USER_QUERY_KEY,
} from "@/app/constants/queryKeys";
import { getErrorDetail, getErrorMessage } from "@/utils";
import { ERROR_KEY } from "@/utils/errorKey";
import { useTranslations } from "next-intl";

const checkInConcept = (formData: FavoriteConcepts) => {
  return apiService.user.checkInConcept({ formData });
};

const useCheckInConcept = () => {
  const { notify } = useNotification();
  const queryClient = useQueryClient();

  const t = useTranslations();
  return useMutation<unknown, ErrorResponse, FavoriteConcepts>({
    mutationFn: checkInConcept,
    mutationKey: [CHECK_IN_FAVORITE_CONCEPTS_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GET_DATA_USER_QUERY_KEY],
      });
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

export default useCheckInConcept;
