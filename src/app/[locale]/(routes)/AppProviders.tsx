"use client";

import { ROUTES } from "@/constants";
import { usePathname } from "@/libs/i18n/navigation";
import { getAccountInfo, sessionId, userInfo } from "@/libs/redux/authSlice";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
import { getAllNotifications } from "@/libs/redux/masterDataSlice";
import AuthInitializer from "@/libs/shared/components/client-components/AuthInitializer/AuthInitializer";
import Footer from "@/libs/shared/components/client-components/Footer/Footer";
import DialogSetting from "@/libs/shared/components/client-components/Header/components/DialogSetting";
import Header from "@/libs/shared/components/client-components/Header/Header";
import ScrollToTop from "@/libs/shared/components/client-components/ScrollToTopButton/ScrollToTopButton";
import cookie from "@/utils/cookies";
// import ConfirmDialogProvider from "@/contexts/ConfirmationContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { isEmpty } from "lodash";
import { useEffect } from "react";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const sessionIdState = useAppSelector((state) => state.auth.sessionId);
  const accountInfo = useAppSelector((state) => state.auth.accountInfo);

  useEffect(() => {
    // Guard against server-side execution
    if (typeof window === "undefined") return;

    const sessionIdCookie = cookie.getSessionId();

    localStorage.setItem("sessionId", sessionIdCookie);
    dispatch(sessionId({ sessionId: sessionIdCookie as string }));
    dispatch(getAllNotifications());

    if (!sessionIdCookie) {
      dispatch(sessionId({ sessionId: null }));
      dispatch(userInfo({ accountInfo: null }));
      localStorage.removeItem("isLoggedInGoogle");
      localStorage.removeItem("sessionId");
    }
  }, [dispatch, sessionIdState]);

  const isLoginPage =
    pathname === `${ROUTES.LOGIN.INDEX}` ||
    pathname === `${ROUTES.REGISTER.INDEX}`;

  useEffect(() => {
    if (sessionIdState && isEmpty(accountInfo)) {
      dispatch(getAccountInfo());
    }
  }, [dispatch, sessionIdState, accountInfo]);

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
