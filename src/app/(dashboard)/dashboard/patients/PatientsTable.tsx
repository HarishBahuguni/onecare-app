import {createClient} from "@/lib/supabaseServer";
import SkeletonTable from "@/components/SkeletonTable";
import {Suspense} from "react";
import {format} from "date-fns";

export default function PatientsTable() {
  return (
    <Suspense fallback={<SkeletonTable />}>
      <PatientsTableContent />
    </Suspense>
  );
}

async function PatientsTableContent() {
  const sb = await createClient();
  const {data} = await sb
    .from("patients")
    .select("*")
    .order("created_at", {ascending: false});

  if (!data?.length) return <p className="text-gray-500">No patients yet.</p>;

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
          {data.map((p) => (
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
