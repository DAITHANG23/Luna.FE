import { UserResponse } from "@/@types/models";
import { FavoriteConcepts } from "@/@types/models";
import { API_VERSION_V1 } from "@/constants";
import apiRequest from "@/features/hooks/useApiRequest";

const baseURL = `${API_VERSION_V1}/users`;
const user = {
  favoriteConcepts: async ({
    formData,
  }: {
    formData: FavoriteConcepts;
  }): Promise<UserResponse> => {
    return await apiRequest(`${baseURL}/favorites`, "POST", formData);
  },

  deleteFavoriteConcept: async ({
    formData,
  }: {
    formData: FavoriteConcepts;
  }) => {
    return await apiRequest(
      `${baseURL}/deleteFavoriteConcept`,
      "DELETE",
      formData,
    );
  },

  checkInConcept: async ({ formData }: { formData: FavoriteConcepts }) => {
    return await apiRequest(`${baseURL}/checkInConcept`, "POST", formData);
  },

  deleteCheckInConcept: async ({
    formData,
  }: {
    formData: FavoriteConcepts;
  }) => {
    return await apiRequest(
      `${baseURL}/deleteCheckInConcept`,
      "DELETE",
      formData,
    );
  },
};
export default user;
