"use client";
import { useState } from "react";
import FormHeader from "./form-header";
import PhoneStep from "./phone-step";
import OtpStep from "./otp-step";

type Step = "phone" | "otp";

export default function LoginForm() {
  const [step, setStep] = useState<Step>("phone");
  const [phone, setPhone] = useState("");

  function handlePhoneSuccess(phoneNumber: string) {
    setPhone(phoneNumber);
    setStep("otp");
  }

  function handleBack() {
    setStep("phone");
  }

  return (
    <main className="flex flex-col w-full">
      <FormHeader step={step} phone={phone} />

      {step === "phone" && <PhoneStep onSuccess={handlePhoneSuccess} />}

      {step === "otp" && <OtpStep phone={phone} onBack={handleBack} />}
    </main>
  );
}
