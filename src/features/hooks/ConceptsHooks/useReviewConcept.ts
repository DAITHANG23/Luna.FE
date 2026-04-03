"use client";
import {
  ErrorResponse,
  ConceptsFavoriteResponse,
  ReviewPost,
} from "@/@types/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useNotification from "../useNotification";
import apiService from "@/api/endpoints/index";
import {
  GET_ALL_CONCEPTS_QUERY_KEY,
  GET_CHECK_IN_CONCEPTS_KEY,
  REVIEW_CONCEPT_KEY,
} from "@/app/constants/queryKeys";
import { ERROR_KEY } from "@/utils/errorKey";
import { getErrorDetail, getErrorMessage } from "@/utils";
import { useTranslations } from "next-intl";

const reviewPost = (formData: ReviewPost) => {
  return apiService.concepts.postReviewConcept({ formData });
};

const useReviewConcept = () => {
  const { notify } = useNotification();
  const queryClient = useQueryClient();
  const t = useTranslations("Concept");
  return useMutation<ConceptsFavoriteResponse, ErrorResponse, ReviewPost>({
    mutationFn: reviewPost,
    mutationKey: [REVIEW_CONCEPT_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_CHECK_IN_CONCEPTS_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_ALL_CONCEPTS_QUERY_KEY] });
    },
    onError: (err: ErrorResponse) => {
      const { key: errorCode, data: errorDetails } = getErrorDetail({
        error: err,
      });

      const messages = {
        [ERROR_KEY.CONCEPT_IS_NOT_EXISTED]: t("conceptIsNotExist"),
        [ERROR_KEY.MISSING_ID_CONCEPT]: t("missingIdConcept"),
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

export default useReviewConcept;
