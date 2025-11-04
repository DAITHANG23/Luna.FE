"use client";
import { ConceptsFavoriteResponse } from "@/@types/models";
import apiService from "@/api/endpoints/index";
import { GET_CONCEPTS_FAVORITE_KEY } from "@/app/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
const getFavoriteConcepts = () => {
  return apiService.concepts.getFavoriteConcepts();
};
const useGetFavoriteConcepts = () => {
  const {
    data: conceptsData,
    isLoading,
    refetch,
  } = useQuery<ConceptsFavoriteResponse>({
    queryFn: () => getFavoriteConcepts(),
    queryKey: [GET_CONCEPTS_FAVORITE_KEY],
  });

  return { conceptsData, isLoading, refetch };
};

export default useGetFavoriteConcepts;
