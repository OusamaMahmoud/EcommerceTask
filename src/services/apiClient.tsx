import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";

const apiClient = axios.create({
  baseURL: "https://fakestoreapi.com",
});

axios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().user?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
export default apiClient;
