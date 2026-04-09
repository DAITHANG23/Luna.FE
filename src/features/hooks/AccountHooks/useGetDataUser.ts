"use client";
import { UserResponse } from "@/@types/models";
import apiService from "@/api/endpoints/index";
import { useAppSelector } from "@/libs/redux/hooks";
import { useQuery } from "@tanstack/react-query";
import { GET_DATA_USER_QUERY_KEY } from "@/app/constants/queryKeys";

const getDataUser = async (): Promise<UserResponse> => {
  return await apiService.account.getDataUser();
};

const useGetDataUser = () => {
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery<UserResponse>({
    queryFn: getDataUser,
    queryKey: [GET_DATA_USER_QUERY_KEY],
    refetchOnWindowFocus: true,
    enabled: !!isAuthenticated,
  });

  return { userData, isLoading, refetch };
};

export default useGetDataUser;
