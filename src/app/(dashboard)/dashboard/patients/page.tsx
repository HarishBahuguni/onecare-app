import {Suspense} from "react";
import {getPaginatedPatients} from "./data";
import PatientFormModal from "./PatientFormModal";
import PaginatedTable from "@/components/PaginatedTable";
import {format} from "date-fns";

type Props = {
  searchParams: {page?: string};
};

async function PatientTable({page}: {page: number}) {
  const {data: patients, totalPages} = await getPaginatedPatients(page);

  if (patients.length === 0)
    return <p className="text-gray-500">No patients yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Gender</th>
            <th className="px-4 py-2 text-left text-sm font-medium">DOB</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Phone</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {patients.map((p: any) => (
            <tr key={p.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">{p.gender}</td>
              <td className="px-4 py-2">
                {p.dob ? format(new Date(p.dob), "dd-MM-yyyy") : ""}
              </td>
              <td className="px-4 py-2">{p.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function PatientsPage({searchParams}: Props) {
  const page = Number(searchParams.page) || 1;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Patients</h1>
        <PatientFormModal />
      </div>

      <PaginatedTable page={page} totalPages={0} baseUrl="/dashboard/patients">
        <PatientTable page={page} />
      </PaginatedTable>
    </div>
  );
}
