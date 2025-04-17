import { z } from "zod";

export const registrationSchema = z.object({
  firstName: z.string().nonempty("First Name is required"),
  lastName: z.string().optional(),
  username: z.string().nonempty("Username is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must have at least one uppercase letter")
    .regex(/[0-9]/, "Password must have at least one number")
    .regex(/[^a-zA-Z0-9]/, "Password must have at least one special character"),
  email: z.string().email("Invalid email format"),
  address: z.string().optional(),
});
