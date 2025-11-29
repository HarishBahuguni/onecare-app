"use server";

import {revalidatePath} from "next/cache";
import {createClient} from "@/lib/supabaseServer";
import {appointmentSchema, type Appointment} from "@/types/appointment";

export async function createAppointment(data: Appointment) {
  const parsed = appointmentSchema.parse(data);
  const sb = await createClient();
  const {
    data: {user},
  } = await sb.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const {error} = await sb
    .from("appointments")
    .insert({...parsed, created_by: user.id});
  if (error) throw error;
  revalidatePath("/dashboard/appointments");
  return {success: true};
}

export async function updateAppointment(id: string, data: Appointment) {
  const parsed = appointmentSchema.parse(data);
  const sb = await createClient();
  const {error} = await sb.from("appointments").update(parsed).eq("id", id);
  if (error) throw error;
  revalidatePath("/dashboard/appointments");
  return {success: true};
}

export async function deleteAppointment(id: string) {
  const sb = await createClient();
  const {error} = await sb.from("appointments").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/dashboard/appointments");
  return {success: true};
}
