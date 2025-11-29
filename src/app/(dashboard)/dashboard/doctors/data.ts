import "server-only";
import {createClient} from "@/lib/supabaseServer";

export async function getDoctors() {
  const sb = await createClient();
  const {data, error} = await sb
    .from("doctors")
    .select("*")
    .order("created_at", {ascending: false})
    .limit(50);
  if (error) throw error;
  return data ?? [];
}
