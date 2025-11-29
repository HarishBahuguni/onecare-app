import {getKPIsFast} from "@/lib/analytics";
import KPICard from "@/components/KPICard";

export default async function KPIRow() {
  const {patients, doctors, appointments, sessions} = await getKPIsFast();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard title="Total Patients" value={patients} />
      <KPICard title="Total Doctors" value={doctors} />
      <KPICard title="Total Appointments" value={appointments} />
      <KPICard title="Total Sessions" value={sessions} />
    </div>
  );
}
