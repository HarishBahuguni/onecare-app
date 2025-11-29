import "server-only";
import {createClient} from "@/lib/supabaseServer";
import {paginateQuery, paginateResponse} from "@/lib/paginate";
import type {Paginated} from "@/types/pagination";

export async function getPaginatedDoctors(
  page: number = 1,
  perPage: number = 10
): Promise<Paginated<any>> {
  const sb = await createClient();
  const query = sb
    .from("doctors")
    .select("*", {count: "exact"})
    .order("created_at", {ascending: false});

  const {data, count, error} = await paginateQuery(query, page, perPage);
  if (error) throw error;
  return paginateResponse(data, count!, page, perPage);
}
