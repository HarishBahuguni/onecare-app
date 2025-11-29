import "server-only";
import {createClient} from "@/lib/supabaseServer";

export async function getSessions() {
  const sb = await createClient();
  const {data, error} = await sb
    .from("sessions")
    .select(`*, patients(name), doctors(name)`)
    .order("session_date", {ascending: true})
    .order("session_time", {ascending: true});
  if (error) throw error;
  return data ?? [];
}

export async function getPatients() {
  const sb = await createClient();
  const {data, error} = await sb
    .from("patients")
    .select("id, name")
    .order("name");
  if (error) throw error;
  return data ?? [];
}

export async function getDoctors() {
  const sb = await createClient();
  const {data, error} = await sb
    .from("doctors")
    .select("id, name")
    .order("name");
  if (error) throw error;
  return data ?? [];
}
