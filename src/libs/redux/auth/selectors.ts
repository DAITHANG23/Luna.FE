import { createDraftSafeSelector } from "@reduxjs/toolkit";

import { RootState } from "@/libs/redux/store";

export const createTypedDraftSafeSelector =
  createDraftSafeSelector.withTypes<RootState>();

const selectAuth = (state: RootState) => state.auth.accountInfo?.data.data;

export const accountInfo = createTypedDraftSafeSelector(
  selectAuth,
  accountInfo => accountInfo
);

export const authSelectors = {
  selectAuth,
  accountInfo,
};
