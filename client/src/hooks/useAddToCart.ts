import { useMutation } from "react-query";
import APIClient from "../services/APIClient";
import { AxiosError } from "axios";
import { CartItemType } from "../pages/BasketPage";

const apiClient = new APIClient<CartItemType>("/api/carts");

const useAddToCart = (headers?: object) =>
  useMutation(
    async (data: CartItemType) => {
      return await apiClient.post(data, headers);
    },
    {
      onSuccess: () => console.log("Successfully added to the cart."),
      onError: (error: AxiosError) => console.log(error.response?.data),
    }
  );

export default useAddToCart;
