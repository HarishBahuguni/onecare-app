import {PostgrestResponse} from "@supabase/supabase-js";

export function paginateQuery<T>(
  query: any,
  page: number = 1,
  perPage: number = 10
) {
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;
  return query.range(from, to);
}

export function paginateResponse<T>(
  data: T[],
  total: number,
  page: number,
  perPage: number
) {
  return {
    data,
    total,
    page,
    perPage,
    totalPages: Math.ceil(total / perPage),
  };
}
