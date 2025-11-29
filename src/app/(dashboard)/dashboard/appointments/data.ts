import "server-only";
import {createClient} from "@/lib/supabaseServer";

export async function getAppointments() {
  const sb = await createClient();
  const {data, error} = await sb
    .from("appointments")
    .select(`*, patients(name), doctors(name)`) // ← DOT added
    .order("appointment_date", {ascending: true})
    .order("appointment_time", {ascending: true});

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
