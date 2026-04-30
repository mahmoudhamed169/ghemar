"use client"; 
import { useTranslations } from "next-intl";

export default function FormHeader() {
  const t = useTranslations("login-page");

  return (
    <div className="space-y-1 mb-6">
      <h2 className="text-2xl font-bold text-gray-900">{t("title")}</h2>
      <p className="text-sm text-gray-500">{t("description")}</p>
    </div>
  );
}
