export default function KPICard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold text-blue-700">{value}</p>
    </div>
  );
}
