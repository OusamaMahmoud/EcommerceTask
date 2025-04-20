import { useMutation } from "@tanstack/react-query";
import { RegistrationFormData } from "../../../types/register/register";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";

export const useCreateUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: RegistrationFormData) =>
      axios.post("https://6803c08a79cb28fb3f5992e9.mockapi.io/api/users", data),
    onSuccess: () => {
      toast.success("Account created successfully. Please log in.");
      navigate("/login");
    },
    onError: () => {
      toast.error("Registration failed. Please try again.");
    },
  });
};
