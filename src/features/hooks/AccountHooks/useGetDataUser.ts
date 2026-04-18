"use client";
import { UserResponse } from "@/@types/models";
import apiService from "@/api/endpoints/index";
import { useQuery } from "@tanstack/react-query";
import { GET_DATA_USER_QUERY_KEY } from "@/app/constants/queryKeys";

const getDataUser = async (): Promise<UserResponse> => {
  return await apiService.account.getDataUser();
};

const useGetDataUser = () => {
  // Dùng localStorage để kiểm tra auth vì:
  // - Dev: cookie sessionId không phải httpOnly, có thể đọc bằng JS
  // - Production: cookie httpOnly, JS không đọc được ⇒ dùng localStorage flag
  const hasSession =
    typeof window !== "undefined" &&
    localStorage.getItem("isAuthenticated") === "true";

  const {
    data: userData,
    isLoading,
    refetch,
  } = useQuery<UserResponse>({
    queryFn: getDataUser,
    queryKey: [GET_DATA_USER_QUERY_KEY],
    refetchOnWindowFocus: true,
    enabled: hasSession,
  });

  return { userData, isLoading, refetch };
};

export default useGetDataUser;
