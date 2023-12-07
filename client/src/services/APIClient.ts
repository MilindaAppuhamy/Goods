import axios from "axios";

class APIClient<T> {
  endpoint: string;
  baseUrl: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.baseUrl = "https://goods-backend.onrender.com";
  }

  get = async (id: number | string, headers?: object) => {
    const axiosInstance = axios.create({
      headers: headers,
    });
    const response = await axiosInstance.get(
      this.baseUrl + this.endpoint + "/" + id
    );
    return response;
  };

  post = async (data: T) => {
    const response = await axios.post(this.baseUrl + this.endpoint, data);
    return response;
  };
}

export default APIClient;
