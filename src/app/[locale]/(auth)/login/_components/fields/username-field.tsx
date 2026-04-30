import { UseFormRegister, FieldErrors } from "react-hook-form";

import { LoginSchema } from "@/shared/lib/schemas/login/login.schema";

type Props = {
  register: UseFormRegister<LoginSchema>;
  errors: FieldErrors<LoginSchema>;
};

export default function UsernameField({ register, errors }: Props) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">اسم المستخدم</label>
      <input
        {...register("username")}
        placeholder="ماريان رضوان"
        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
      />
      {errors.username && (
        <p className="text-xs text-red-500">{errors.username.message}</p>
      )}
    </div>
  );
}
