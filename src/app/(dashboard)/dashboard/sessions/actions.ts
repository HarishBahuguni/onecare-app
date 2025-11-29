"use server";

import {revalidatePath} from "next/cache";
import {createClient} from "@/lib/supabaseServer";
import {sessionSchema, type Session} from "@/types/session";

export async function createSession(data: Session) {
  const parsed = sessionSchema.parse(data);
  const sb = await createClient();
  const {
    data: {user},
  } = await sb.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const {error} = await sb
    .from("sessions")
    .insert({...parsed, created_by: user.id});
  if (error) throw error;
  revalidatePath("/dashboard/sessions");
  return {success: true};
}

export async function updateSession(id: string, data: Session) {
  const parsed = sessionSchema.parse(data);
  const sb = await createClient();
  const {error} = await sb.from("sessions").update(parsed).eq("id", id);
  if (error) throw error;
  revalidatePath("/dashboard/sessions");
  return {success: true};
}

export async function deleteSession(id: string) {
  const sb = await createClient();
  const {error} = await sb.from("sessions").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/dashboard/sessions");
  return {success: true};
}
