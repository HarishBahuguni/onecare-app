import {z} from "zod";

export const doctorSchema = z.object({
  name: z.string().min(1, "Name required"),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  license_no: z.string().optional(),
  specialization: z.string().optional(),
});

export type Doctor = z.infer<typeof doctorSchema>;
