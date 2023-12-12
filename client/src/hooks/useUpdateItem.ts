import { useMutation, useQueryClient } from "react-query";
import APIClient from "../services/APIClient";
import { AxiosError } from "axios";
import { ItemInputType } from "../components/MyStoreItemForm";

const apiClient = new APIClient<ItemInputType>("/api/items");

const useUpdateItem = (id: number | string, headers?: object) => {
  const queryClient = useQueryClient();
  const userId = JSON.parse(localStorage.getItem("userId")!);
  return useMutation(
    async ({ data }: { data: ItemInputType }) => {
      return await apiClient.update(id, data, headers);
    },
    {
      onSuccess: () => console.log("Successfully updated the item."),
      onError: (error: AxiosError) => console.log(error.response?.data),
      onSettled: async () =>
        await queryClient.refetchQueries({ queryKey: ["items", userId] }),
    }
  );
};

export default useUpdateItem;
