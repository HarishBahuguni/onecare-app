import {Suspense} from "react";
import {format} from "date-fns";
import {getPaginatedSessions, getPatients, getDoctors} from "./data";
import SessionFormModal from "./SessionFormModal";
import PaginatedTable from "@/components/PaginatedTable";

type Props = {searchParams: {page?: string}};

async function SessionTable({page}: {page: number}) {
  const {data: sessions, totalPages} = await getPaginatedSessions(page);

  if (sessions.length === 0)
    return <p className="text-gray-500">No sessions yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">Date</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Time</th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Duration
            </th>
            <th className="px-4 py-2 text-left text-sm font-medium">Patient</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Doctor</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {sessions.map((s: any) => (
            <tr key={s.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">
                {format(new Date(s.session_date), "dd-MM-yyyy")}
              </td>
              <td className="px-4 py-2">{s.session_time}</td>
              <td className="px-4 py-2">{s.duration_minutes} min</td>
              <td className="px-4 py-2">{s.patients.name}</td>
              <td className="px-4 py-2">{s.doctors.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function SessionsPage({searchParams}: Props) {
  const page = Number(searchParams.page) || 1;
  const [patients, doctors] = await Promise.all([getPatients(), getDoctors()]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Treatment Sessions</h1>
        <SessionFormModal patients={patients} doctors={doctors} />
      </div>

      <PaginatedTable page={page} totalPages={0} baseUrl="/dashboard/sessions">
        <SessionTable page={page} />
      </PaginatedTable>
    </div>
  );
}
