import { AxiosError, AxiosResponse } from "axios";
import APIClient from "../services/APIClient";

const apiClient = new APIClient("/api/checkout/payment_status");

const useGetCheckoutComplete = async (
  userId: number | string,
  sessionId: number | string,
  headers?: object
) => {
  let res: { data: AxiosResponse<any, any> | null; error: any | null } = {
    data: null,
    error: null,
  };

  try {
    res.data = await apiClient.getCheckoutComplete(userId, sessionId, headers);
    sessionStorage.removeItem("checkout_session");
  } catch (error) {
    res.error = (error as AxiosError).response;
    sessionStorage.removeItem("checkout_session");
  }
  return res;
};

export default useGetCheckoutComplete;
