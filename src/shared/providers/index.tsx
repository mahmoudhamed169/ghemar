"use client";

import React from "react";
import NextIntlProvider from "./components/next-intl.provider";
import ReactQueryProvider from "./components/react-query.prodvider";
import NextAuthProvider from "./components/next-auth-provider";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: React.ReactNode;
  locale?: string;
  messages?: Record<string, any>;
}

export default function Providers({
  children,
  locale,
  messages,
}: ProvidersProps) {
  return (
    <NextIntlProvider locale={locale} messages={messages}>
      <ReactQueryProvider>
        {/* react query dev tools */}

        <NextAuthProvider>
          {/* <PushNotificationInit interests={["role-admin"]} /> */}

          {children}
          <Toaster position="top-center" richColors duration={3000} />
        </NextAuthProvider>
      </ReactQueryProvider>
    </NextIntlProvider>
  );
}
