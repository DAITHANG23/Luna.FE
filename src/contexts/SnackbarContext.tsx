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
      action={(key) => (
        <button
          className="min-w-0 leading-none pt-1 pb-[6px] w-[25px] text-center rounded-full bg-gray-200 hover:bg-gray-300 text-secondary-text hover:text-gray-900 transition duration-200"
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
