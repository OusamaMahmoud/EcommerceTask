import { z } from "zod";
import { loginSchema } from "../../components/schema/login/loginSchema";

export type LoginFormData = z.infer<typeof loginSchema>;
