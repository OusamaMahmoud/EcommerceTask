import { useMutation } from "@tanstack/react-query";
import { RegistrationFormData } from "../../../types/register/register";
import apiClient from "../../../services/apiClient";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const useCreateUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: RegistrationFormData) => apiClient.post("/users", data),
    onSuccess: (res, formData) => {
      toast.success("Registration successful!");
      console.log("HINT=>", formData);
      localStorage.setItem("user", JSON.stringify(formData));
      navigate("/")
    },
    onError: () => {
      toast.error("Registration failed. Please try again.");
    },
  });
};
