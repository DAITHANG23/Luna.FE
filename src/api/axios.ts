/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorResponse } from "@/@types/models";
import apiService from "@/api/endpoints/index";
import { ROUTES } from "@/constants";
import { getLocale } from "@/utils";
import cookie from "@/utils/cookies";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  retryCount?: number;
}

export const axiosWrapper = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const MAX_RETRIES = 3;

axiosWrapper.interceptors.request.use(
  async (
    config: CustomAxiosRequestConfig
  ): Promise<CustomAxiosRequestConfig> => {
    const token = cookie.getSessionId();

    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  }
);

axiosWrapper.interceptors.response.use(
  response => response,
  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config as InternalAxiosRequestConfig<any> & {
      _retry?: boolean;
      retryCount?: number;
    };
    const status = error.response?.status;

    if (error.response) {
      if (
        status === 403 &&
        error.response.data.message === "Invalid refresh token!"
      ) {
        await apiService.account.logout();
        const locale = getLocale();
        window.location.href = `/${locale}${ROUTES.LOGIN.INDEX}`;
      }

      if (status === 429) {
        console.error("Too Many Requests - 429: Quá nhiều request");
        if (!originalRequest.retryCount) {
          originalRequest.retryCount = 0;
        }

        if (originalRequest.retryCount < MAX_RETRIES) {
          originalRequest.retryCount += 1;
          const retryAfter = error.response.headers["retry-after"];
          const waitTime = retryAfter
            ? Number(retryAfter) * 1000
            : 2 ** originalRequest.retryCount * 2000;

          await new Promise(resolve => setTimeout(resolve, waitTime));
          return axiosWrapper(originalRequest);
        }
      }

      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
