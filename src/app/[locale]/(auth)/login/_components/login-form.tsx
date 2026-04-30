"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import UsernameField from "./fields/username-field";
import PasswordField from "./fields/password-field";
import ForgotPassword from "./forgot-password";
import SubmitButton from "./submit-button";
import {
  loginSchema,
  LoginSchema,
} from "@/shared/lib/schemas/login/login.schema";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  async function onSubmit(data: LoginSchema) {
    // await signIn("credentials", data);
    router.push("/");
  }

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <UsernameField register={register} errors={errors} />
        <PasswordField register={register} errors={errors} />
        <ForgotPassword />
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </div>
  );
}
