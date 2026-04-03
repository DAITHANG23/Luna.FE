import { ErrorResponse } from "@/@types/models";
import apiService from "@/api/endpoints";
import { useMutation } from "@tanstack/react-query";
import useNotification from "../useNotification";

const useDeleteNotification = () => {
  const { notify } = useNotification();

  return useMutation({
    mutationFn: (id: string) =>
      apiService.notifications.deleteNotification({ id }),

    onError: (err: ErrorResponse) => {
      notify(err.message);
    },
  });
};

export default useDeleteNotification;
