"use client";

import { useTranslations } from "next-intl";

interface TermCardProps {
  sectionKey: string;
  valueAr: string;
  valueEn: string;
  onChangeAr: (value: string) => void;
  onChangeEn: (value: string) => void;
}

export default function TermCard({
  sectionKey,
  valueAr,
  valueEn,
  onChangeAr,
  onChangeEn,
}: TermCardProps) {
  const t = useTranslations("Settings.terms");

  return (
    <div className="flex flex-col gap-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
      <h3 className="text-base font-semibold text-[#000709]">{t(sectionKey)}</h3>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-gray-400 font-medium">{t("arLabel")}</span>
          <textarea
            value={valueAr}
            onChange={(e) => onChangeAr(e.target.value)}
            rows={6}
            className="w-full px-4 py-3 rounded-xl bg-[#0000000A] border border-gray-100 text-right text-sm text-gray-600 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-[#0C6175] transition"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-gray-400 font-medium">{t("enLabel")}</span>
          <textarea
            value={valueEn}
            onChange={(e) => onChangeEn(e.target.value)}
            rows={6}
            dir="ltr"
            className="w-full px-4 py-3 rounded-xl bg-[#0000000A] border border-gray-100 text-left text-sm text-gray-600 leading-relaxed resize-none focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-[#0C6175] transition"
          />
        </div>
      </div>
    </div>
  );
}
