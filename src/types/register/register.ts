import { z } from "zod";
import { registrationSchema } from "../../components/schema/register/registrationSchema";

export type RegistrationFormData = z.infer<typeof registrationSchema>;
