export default function AppleWave({className = ""}: {className?: string}) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className="w-5 h-5 rounded-full bg-gray-300"
          style={{
            animation: `applePop 1.6s ease-in-out infinite`,
            animationDelay: `${i * 200}ms`,
          }}
        />
      ))}
    </div>
  );
}
