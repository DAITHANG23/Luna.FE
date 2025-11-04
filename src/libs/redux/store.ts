"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import masterDataSlice from "./masterDataSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    masterData: masterDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
