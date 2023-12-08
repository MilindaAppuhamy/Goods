import { useQuery } from "react-query";
import APIClient from "../services/APIClient";

const apiClient = new APIClient(`/api/items`);

const useGetItems = () =>
  useQuery({
    queryKey: ["items"],
    queryFn: async () => await apiClient.getAll(),
  });

export default useGetItems;
