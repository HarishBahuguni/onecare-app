import {getSessionsByDoctor} from "./data";
import PieChartClient from "@/components/PieChart";

export default async function PieChartBlock() {
  const raw = await getSessionsByDoctor();
  const data = raw.map((d) => ({name: d.name, value: d.totalMins}));
  return <PieChartClient title="Session Minutes by Doctor" data={data} />;
}
