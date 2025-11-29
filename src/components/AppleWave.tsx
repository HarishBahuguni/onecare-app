export default function AppleWave({className = ""}: {className?: string}) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="w-4 h-4 rounded-full bg-gray-300"
          style={{
            animation: `applePop 1.4s ease-in-out infinite`,
            animationDelay: `${i * 160}ms`,
          }}
        />
      ))}
    </div>
  );
}
