import { useMutation, useQueryClient } from "react-query";
import APIClient from "../services/APIClient";
import { AxiosError } from "axios";

const apiClient = new APIClient("/api/items");

const useDeleteItem = (id: number | string, headers?: object) => {
  const queryClient = useQueryClient();
  const userId = JSON.parse(localStorage.getItem("userId")!);
  return useMutation(
    async () => {
      return await apiClient.delete(id, headers);
    },
    {
      onSuccess: () => console.log("Successfully deleted the item."),
      onError: (error: AxiosError) => console.log(error.response?.data),
      onSettled: async () =>
        await queryClient.refetchQueries({ queryKey: ["items", userId] }),
    }
  );
};

export default useDeleteItem;
