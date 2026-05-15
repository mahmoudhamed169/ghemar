"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  phoneSchema,
  PhoneSchema,
} from "@/shared/lib/schemas/login/phone.schema";

import PhoneField from "./fields/phone-field";
import SubmitButton from "./submit-button";
import { sendOtpAction } from "@/shared/lib/actions/auth.actions";

type Props = {
  onSuccess: (phone: string) => void;
};

export default function PhoneStep({ onSuccess }: Props) {
  const t = useTranslations("login-page.phone");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PhoneSchema>({
    resolver: zodResolver(phoneSchema),
  });

  async function onSubmit(data: PhoneSchema) {
    const result = await sendOtpAction(data.phone);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    onSuccess(data.phone);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full">
      <PhoneField register={register} errors={errors} />
      <SubmitButton
        isSubmitting={isSubmitting}
        label={t("submit")}
        loadingLabel={t("submitting")}
      />
    </form>
  );
}
