export default function MicroBar({className = ""}: {className?: string}) {
  return (
    <div
      className={`h-1 w-10 bg-blue-600 rounded-full animate-pulse ${className}`}
      style={{animationDuration: "0.8s"}}
    />
  );
}
