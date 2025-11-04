"use client";
import {
  ErrorResponse,
  ConceptsFavoriteResponse,
  ReviewPost,
} from "@/@types/models";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useNotification from "../useNotification";
import apiService from "@/api/endpoints/index";
import {
  GET_ALL_CONCEPTS_QUERY_KEY,
  GET_CHECK_IN_CONCEPTS_KEY,
  REVIEW_CONCEPT_KEY,
} from "@/app/constants/queryKeys";

const reviewPost = (formData: ReviewPost) => {
  return apiService.concepts.postReviewConcept({ formData });
};

const useReviewConcept = () => {
  const { showError } = useNotification();
  const queryClient = useQueryClient();
  return useMutation<
    ConceptsFavoriteResponse,
    AxiosError<ErrorResponse>,
    ReviewPost
  >({
    mutationFn: reviewPost,
    mutationKey: [REVIEW_CONCEPT_KEY],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_CHECK_IN_CONCEPTS_KEY] });
      queryClient.invalidateQueries({ queryKey: [GET_ALL_CONCEPTS_QUERY_KEY] });
    },
    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useReviewConcept;
