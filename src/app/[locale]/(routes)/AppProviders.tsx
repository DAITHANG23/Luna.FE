"use client";

import { ROUTES } from "@/constants";
import { usePathname } from "@/libs/i18n/navigation";
import { accessToken, getAccountInfo, logout } from "@/libs/redux/authSlice";
import { useAppDispatch, useAppSelector } from "@/libs/redux/hooks";
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
  const accessTokenState = useAppSelector((state) => state.auth.accessToken);
  const accountInfo = useAppSelector((state) => state.auth.accountInfo);

  useEffect(() => {
    // Guard against server-side execution
    if (typeof window === "undefined") return;

    const accessTokenCookie = cookie.getAccessToken();

    if (process.env.NODE_ENV === "development") {
      const refreshTokenCookie = cookie.getRefreshToken();
      if (typeof window !== "undefined") {
        localStorage.setItem("refreshToken", refreshTokenCookie);
      }
    }

    // if (!accessTokenCookie) {
    //   dispatch(logout());
    // }

    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", accessTokenCookie);
    }

    dispatch(accessToken({ accessToken: accessTokenCookie as string }));
    // dispatch(getAllNotifications());
  }, [dispatch]);

  const isLoginPage =
    pathname === `${ROUTES.LOGIN.INDEX}` ||
    pathname === `${ROUTES.REGISTER.INDEX}`;

  useEffect(() => {
    if (accessTokenState && isEmpty(accountInfo)) {
      dispatch(getAccountInfo());
    }
  }, [dispatch, accessTokenState, accountInfo]);

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
