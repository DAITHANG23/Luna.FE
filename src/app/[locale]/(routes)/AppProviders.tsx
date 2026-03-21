"use client";

import { ROUTES } from "@/constants";
import LoadingProvider from "@/contexts/LoadingContext";
import { usePathname } from "@/libs/next-intl/navigation";
import { authentication, getAccountInfo, sessionId, userInfo } from "@/libs/redux/authSlice";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { getAllNotifications } from "@/libs/redux/masterDataSlice";
import AuthInitializer from "@/libs/shared/components/client-components/AuthInitializer/AuthInitializer";
import Footer from "@/libs/shared/components/client-components/Footer/Footer";
import DialogSetting from "@/libs/shared/components/client-components/Header/components/DialogSetting";
import Header from "@/libs/shared/components/client-components/Header/Header";
import ScrollToTop from "@/libs/shared/components/client-components/ScrollToTopButton/ScrollToTopButton";
import MasterData from "@/libs/shared/components/MasterData/MasterData";
import cookie from "@/utils/cookies";
// import ConfirmDialogProvider from "@/contexts/ConfirmationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const sessionIdState = useAppSelector(state => state.auth.sessionId);
  const accountInfo = useAppSelector(state => state.auth.accountInfo);

  useEffect(() => {
    // Guard against server-side execution
    if (typeof window === "undefined") return;

    const sessionIdCookie = cookie.getSessionId();
    if (sessionIdCookie) {
      localStorage.setItem("sessionId", sessionIdCookie);
      dispatch(authentication({ isAuthenticated: true }));
      dispatch(sessionId({ sessionId: sessionIdCookie as string }));
      dispatch(getAllNotifications());
    } else {
      dispatch(sessionId({ sessionId: null }));
      dispatch(userInfo({ accountInfo: null }));
      localStorage.removeItem("isLoggedInGoogle");
      localStorage.removeItem("sessionId");
    }
  }, [dispatch]);

  const isLoginPage =
    pathname === `${ROUTES.LOGIN.INDEX}` || pathname === `${ROUTES.REGISTER.INDEX}`;

  useEffect(() => {
    if (sessionIdState && isEmpty(accountInfo)) {
      dispatch(getAccountInfo());
    }
  }, [dispatch, sessionIdState, accountInfo]);

  return (
    <QueryClientProvider client={queryClient}>
      <LoadingProvider>
        <MasterData>
          <AuthInitializer />
          <Header />
          {/* <ConfirmDialogProvider> */}
          <main>
            <DialogSetting />
            <ScrollToTop />
            {children}
          </main>
          {/* </ConfirmDialogProvider> */}
          {!isLoginPage && <Footer />}
        </MasterData>
      </LoadingProvider>
    </QueryClientProvider>
  );
}
