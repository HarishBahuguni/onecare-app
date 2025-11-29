export default function PulseDot({
  className = "w-2 h-2",
}: {
  className?: string;
}) {
  return (
    <span className={`rounded-full bg-blue-600 animate-pulse ${className}`} />
  );
}
