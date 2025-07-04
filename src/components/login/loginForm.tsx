import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import FormInput from "../FormInput";
import useUser from "@/hooks/User";

interface LoginInputs {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    loginMutation: login,
    isLoginError,
    isLoginPending,
    loginErrorMessage,
  } = useUser();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInputs>();

  const onSubmit = async (data: LoginInputs) => {
    try {
      await login(data);
      reset();
      router.push("/lists");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 space-y-6"
    >
      <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-4">
        Вхід
      </h2>
      <FormInput
        label="email"
        id="email"
        type="email"
        register={register("email", { required: "Введіть email" })}
        error={errors.email}
      />
      <FormInput
        label="password"
        id="password"
        type="password"
        register={register("password", { required: "Введіть пароль" })}
        error={errors.password}
      />
      {isLoginError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-sm">
          <div>{loginErrorMessage}</div>
        </div>
      )}
      <button
        type="submit"
        disabled={isLoginPending}
        className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 disabled:opacity-60"
      >
        {isLoginPending ? "Вхід..." : "Увійти"}
      </button>
    </form>
  );
}
