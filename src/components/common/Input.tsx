import React from "react";

interface InputProps {
  label: string;
  type: string;
  register: any;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, type, register, error }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
      {label}
    </label>
    <input
      type={type}
      className="input input-bordered border-black  w-full bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      {...register}
    />
    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
  </div>
);

export default Input;
