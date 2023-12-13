import axios from "axios";

class APIClient<T> {
  endpoint: string;
  baseUrl: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
    this.baseUrl = "http://localhost:3000"; //"https://goods-backend.onrender.com";
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

  update = async (id: number | string, data: T, headers?: object) => {
    const axiosInstance = axios.create({
      headers: headers,
    });
    const response = await axiosInstance.patch(
      this.baseUrl + this.endpoint + "/" + id,
      data
    );
    return response;
  };

  delete = async (id: number | string, headers?: object) => {
    const axiosInstance = axios.create({
      headers: headers,
    });
    const response = await axiosInstance.delete(
      this.baseUrl + this.endpoint + "/" + id
    );
    return response;
  };

  updateCart = async (
    id: number | string,
    data: T,
    query: string,
    headers?: object
  ) => {
    const axiosInstance = axios.create({
      headers: headers,
    });
    const response = await axiosInstance.patch(
      this.baseUrl + this.endpoint + "/" + id + "?action=" + query,
      data
    );
    return response;
  };
}

export default APIClient;
