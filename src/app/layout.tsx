import { ReduxProvider } from "@/libs/redux/provider";
import "./globals.css";
import { inter, red_hat_display } from "@app/fonts";
import { AppContextProvider } from "@/contexts/AppContext";
import TransSnackbarProvider from "@/contexts/SnackbarContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${inter.variable} ${red_hat_display.variable} container prose max-w-none w-full`}
    >
      <body>
        <ReduxProvider>
          <AppContextProvider>
            <TransSnackbarProvider>{children}</TransSnackbarProvider>
          </AppContextProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
