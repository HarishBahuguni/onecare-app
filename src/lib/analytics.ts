import {createClient} from "@/lib/supabaseServer";

export async function getKPIsFast() {
  const sb = await createClient();
  const {data, error} = await sb.rpc("get_kpis");
  if (error) throw error;
  return data;
}
