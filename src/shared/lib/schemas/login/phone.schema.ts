import { z } from "zod"

export const phoneSchema = z.object({
  phone: z
    .string()
    .min(9, "login-page.validation.phone-min")
    .max(10, "login-page.validation.phone-max")
    .regex(/^[0-9]+$/, "login-page.validation.phone-numeric")
    .refine((val) => val.startsWith("5"), {
      message: "login-page.validation.phone-start",
    }),
})

export type PhoneSchema = z.infer<typeof phoneSchema>