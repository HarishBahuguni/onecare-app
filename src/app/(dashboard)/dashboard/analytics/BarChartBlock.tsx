import {getAppointmentsLast7Days} from "./data";
import BarChartClient from "@/components/BarChart";

export default async function BarChartBlock() {
  const data = await getAppointmentsLast7Days();
  return (
    <BarChartClient
      title="Appointments Last 7 Days"
      data={data}
      keys={["scheduled", "completed", "cancelled"]}
      colors={["#3b82f6", "#10b981", "#ef4444"]}
    />
  );
}
