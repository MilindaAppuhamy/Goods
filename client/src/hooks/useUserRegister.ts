import { useMutation } from "react-query";
import APIClient from "../services/APIClient";
import { AxiosError } from "axios";
import { RegisterInputType } from "../components/RegisterForm";

const apiClient = new APIClient<RegisterInputType>("/api/users/register");

const useUserRegister = () =>
  useMutation(
    async (data: RegisterInputType) => {
      return await apiClient.post(data);
    },
    {
      onSuccess: () => console.log("Successfully registered."),
      onError: (error: AxiosError) => console.log(error.response?.data),
    }
  );

export default useUserRegister;
