"use client";
import { AllResevationResponse } from "@/@types/models/booking";
import apiService from "@/api/endpoints/index";
import { GET_ALL_RESEVATIONS_KEY } from "@/app/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

const getAllResevations = async (): Promise<AllResevationResponse> => {
  return await apiService.bookings.getAllResevation();
};

const useGetAllResevations = () => {
  const {
    data: resevationsData,
    isLoading,
    refetch,
  } = useQuery<AllResevationResponse>({
    queryFn: getAllResevations,
    queryKey: [GET_ALL_RESEVATIONS_KEY],
  });

  return { resevationsData, isLoading, refetch };
};

export default useGetAllResevations;
