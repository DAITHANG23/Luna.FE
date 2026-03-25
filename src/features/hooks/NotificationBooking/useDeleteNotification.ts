import { ErrorResponse } from "@/@types/models";
import apiService from "@/api/endpoints";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import useNotification from "../useNotification";

const useDeleteNotification = () => {
  const { showError } = useNotification();

  return useMutation({
    mutationFn: (id: string) =>
      apiService.notifications.deleteNotification({ id }),

    onError: (err: AxiosError<ErrorResponse>) => {
      showError(err.message);
    },
  });
};

export default useDeleteNotification;
