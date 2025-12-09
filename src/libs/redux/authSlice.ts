/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { UserLogin, UserResponse } from "@/@types/models";
import apiService from "@/api/endpoints/index";
import { ROUTES } from "@/constants";
import { clearJWTCookies } from "@/utils/cookies";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Locale } from "next-intl";

interface AuthState {
  user: UserLogin;
  sessionId: string | null;
  isAuthenticated: boolean;
  accountInfo?: UserResponse | null;
  loading?: boolean;
  error?: string | null;
}

export const logout = createAsyncThunk(
  "auth/logout",
  async (locale: Locale, { rejectWithValue }) => {
    try {
      const sessionId = localStorage.getItem("sessionId");

      if (sessionId) {
        await apiService.account.logout();
      }
    } catch (error: any) {
      console.error("Error logout:", error);
      return rejectWithValue(error.message);
    } finally {
      localStorage.removeItem("sessionId");
      clearJWTCookies("sessionId");
      delete axios.defaults.headers.common.Authorization;
      window.location.href = `/${locale}${ROUTES.LOGIN.INDEX}`;
    }
  },
);

export const getAccountInfo = createAsyncThunk<
  UserResponse,
  void,
  { rejectValue: string }
>("auth/getAccountInfo", async (_, thunkAPI) => {
  try {
    const data = await apiService.account.getDataUser();
    if (!data) {
      return thunkAPI.rejectWithValue("Không có dữ liệu từ API");
    }

    return data;
  } catch (error: any) {
    console.error("Error fetching account info:", error);
    return thunkAPI.rejectWithValue(error.message || "Lỗi không xác định");
  }
});

const initialState: AuthState = {
  user: {
    firstName: "",
    lastName: "",
    numberPhone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
    email: "",
    avatarUrl: "",
  },
  isAuthenticated: false,
  sessionId: "",
  accountInfo: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    sessionId: (state, action: PayloadAction<{ sessionId: string | null }>) => {
      state.sessionId = action.payload.sessionId;
    },
    userInfo: (
      state,
      action: PayloadAction<{ accountInfo: UserResponse | null }>,
    ) => {
      state.accountInfo = action.payload.accountInfo;
    },
    authentication: (
      state,
      action: PayloadAction<{ isAuthenticated: boolean }>,
    ) => {
      state.isAuthenticated = action.payload.isAuthenticated;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccountInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAccountInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.accountInfo = action.payload;
      })
      .addCase(getAccountInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Đã xảy ra lỗi";
      })
      .addCase(logout.fulfilled, (state) => {
        state.accountInfo = null;
        state.isAuthenticated = false;
        state.sessionId = "";
      });
  },
});

export const { sessionId, authentication, userInfo } = authSlice.actions;
export default authSlice.reducer;
