import { RootState } from "@/libs/redux/store";

export const accountInfo = (state: RootState) =>
  state.auth.accountInfo?.data.data;

export const authSelectors = {
  accountInfo,
};
