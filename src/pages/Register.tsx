import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router";
import Input from "../components/common/Input";
import { RegistrationFormData } from "../types/register/register";
import { registrationSchema } from "../components/schema/register/registrationSchema";
import { useCreateUser } from "../hooks/react-query/user/useCreateUser";

const RegistrationPage: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
  });

  const { mutate: createUser } = useCreateUser();

  const onSubmit = (data: RegistrationFormData) => {
    createUser(data);
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl  w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-200">
          Sign Up
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
            <Input
              label="First Name"
              type="text"
              register={register("firstName")}
              error={errors.firstName?.message}
            />
            <Input
              label="Last Name"
              type="text"
              register={register("lastName")}
            />
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
            <Input
              label="Email"
              type="email"
              register={register("email")}
              error={errors.email?.message}
            />
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
                Address
              </label>
              <textarea
                className="textarea textarea-bordered w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                {...register("address")}
              ></textarea>
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary  bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-800 dark:text-gray-200">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
