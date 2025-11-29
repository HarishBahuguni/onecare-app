import {Suspense} from "react";
import {getPaginatedDoctors} from "./data";
import DoctorFormModal from "./DoctorFormModal";
import PaginatedTable from "@/components/PaginatedTable";

type Props = {searchParams: {page?: string}};

async function DoctorTable({page}: {page: number}) {
  const {data: doctors, totalPages} = await getPaginatedDoctors(page);

  if (doctors.length === 0)
    return <p className="text-gray-500">No doctors yet.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-2 text-left text-sm font-medium">Name</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Email</th>
            <th className="px-4 py-2 text-left text-sm font-medium">Phone</th>
            <th className="px-4 py-2 text-left text-sm font-medium">License</th>
            <th className="px-4 py-2 text-left text-sm font-medium">
              Specialization
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {doctors.map((d: any) => (
            <tr key={d.id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{d.name}</td>
              <td className="px-4 py-2">{d.email ?? "-"}</td>
              <td className="px-4 py-2">{d.phone ?? "-"}</td>
              <td className="px-4 py-2">{d.license_no ?? "-"}</td>
              <td className="px-4 py-2">{d.specialization ?? "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default async function DoctorsPage({searchParams}: Props) {
  const page = Number(searchParams.page) || 1;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Doctors</h1>
        <DoctorFormModal />
      </div>

      <PaginatedTable page={page} totalPages={0} baseUrl="/dashboard/doctors">
        <DoctorTable page={page} />
      </PaginatedTable>
    </div>
  );
}
