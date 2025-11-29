import "server-only";
import {createClient} from "@/lib/supabaseServer";
import {paginateQuery, paginateResponse} from "@/lib/paginate";
import type {Paginated} from "@/types/pagination";

export async function getPaginatedPatients(
  page: number = 1,
  perPage: number = 10
): Promise<Paginated<any>> {
  const sb = await createClient();
  const query = sb.from("patients").select("*", {count: "exact"});
  const {data, count, error} = await paginateQuery(query, page, perPage);
  if (error) throw error;
  return paginateResponse(data, count!, page, perPage);
}
