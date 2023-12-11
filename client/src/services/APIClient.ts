import axios from "axios";

class APIClient<T> {
  endpoint: string;
  baseUrl: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.baseUrl = "https://goods-backend.onrender.com";
  }

  getAll = async () => {
    const response = await axios.get(this.baseUrl + this.endpoint);
    return response;
  };

  get = async (id: number | string, headers?: object) => {
    const axiosInstance = axios.create({
      headers: headers,
    });
    const response = await axiosInstance.get(
      this.baseUrl + this.endpoint + "/" + id
    );
    return response;
  };

  post = async (data: T, headers?: object) => {
    const axiosInstance = axios.create({
      headers: headers,
    });
    const response = await axiosInstance.post(
      this.baseUrl + this.endpoint,
      data
    );
    return response;
  };
}

export default APIClient;
