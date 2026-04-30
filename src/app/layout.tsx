import { ReactNode } from "react";
import { Cairo, IBM_Plex_Sans_Arabic, Geist } from "next/font/google";

const ibmArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibm-arabic",
});

import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const cairo = Cairo({
  subsets: ["latin", "arabic"],
  variable: "--font-cairo",
});

/**
 * RootLayout is the top-level layout component for the application.
 * It wraps all child components inside the global application context.
 *
 * @param children - The components that will be rendered within this layout.
 * @returns The rendered children within the root layout.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      lang="en"
      className={cn(cairo.variable, ibmArabic.variable, ibmArabic.className, "font-sans", geist.variable)}
    >
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
