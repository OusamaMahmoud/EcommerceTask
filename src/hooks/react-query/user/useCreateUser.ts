import { useMutation } from "@tanstack/react-query";
import { RegistrationFormData } from "../../../types/register/register";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import axios from "axios";
import { MOCK_API_URL } from "../../../api/mockApi";


export const useCreateUser = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: RegistrationFormData) =>
      axios.post(`${MOCK_API_URL}/users`, data),
    onSuccess: () => {
      toast.success("Account created successfully. Please log in.");
      navigate("/login");
    },
    onError: () => {
      toast.error("Registration failed. Please try again.");
    },
  });
};
