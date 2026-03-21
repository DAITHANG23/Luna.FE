/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import apiService from "@/api/endpoints";
import {
  GET_ALL_CONCEPTS_QUERY_KEY,
  GET_ALL_RESTAURANTS_QUERY_KEY,
} from "@/app/constants/queryKeys";
import { useLoading } from "@/contexts/LoadingContext";
import { useQueries } from "@tanstack/react-query";
import { useEffect, useMemo } from "react";

interface Props {
  children: React.ReactNode;
}

const defaultConfig = {
  staleTime: Infinity,
  cacheTime: Infinity,
  enabled: false,
};

export default function MasterData({ children }: Props) {
  const { showLoading } = useLoading();
  const queries = useQueries({
    queries: [
      {
        queryKey: [GET_ALL_CONCEPTS_QUERY_KEY],
        queryFn: () => apiService.masterData.getAllConcepts(),
        ...defaultConfig,
      },
      {
        queryKey: [GET_ALL_RESTAURANTS_QUERY_KEY],
        queryFn: () => apiService.masterData.getAllRestaurants(),
        ...defaultConfig,
      },
    ],
  });

  const { isFetching, isFetched } = useMemo(
    () => ({
      isFetching: queries.some(query => query.isFetching),
      isFetched: queries.every(query => query.isFetched),
    }),
    [queries]
  );

  useEffect(() => {
    if (!isFetched) {
      queries.forEach(query => query.refetch());
    }
  }, [isFetched]);

  useEffect(() => {
    showLoading(isFetching);
  }, [isFetching]);

  return isFetching ? null : <>{children}</>;
}
