"use client";

import { NextIntlClientProvider } from "next-intl";
import React from "react";

interface NextIntlProviderProps {
  children: React.ReactNode;
  locale?: string;
  messages?: Record<string, any>;
}

export default function NextIntlProvider({
  children,
  locale,
  messages,
}: NextIntlProviderProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
