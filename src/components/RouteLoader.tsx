"use client";
import {usePathname} from "next/navigation";
import {useEffect, useState} from "react";

export default function RouteLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 300); // fake 300 ms
    return () => clearTimeout(t);
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <div className="flex gap-2">
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"
            style={{animationDelay: `${i * 150}ms`}}
          />
        ))}
      </div>
    </div>
  );
}
