"use server";

import {revalidatePath} from "next/cache";
import {createClient} from "@/lib/supabaseServer";
import {patientSchema, type Patient} from "@/types/patient";

export async function createPatient(data: Patient) {
  const parsed = patientSchema.parse(data);
  const sb = await createClient();
  const {
    data: {user},
  } = await sb.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const {error} = await sb
    .from("patients")
    .insert({...parsed, created_by: user.id});
  if (error) throw error;
  revalidatePath("/dashboard/patients");
  return {success: true};
}

export async function updatePatient(id: string, data: Patient) {
  const parsed = patientSchema.parse(data);
  const sb = await createClient();
  const {error} = await sb.from("patients").update(parsed).eq("id", id);
  if (error) throw error;
  revalidatePath("/dashboard/patients");
  return {success: true};
}

export async function deletePatient(id: string) {
  const sb = await createClient();
  const {error} = await sb.from("patients").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/dashboard/patients");
  return {success: true};
}
