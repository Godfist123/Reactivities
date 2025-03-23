import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password is required not less than 6 " }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
