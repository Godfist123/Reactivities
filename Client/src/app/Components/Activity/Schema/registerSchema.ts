import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    displayName: z
      .string()
      .min(3, { message: "Display name is required not less than 3" }),
    password: z
      .string()
      .min(6, { message: "Password is required not less than 6 " }),
    confirmPassword: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        message: "Passwords do not match",
        path: ["confirmPassword"],
        code: "custom",
      });
    }
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
