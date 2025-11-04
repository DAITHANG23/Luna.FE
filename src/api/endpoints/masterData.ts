import { AllConceptsResponse, AllRestaurantResponse } from "@/@types/models";
import { API_VERSION_V1 } from "@/constants";
import apiRequest from "@/features/hooks/useApiRequest";
import { buildQueryString } from "@/utils";

const baseURLConcepts = `${API_VERSION_V1}/concepts`;
const baseURLRestaurants = `${API_VERSION_V1}/restaurants`;
const masterData = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getAllConcepts: async (params?: any): Promise<AllConceptsResponse> => {
    const query = buildQueryString(params);
    return await apiRequest(`${baseURLConcepts}${query}`, "GET");
  },
  getAllRestaurants: async (): Promise<AllRestaurantResponse> => {
    return await apiRequest(`${baseURLRestaurants}`, "GET");
  },
};

export default masterData;
