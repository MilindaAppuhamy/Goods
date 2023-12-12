import { useMutation, useQueryClient } from "react-query";
import APIClient from "../services/APIClient";
import { AxiosError } from "axios";
import { ItemInputType } from "../components/MyStoreItemForm";

const apiClient = new APIClient<ItemInputType>("/api/items");

const useAddItem = (headers?: object) => {
  const queryClient = useQueryClient();
  const userId = JSON.parse(localStorage.getItem("userId")!);
  return useMutation(
    async (data: ItemInputType) => {
      return await apiClient.post(data, headers);
    },
    {
      onSuccess: () => console.log("Successfully added the item."),
      onError: (error: AxiosError) => console.log(error.response?.data),
      onSettled: async () =>
        await queryClient.refetchQueries({ queryKey: ["items", userId] }),
    }
  );
};

export default useAddItem;
