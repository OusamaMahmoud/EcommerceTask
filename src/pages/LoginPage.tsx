import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import Input from "../components/common/Input";
import { useLogin } from "../hooks/react-query/user/useLogin";
import { LoginFormData } from "../types/login/login";
import { loginSchema } from "../components/schema/login/loginSchema";

const LoginPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const { mutate: login, isPending } = useLogin();
  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
          Login
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Username"
            type="text"
            register={register("username")}
            error={errors.username?.message}
          />
          <Input
            label="Password"
            type="password"
            register={register("password")}
            error={errors.password?.message}
          />
          <button
            type="submit"
            className="btn btn-primary w-full bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            {isPending ? "loading..." : "Login"}
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-800 dark:text-gray-200">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
