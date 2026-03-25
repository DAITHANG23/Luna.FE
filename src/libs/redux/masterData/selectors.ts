"use client";
import { createDraftSafeSelector } from "@reduxjs/toolkit";
import { RootState } from "@/libs/redux/store";

export const createTypedDraftSafeSelector =
  createDraftSafeSelector.withTypes<RootState>();

const selectNotificationsRaw = (state: RootState) =>
  state.masterData.allNotifications?.data?.data;

export const notificationList = createTypedDraftSafeSelector(
  selectNotificationsRaw,
  data => data ?? []
);

export const unReadNotificationsLength = createTypedDraftSafeSelector(
  notificationList,
  notifications => notifications.filter(n => !n.read).length
);

export const masterDataSelectors = {
  notificationList,
  unReadNotificationsLength,
};
