"use client";
import { OptionsObject, SnackbarMessage, useSnackbar } from "notistack";

const useNotification = () => {
  const { enqueueSnackbar } = useSnackbar();

  const showError = (message: SnackbarMessage, options?: OptionsObject) => {
    return enqueueSnackbar(message, {
      variant: "error",
      ...options,
    });
  };

  const showSuccess = (message: SnackbarMessage, options?: OptionsObject) => {
    return enqueueSnackbar(message, {
      variant: "success",
      ...options,
    });
  };

  const showWarning = (message: SnackbarMessage, options?: OptionsObject) => {
    return enqueueSnackbar(message, {
      variant: "warning",
      ...options,
    });
  };

  const showInfo = (message: SnackbarMessage, options?: OptionsObject) => {
    return enqueueSnackbar(message, {
      variant: "info",
      ...options,
    });
  };

  return { showError, showSuccess, showWarning, showInfo };
};

export default useNotification;
