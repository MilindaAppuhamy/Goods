import { useQuery } from "react-query";
import APIClient from "../services/APIClient";
import { ItemType } from "../components/ItemCard";

const apiClient = new APIClient<ItemType[]>(`/api/items`);

const useGetUserItems = (userId: string | number, headers: object) =>
  useQuery({
    queryKey: ["items", userId],
    queryFn: async () => await apiClient.get(userId, headers),
  });

export default useGetUserItems;
