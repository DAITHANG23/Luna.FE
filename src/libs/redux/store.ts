"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import masterDataSlice from "./masterData/masterDataSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    masterData: masterDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
