import { useQuery } from "react-query";
import APIClient from "../services/APIClient";

const apiClient = new APIClient(`/api/carts`);

const useGetCart = (userId: string | number, headers: object) =>
  useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => await apiClient.get(userId, headers),
  });

export default useGetCart;
