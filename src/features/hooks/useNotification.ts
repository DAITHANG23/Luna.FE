"use client";

import { OptionsObject, useSnackbar } from "notistack";

const types = {
  error: "error",
  success: "success",
  warning: "warning",
  info: "info",
};

const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const config: OptionsObject = {
    anchorOrigin: { vertical: "top", horizontal: "right" },
    autoHideDuration: 10000,
    preventDuplicate: true,
  };

  const notify = (
    messageError: string,
    errorDetails?: Partial<{
      type: string;
      traceId: string;
      message: string;
    }>
  ) => {
    const {
      type = types.error,
      traceId = "",
      message = "",
    } = errorDetails || {};

    const errorMessage = messageError || message;
    switch (type) {
      case types.error:
        return enqueueSnackbar(errorMessage, {
          variant: "error",
          ...config,
        });

      case types.success:
        return enqueueSnackbar(errorMessage, {
          variant: "success",
          ...config,
        });
      case types.warning:
        return enqueueSnackbar(errorMessage, {
          variant: "warning",
          ...config,
        });
      default:
        return enqueueSnackbar(errorMessage, {
          variant: "info",
          ...config,
        });
    }
  };

  return { notify, types };
};

export default useNotification;
