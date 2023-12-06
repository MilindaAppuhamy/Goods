import { useMutation } from "react-query";
import { LoginInputType } from "../components/LoginForm";
import APIClient from "../services/APIClient";
import { AxiosError } from "axios";

const apiClient = new APIClient<LoginInputType>("/api/users/login");

const useUserLogin = () =>
  useMutation(
    async (data: LoginInputType) => {
      return await apiClient.post(data);
    },
    {
      onSuccess: () => console.log("Successfully logged in."),
      onError: (error: AxiosError) => console.log(error.response?.data),
    }
  );

export default useUserLogin;
