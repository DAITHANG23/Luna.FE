import { ErrorResponse } from "@/@types/models";
import { axiosWrapper } from "@/api/axios";
import { AxiosError, AxiosRequestConfig } from "axios";

const apiRequest = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  data?: unknown,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await axiosWrapper({
      url,
      method,
      data,
      headers: {
        "Content-Type": "application/json",
        ...config?.headers,
      },
      ...config,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    if (axiosError.response?.data) {
      throw axiosError.response.data;
    }

    throw new Error(axiosError.message);
  }
};

export default apiRequest;
