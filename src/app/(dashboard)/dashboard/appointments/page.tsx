import {Suspense} from "react";
import {format} from "date-fns";
import {getPaginatedAppointments, getPatients, getDoctors} from "./data";
import AppointmentFormModal from "./AppointmentFormModal";
import PaginatedTable from "@/components/PaginatedTable";

type Props = {
  searchParams: Promise<{page?: string}>;
};

async function AppointmentTable({page}: {page: number}) {
  const {data: appointments, totalPages} = await getPaginatedAppointments(page);
  if (appointments.length === 0)
    return <p className="text-gray-500">No appointments yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Time</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Patient</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Doctor</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {appointments.map((a: any) => (
            <tr key={a.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">
                {format(new Date(a.appointment_date), "dd-MM-yyyy")}
              </td>
              <td className="px-4 py-2">{a.appointment_time}</td>
              <td className="px-4 py-2">{a.patients.name}</td>
              <td className="px-4 py-2">{a.doctors.name}</td>
              <td className="px-4 py-2">{a.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function AppointmentsPage({searchParams}: Props) {
  const {page} = await searchParams;
  const pageNum = Number(page) || 1;
  const [patients, doctors] = await Promise.all([getPatients(), getDoctors()]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <AppointmentFormModal patients={patients} doctors={doctors} />
      </div>

      <PaginatedTable
        page={pageNum}
        totalPages={0}
        baseUrl="/dashboard/appointments">
        <AppointmentTable page={pageNum} />
      </PaginatedTable>
    </div>
  );
}
