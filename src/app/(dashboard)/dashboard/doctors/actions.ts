"use server";

import {revalidatePath} from "next/cache";
import {createClient} from "@/lib/supabaseServer";
import {doctorSchema, type Doctor} from "@/types/doctor";

export async function createDoctor(data: Doctor) {
  const parsed = doctorSchema.parse(data);
  const sb = await createClient();
  const {error} = await sb.from("doctors").insert(parsed);
  if (error) throw error;
  revalidatePath("/dashboard/doctors");
  return {success: true};
}

export async function updateDoctor(id: string, data: Doctor) {
  const parsed = doctorSchema.parse(data);
  const sb = await createClient();
  const {error} = await sb.from("doctors").update(parsed).eq("id", id);
  if (error) throw error;
  revalidatePath("/dashboard/doctors");
  return {success: true};
}

export async function deleteDoctor(id: string) {
  const sb = await createClient();
  const {error} = await sb.from("doctors").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/dashboard/doctors");
  return {success: true};
}
