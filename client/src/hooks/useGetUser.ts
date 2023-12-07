import { useQuery } from "react-query";
import APIClient from "../services/APIClient";

const apiClient = new APIClient(`/api/users`);

const useGetUser = (userId: string | number, headers: object) =>
  useQuery({
    queryKey: ["user", userId],
    queryFn: async () => await apiClient.get(userId, headers),
  });

export default useGetUser;
