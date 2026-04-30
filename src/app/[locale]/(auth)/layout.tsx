import { ReactNode } from "react"
import Image from "next/image"
import LanguageSwitcher from "@/shared/components/language-switcher"

type Props = {
  children: ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen">

      {/* Left - Brand side */}
      <div className="flex w-1/2 items-center justify-center bg-[#0C6175]">
        <Image
          src="/images/logo.webp"
          alt="Ghomar"
          width={184}
          height={187}
          className="rounded-2xl"
        />
      </div>

      {/* Right - Form side */}
      <div className="relative flex w-1/2 flex-col items-center justify-center p-8">
        
        {/* Language Switcher - أعلى اليمين */}
        <div className="absolute top-6 left-6">
          <LanguageSwitcher />
        </div>

        {children}
      </div>

    </div>
  )
}