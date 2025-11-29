import {z} from "zod";

export const patientSchema = z.object({
  name: z.string().min(1, "Name required"),
  gender: z.enum(["M", "F", "O"]),
  dob: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  emergency_contact: z.string().optional(),
});

export type Patient = z.infer<typeof patientSchema>;
