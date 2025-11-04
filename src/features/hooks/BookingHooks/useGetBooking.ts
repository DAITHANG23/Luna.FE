"use client";
import { BookingResponse } from "@/@types/models/booking";
import apiService from "@/api/endpoints/index";
import { GET_BOOKING_KEY } from "@/app/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";

const getBookingData = async (id: string): Promise<BookingResponse> => {
  return await apiService.bookings.getBooking({ id });
};

const useGetBooking = (id: string) => {
  const {
    data: bookingData,
    isLoading,
    refetch,
  } = useQuery<BookingResponse>({
    queryFn: () => getBookingData(id),
    queryKey: [GET_BOOKING_KEY, id],
    staleTime: 0,
    refetchOnWindowFocus: true,
    enabled: !!id,
  });

  return { bookingData, isLoading, refetch };
};

export default useGetBooking;
