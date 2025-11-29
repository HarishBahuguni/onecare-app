export default function TableSkeleton({rows = 10}: {rows?: number}) {
  return (
    <div className="animate-pulse">
      {[...Array(rows)].map((_, i) => (
        <div key={i} className="h-8 bg-gray-100 rounded mb-2" />
      ))}
    </div>
  );
}
