import axios from "axios";

class APIClient<T> {
  endpoint: string;
  baseUrl: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.baseUrl = "https://goods-backend.onrender.com";
  }

  post = async (data: T) => {
    const response = await axios.post(this.baseUrl + this.endpoint, data);
    return response;
  };
}

export default APIClient;
