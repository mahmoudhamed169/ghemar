"use client";
import { useTranslations } from "next-intl";

type Props = {
  step: "phone" | "otp";
  phone?: string;
};

// مثال: "512345678" → "51 234 5678"
function formatSaudiPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 9) {
    return `${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`;
  }
  return digits;
}

export default function FormHeader({ step, phone }: Props) {
  const t = useTranslations("login-page");

  if (step === "otp") {
    return (
      <div className="space-y-1 mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{t("otp.title")}</h2>
        <p className="text-sm text-gray-500">
          {t("otp.description")}{" "}
          <span
            className="font-medium text-gray-700 dir-ltr inline-block"
            dir="ltr"
          >
            +966 {phone ? formatSaudiPhone(phone) : ""}
          </span>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1 mb-6">
      <h2 className="text-2xl font-bold text-gray-900">{t("phone.title")}</h2>
      <p className="text-sm text-gray-500">{t("phone.description")}</p>
    </div>
  );
}
