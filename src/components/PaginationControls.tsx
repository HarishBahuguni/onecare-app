"use client";

import Link from "next/link";

export default function PaginationControls({
  page,
  totalPages,
  baseUrl,
}: {
  page: number;
  totalPages: number;
  baseUrl: string;
}) {
  const prev = page > 1 ? page - 1 : null;
  const next = page < totalPages ? page + 1 : null;

  return (
    <div className="flex items-center justify-between mt-4">
      <Link
        href={prev ? `${baseUrl}?page=${prev}` : "#"}
        className={`px-3 py-1.5 border rounded ${
          !prev ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
        }`}>
        Previous
      </Link>

      <span className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </span>

      <Link
        href={next ? `${baseUrl}?page=${next}` : "#"}
        className={`px-3 py-1.5 border rounded ${
          !next ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
        }`}>
        Next
      </Link>
    </div>
  );
}
