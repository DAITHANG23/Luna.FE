import {
  AllRestaurantResponseOfConcept,
  RestaurantSearchParams,
} from "@/@types/models";
import { API_VERSION_V1 } from "@/constants";
import apiRequest from "@/features/hooks/useApiRequest";
import { buildQueryString } from "@/utils";

const baseURL = `${API_VERSION_V1}/restaurants`;
const restaurants = {
  getRestaurantsOfConcept: async (
    conceptId: string,
    params?: RestaurantSearchParams,
  ): Promise<AllRestaurantResponseOfConcept> => {
    const query = buildQueryString(params);
    return await apiRequest(
      `${baseURL}/restaurantsOfConcept/${conceptId}${query}`,
      "GET",
    );
  },
};

export default restaurants;
