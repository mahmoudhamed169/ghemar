import { ReactNode } from "react";
import Image from "next/image";
import LanguageSwitcher from "@/shared/components/language-switcher";

type Props = {
  children: ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Brand side — top bar on mobile, left half on desktop */}
      <div className="flex w-full items-center justify-center bg-[#0C6175] py-10 md:w-1/2 md:min-h-screen md:py-0">
        <Image
          src="/images/logo.webp"
          alt="Ghomar"
          width={184}
          height={187}
          className="rounded-2xl
            w-20 h-20
            md:w-[184px] md:h-[187px]"
          priority
        />
      </div>

      {/* Form side */}
      <div className="relative flex w-full flex-col items-center justify-center p-6 md:w-1/2 md:p-8">
        {/* Language Switcher */}
        <div className="absolute top-4 left-4 md:top-6 md:left-6">
          <LanguageSwitcher />
        </div>

        <div className="w-full max-w-sm">{children}</div>
      </div>
    </div>
  );
}
