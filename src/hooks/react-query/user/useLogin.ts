import { useMutation } from "@tanstack/react-query";
import apiClient from "../../../services/apiClient";
import { LoginFormData } from "../../../types/login/login";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: LoginFormData) => apiClient.post("/auth/login", data),
    onSuccess: () => {
      alert("Registration successful!");
    },
    onError: () => {
      alert("Registration failed. Please try again.");
    },
  });
};
