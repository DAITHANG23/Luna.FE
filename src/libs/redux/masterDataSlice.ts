"use client";
import { AllNotificationResponse } from "@/@types/models";
import apiService from "@/api/endpoints/index";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MasterDataState {
  loading: boolean;
  error: string | null;
  loadingGetAllRestaurants: boolean;
  errorGetAllRestaurants: string | null;
  allNotifications: AllNotificationResponse | null;
  loadingGetAllNotifications: boolean;
  errorGetAllNotifications: string | null;
  unReadNotificationsQuantity: number;
}

const initialState: MasterDataState = {
  loading: false,
  error: null,
  loadingGetAllRestaurants: false,
  errorGetAllRestaurants: null,
  loadingGetAllNotifications: false,
  allNotifications: null,
  errorGetAllNotifications: null,
  unReadNotificationsQuantity: 0,
};

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
      state.unReadNotificationsQuantity = action.payload.unReadNotificationsQuantity;
    },
    // resetNotifications(state) {
    //   state.allNotifications = null;
    // },
  },
  extraReducers: builder => {
    builder
      .addCase(getAllNotifications.pending, state => {
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
export const { unReadNotifications } = masterDatasSlice.actions;
export default masterDatasSlice.reducer;
