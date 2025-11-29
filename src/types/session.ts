import {z} from "zod";

export const sessionSchema = z.object({
  patient_id: z.string().uuid(),
  doctor_id: z.string().uuid(),
  session_date: z.string().min(1, "Date required"),
  session_time: z.string().min(1, "Time required"),
  duration_minutes: z.coerce.number().int().min(1, "Duration ≥ 1 min"),
  notes: z.string().optional(),
});

export type Session = z.infer<typeof sessionSchema>;
