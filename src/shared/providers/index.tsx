"use client";

import React from "react";
import NextIntlProvider from "./components/next-intl.provider";
import ReactQueryProvider from "./components/react-query.prodvider";
import NextAuthProvider from "./components/next-auth-provider";

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
        </NextAuthProvider>
      </ReactQueryProvider>
    </NextIntlProvider>
  );
}
