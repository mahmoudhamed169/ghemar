"use client";

import { useEffect } from "react";

export default function DirectionProvider({
  locale,
  children,
}: {
  locale: string;
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof document === "undefined") return;

    const dir = locale === "ar" ? "rtl" : "ltr";

    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale]);

  return children;
}
