"use client";

import { ReduxProvider } from "@/libs/redux/provider";

export function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
