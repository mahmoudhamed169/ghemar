import { z } from "zod"

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, "login-page.validation.otp-length")
    .regex(/^[0-9]+$/, "login-page.validation.otp-numeric"),
})

export type OtpSchema = z.infer<typeof otpSchema>