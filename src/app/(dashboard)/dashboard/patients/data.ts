import "server-only";
import {createClient} from "@/lib/supabaseServer";

export async function getPatients() {
  const sb = await createClient();
  const {data, error} = await sb
    .from("patients")
    .select("*")
    .order("created_at", {ascending: false});
  if (error) throw error;
  return data;
}
