import { RestaurantBooking, RestaurantBookingResponse } from "@/@types/models";
import {
  AllResevationResponse,
  BookingModel,
  BookingResponse,
} from "@/@types/models/booking";
import { API_VERSION_V1 } from "@/constants";
import apiRequest from "@/features/hooks/useApiRequest";

const baseURL = `${API_VERSION_V1}/bookings`;
const bookings = {
  bookingRestaurant: async ({
    formData,
  }: {
    formData: RestaurantBooking;
  }): Promise<RestaurantBookingResponse> => {
    return await apiRequest(`${baseURL}`, "POST", formData);
  },
  getAllResevation: async (): Promise<AllResevationResponse> => {
    return await apiRequest(`${baseURL}`, "GET");
  },
  deleteReservation: async ({ id }: { id: string }) => {
    return await apiRequest(`${baseURL}/${id}`, "DELETE");
  },
  updateReservation: async ({
    formData,
  }: {
    formData: BookingModel;
  }): Promise<BookingResponse> => {
    const { _id } = formData;
    const formDataToSend = { ...formData };
    return await apiRequest(`${baseURL}/${_id}`, "PATCH", formDataToSend);
  },
  getBooking: async ({ id }: { id: string }): Promise<BookingResponse> => {
    return await apiRequest(`${baseURL}/${id}`, "GET");
  },
};

export default bookings;
