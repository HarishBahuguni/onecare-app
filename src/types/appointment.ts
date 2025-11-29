import {z} from "zod";

export const appointmentSchema = z.object({
  patient_id: z.string().uuid(),
  doctor_id: z.string().uuid(),
  appointment_date: z.string().min(1, "Date required"),
  appointment_time: z.string().min(1, "Time required"),
  status: z.enum(["scheduled", "completed", "cancelled"]).default("scheduled"),
  notes: z.string().optional(),
});

export type Appointment = z.infer<typeof appointmentSchema>;
