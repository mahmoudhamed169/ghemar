"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { UseFormRegister, FieldErrors } from "react-hook-form";

import { LoginSchema } from "@/shared/lib/schemas/login/login.schema";

type Props = {
  register: UseFormRegister<LoginSchema>;
  errors: FieldErrors<LoginSchema>;
};

export default function PasswordField({ register, errors }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">كلمة المرور</label>
      <div className="relative">
        <input
          {...register("password")}
          type={show ? "text" : "password"}
          placeholder="••••••••"
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
      {errors.password && (
        <p className="text-xs text-red-500">{errors.password.message}</p>
      )}
    </div>
  );
}
