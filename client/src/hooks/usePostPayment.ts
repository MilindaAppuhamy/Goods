import { CheckoutItem } from "../components/Payment";
import APIClient from "../services/APIClient";
import { AxiosError, AxiosResponse } from "axios";

const apiClient = new APIClient<CheckoutItem[]>("/create-checkout-session");

const usePostPayment = async (data: CheckoutItem[], headers?: object) => {
  let res: { data: AxiosResponse<any, any> | null; error: any | null } = {
    data: null,
    error: null,
  };

  try {
    res.data = await apiClient.postPayment(data, headers);
  } catch (error) {
    res.error = (error as AxiosError).response;
  }
  return res;
};

export default usePostPayment;
