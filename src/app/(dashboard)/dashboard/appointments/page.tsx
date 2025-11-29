import {getAppointments, getPatients, getDoctors} from "./data";
import {format} from "date-fns";
import AppointmentFormModal from "./AppointmentFormModal";
import AppleWave from "@/components/AppleWave";
import {Suspense} from "react";

export default async function AppointmentsPage() {
  const [appointments, patients, doctors] = await Promise.all([
    getAppointments(),
    getPatients(),
    getDoctors(),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Appointments</h1>
        <AppointmentFormModal patients={patients} doctors={doctors} />
      </div>

      <Suspense
        fallback={
          <div className="min-h-[200px] flex items-center justify-center">
            <AppleWave />
          </div>
        }>
        {appointments.length === 0 ? (
          <p className="text-gray-500">No appointments yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Time
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Patient
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Doctor
                  </th>
                  <th className="px-4 py-2 text-left text-sm font-medium">
                    Status
                  </th>
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
        )}
      </Suspense>
    </div>
  );
}
