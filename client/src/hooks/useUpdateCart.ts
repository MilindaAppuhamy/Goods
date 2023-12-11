import { useMutation, useQueryClient } from "react-query";
import APIClient from "../services/APIClient";
import { AxiosError } from "axios";
import { CartItemType } from "../pages/BasketPage";

const apiClient = new APIClient<CartItemType>("/api/carts");
// Get QueryClient from the context

const useUpdateCart = (id: number | string, headers?: object) => {
  const queryClient = useQueryClient();
  const userId = JSON.parse(localStorage.getItem("userId")!);
  return useMutation(
    async ({ data, query }: { data: CartItemType; query: string }) => {
      return await apiClient.updateCart(id, data, query, headers);
    },
    {
      onSuccess: () => console.log("Successfully performed the action."),
      onError: (error: AxiosError) => console.log(error.response?.data),
      onSettled: async () =>
        await queryClient.refetchQueries({ queryKey: ["cart", userId] }),
    }
  );
};

export default useUpdateCart;
