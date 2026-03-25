"use client";
import { SnackbarProvider, SnackbarKey } from "notistack";
import { PropsWithChildren, useCallback, useRef } from "react";

const TransSnackbarProvider = ({ children }: PropsWithChildren<unknown>) => {
  const notistackRef = useRef<SnackbarProvider>(null);
  const onClickDismiss = useCallback(
    (key: SnackbarKey) => () => {
      notistackRef.current?.closeSnackbar(key);
    },
    []
  );
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ horizontal: "center", vertical: "top" }}
      ref={notistackRef}
      action={key => (
        <button
          className="text-secondary-text w-[25px] min-w-0 rounded-full bg-gray-200 pt-1 pb-[6px] text-center leading-none transition duration-200 hover:bg-gray-300 hover:text-gray-900"
          onClick={onClickDismiss(key)}
        >
          x
        </button>
      )}
    >
      {children}
    </SnackbarProvider>
  );
};

export default TransSnackbarProvider;
