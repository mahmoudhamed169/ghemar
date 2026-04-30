// src/shared/components/language-switcher.tsx
"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "react";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function toggleLocale() {
    const nextLocale = locale === "ar" ? "en" : "ar";
    // استبدل الـ locale في الـ URL
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    startTransition(() => router.replace(newPath));
  }

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
    >
      {locale === "ar" ? (
        <>
          <span className="text-base">🇺🇸</span>
          <span>English</span>
        </>
      ) : (
        <>
          <span className="text-base">🇸🇦</span>
          <span>العربية</span>
        </>
      )}
    </button>
  );
}
