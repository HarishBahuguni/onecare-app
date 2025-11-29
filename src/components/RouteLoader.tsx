"use client";

import {useEffect} from "react";
import {usePathname} from "next/navigation";
import AppleWave from "./AppleWave";

export default function RouteLoader() {
  const pathname = usePathname();

  useEffect(() => {
    const overlay = document.getElementById("route-loader");
    if (!overlay) return;

    overlay.classList.remove("hidden");
    const t = setTimeout(() => overlay.classList.add("hidden"), 1200);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div
      id="route-loader"
      className="fixed inset-0 z-50 hidden items-center justify-center bg-black/50 backdrop-blur-lg">
      <AppleWave />
    </div>
  );
}
