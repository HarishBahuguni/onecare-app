"use client";

import {Suspense} from "react";
import TableSkeleton from "./TableSkeleton";
import PaginationControls from "./PaginationControls";

type Props = {
  page: number;
  totalPages: number;
  baseUrl: string;
  children: React.ReactNode;
};

export default function PaginatedTable({
  page,
  totalPages,
  baseUrl,
  children,
}: Props) {
  return (
    <>
      <Suspense fallback={<TableSkeleton />}>{children}</Suspense>
      <PaginationControls
        page={page}
        totalPages={totalPages}
        baseUrl={baseUrl}
      />
    </>
  );
}
