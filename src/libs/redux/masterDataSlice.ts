"use client";
import {
  AllConceptsResponse,
  AllNotificationResponse,
  AllRestaurantResponse,
} from "@/@types/models";
import apiService from "@/api/endpoints/index";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MasterDataState {
  allConcepts: AllConceptsResponse | null;
  loading: boolean;
  error: string | null;
  loadingGetAllRestaurants: boolean;
  allRestaurants: AllRestaurantResponse | null;
  errorGetAllRestaurants: string | null;
  allNotifications: AllNotificationResponse | null;
  loadingGetAllNotifications: boolean;
  errorGetAllNotifications: string | null;
  unReadNotificationsQuantity: number;
}

const initialState: MasterDataState = {
  allConcepts: null,
  loading: false,
  error: null,
  loadingGetAllRestaurants: false,
  allRestaurants: null,
  errorGetAllRestaurants: null,
  allNotifications: null,
  loadingGetAllNotifications: false,
  errorGetAllNotifications: null,
  unReadNotificationsQuantity: 0,
};

export const getAllConcepts = createAsyncThunk<
  AllConceptsResponse,
  void,
  { rejectValue: string }
>("masterData/getAllConcepts", async (_, thunkAPI) => {
  try {
    const data = await apiService.masterData.getAllConcepts();
    if (!data) {
      return thunkAPI.rejectWithValue("Không có dữ liệu từ API");
    }

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error:", error);
    return thunkAPI.rejectWithValue(error.message || "Lỗi không xác định");
  }
});

export const getAllRestaurants = createAsyncThunk<
  AllRestaurantResponse,
  void,
  { rejectValue: string }
>("masterData/getAllRestaurants", async (_, thunkAPI) => {
  try {
    const data = await apiService.masterData.getAllRestaurants();
    if (!data) {
      return thunkAPI.rejectWithValue("Không có dữ liệu từ API");
    }

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error:", error);
    return thunkAPI.rejectWithValue(error.message || "Lỗi không xác định");
  }
});

export const getAllNotifications = createAsyncThunk<
  AllNotificationResponse,
  void,
  { rejectValue: string }
>("masterData/getAllNotifications", async (_, thunkAPI) => {
  try {
    const data = await apiService.notifications.getAllNotifications();
    if (!data) {
      return thunkAPI.rejectWithValue("Không có dữ liệu từ API");
    }

    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error:", error);
    return thunkAPI.rejectWithValue(error.message || "Lỗi không xác định");
  }
});

const masterDatasSlice = createSlice({
  name: "concepts",
  initialState,
  reducers: {
    unReadNotifications: (
      state,
      action: PayloadAction<{ unReadNotificationsQuantity: number }>
    ) => {
      state.unReadNotificationsQuantity =
        action.payload.unReadNotificationsQuantity;
    },
    resetNotifications(state) {
      state.allNotifications = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllConcepts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllConcepts.fulfilled, (state, action) => {
        state.loading = false;
        state.allConcepts = action.payload;
      })
      .addCase(getAllConcepts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Đã xảy ra lỗi";
      })
      .addCase(getAllRestaurants.pending, (state) => {
        state.loadingGetAllRestaurants = true;
        state.errorGetAllRestaurants = null;
      })
      .addCase(getAllRestaurants.fulfilled, (state, action) => {
        state.loadingGetAllRestaurants = false;
        state.allRestaurants = action.payload;
      })
      .addCase(getAllRestaurants.rejected, (state, action) => {
        state.loadingGetAllRestaurants = false;
        state.errorGetAllRestaurants = action.payload || "Đã xảy ra lỗi";
      })
      .addCase(getAllNotifications.pending, (state) => {
        state.loadingGetAllNotifications = true;
        state.error = null;
      })
      .addCase(getAllNotifications.fulfilled, (state, action) => {
        state.allNotifications = action.payload;
        state.loadingGetAllNotifications = false;
      })
      .addCase(getAllNotifications.rejected, (state, action) => {
        state.loadingGetAllNotifications = false;
        state.errorGetAllNotifications = action.payload || "Đã xảy ra lỗi";
      });
  },
});
export const { unReadNotifications, resetNotifications } =
  masterDatasSlice.actions;
export default masterDatasSlice.reducer;
