import {getKPIs, getAppointmentsLast7Days, getSessionsByDoctor} from "./data";
import KPICard from "@/components/KPICard";
import BarChartBlock from "@/components/BarChart";
import PieChartBlock from "@/components/PieChart";

export default async function AnalyticsPage() {
  const [{patients, doctors, appointments, sessions}, aptTrend, sessionPie] =
    await Promise.all([
      getKPIs(),
      getAppointmentsLast7Days(),
      getSessionsByDoctor(),
    ]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard title="Total Patients" value={patients} />
        <KPICard title="Total Doctors" value={doctors} />
        <KPICard title="Total Appointments" value={appointments} />
        <KPICard title="Total Sessions" value={sessions} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChartBlock
          title="Appointments Last 7 Days"
          data={aptTrend}
          keys={["scheduled", "completed", "cancelled"]}
          colors={["#3b82f6", "#10b981", "#ef4444"]}
        />
        <PieChartBlock
          title="Session Minutes by Doctor"
          data={sessionPie.map((d) => ({name: d.name, value: d.totalMins}))}
        />
      </div>
    </div>
  );
}
