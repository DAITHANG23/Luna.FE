import { createDraftSafeSelector } from "@reduxjs/toolkit";

import { RootState } from "@/libs/redux/store";

export const createTypedDraftSafeSelector =
  createDraftSafeSelector.withTypes<RootState>();

export const selectAuth = (state: RootState) => state.auth;

export const selectAccountInfo = createTypedDraftSafeSelector(
  state => state.auth.accountInfo,
  accountInfo => accountInfo
);

export const authSelectors = {
  selectAuth,
  selectAccountInfo,
};
