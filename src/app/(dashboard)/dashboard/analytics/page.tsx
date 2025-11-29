import InstantSkeleton from "@/components/InstantSkeleton";
import KPIRow from "./KPIRow";
import BarChartBlock from "./BarChartBlock";
import PieChartBlock from "./PieChartBlock";
import {Suspense} from "react";

export default async function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      {/* KPI Row */}
      <Suspense
        fallback={
          <div className="min-h-[200px]">
            <InstantSkeleton />
          </div>
        }>
        <KPIRow />
      </Suspense>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Suspense
          fallback={
            <div className="min-h-[200px]">
              <InstantSkeleton />
            </div>
          }>
          <BarChartBlock />
        </Suspense>
        <Suspense
          fallback={
            <div className="min-h-[200px]">
              <InstantSkeleton />
            </div>
          }>
          <PieChartBlock />
        </Suspense>
      </div>
    </div>
  );
}
