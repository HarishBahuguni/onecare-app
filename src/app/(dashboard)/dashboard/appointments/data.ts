import "server-only";
import {createClient} from "@/lib/supabaseServer";
import {paginateQuery, paginateResponse} from "@/lib/paginate";
import type {Paginated} from "@/types/pagination";

export async function getPaginatedAppointments(
  page: number = 1,
  perPage: number = 10
): Promise<Paginated<any>> {
  const sb = await createClient();
  const query = sb
    .from("appointments")
    .select(`*, patients(name), doctors(name)`, {count: "exact"})
    .order("appointment_date", {ascending: false})
    .order("appointment_time", {ascending: false});

  const {data, count, error} = await paginateQuery(query, page, perPage);
  if (error) throw error;
  return paginateResponse(data, count!, page, perPage);
}

export async function getPatients() {
  const sb = await createClient();
  const {data} = await sb.from("patients").select("id, name").order("name");
  return data ?? [];
}

export async function getDoctors() {
  const sb = await createClient();
  const {data} = await sb
    .from("doctors")
    .select("id, name")
    .order("name")
    .limit(50);
  return data ?? [];
}
