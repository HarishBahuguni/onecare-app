export default function InstantSkeleton() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"
            style={{animationDelay: `${i * 150}ms`}}
          />
        ))}
      </div>
    </div>
  );
}
