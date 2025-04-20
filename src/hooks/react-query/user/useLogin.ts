import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "../../../types/login/login";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../../store/useAuthStore";
import axios from "axios";
import { RegistrationFormData } from "../../../types/register/register";

const generateToken = (username: string) => {
  return `${username}_${Math.random().toString(36).substring(2)}_${Date.now()}`;
};
export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: LoginFormData) => {
      const users = await axios.get<RegistrationFormData[]>(
        "https://6803c08a79cb28fb3f5992e9.mockapi.io/api/users"
      );
      const authUser = users.data?.find(
        (user) =>
          user.username === data.username && user.password === data.password
      );
      const token = authUser && generateToken(authUser.username);
      if (authUser) {
        return { user: authUser, token: token };
      } else {
        return { user: null, token: null };
      }
    },

    onSuccess: (res, formData) => {
      if (res.user && res.token) {
        useAuthStore.getState().login({
          username: res.user.username,
          token: res.token,
        });
        console.log(res.user.username);
        console.log(res.token);
        toast.success(`Welcome, ${res.user.username}! You’re now logged in.`);
        navigate("/");
      } else {
        toast.error("Invalid username or password.");
      }
    },

    onError: () => {
      toast.error("Login failed. Please try again.");
    },
  });
};
