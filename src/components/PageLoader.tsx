"use client";

import {useEffect} from "react";
import {usePathname} from "next/navigation";
import AppleWave from "./AppleWave";

export default function PageLoader() {
  const pathname = usePathname();

  useEffect(() => {
    const spinner = document.getElementById("page-loader");
    if (!spinner) return;

    spinner.classList.remove("hidden");
    const t = setTimeout(() => spinner.classList.add("hidden"), 400);
    return () => clearTimeout(t);
  }, [pathname]);

  return (
    <div
      id="page-loader"
      className="fixed inset-0 z-50 hidden items-center justify-center bg-white/80">
      <AppleWave />
    </div>
  );
}
