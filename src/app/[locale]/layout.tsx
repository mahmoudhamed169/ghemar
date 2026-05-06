import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Cairo, IBM_Plex_Sans_Arabic } from "next/font/google";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Metadata } from "next";
import { routing } from "@/i18n/routing";
import DirectionProvider from "@/shared/providers/components/direction-provider";
import Providers from "@/shared/providers";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cairo",
  display: "swap",
});

const ibmPlex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};


export const metadata: Metadata = {
  title: "غِمار",
};


export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const isArabic = locale === "ar";

  return (
    <DirectionProvider locale={locale}>
      <div
        dir={isArabic ? "rtl" : "ltr"}
        className={` bg-[#F7F8FA] ${cairo.variable} ${ibmPlex.variable} ${
          isArabic ? "lang-ar" : "lang-en"
        }`}
      >
        <Providers locale={locale} messages={messages}>
          {children}
        </Providers>
      </div>
    </DirectionProvider>
  );
}
