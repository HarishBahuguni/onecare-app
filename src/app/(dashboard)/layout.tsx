"use client";

import {useState} from "react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {signOut} from "@/lib/auth";
import {Toaster} from "react-hot-toast";
import {
  CalendarDaysIcon,
  UsersIcon,
  ClipboardDocumentListIcon,
  UserGroupIcon,
  ChartBarIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const nav = [
  {name: "Patients", href: "/dashboard/patients", icon: UsersIcon},
  {
    name: "Appointments",
    href: "/dashboard/appointments",
    icon: CalendarDaysIcon,
  },
  {
    name: "Sessions",
    href: "/dashboard/sessions",
    icon: ClipboardDocumentListIcon,
  },
  {name: "Doctors", href: "/dashboard/doctors", icon: UserGroupIcon},
  {name: "Analytics", href: "/dashboard/analytics", icon: ChartBarIcon},
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform lg:translate-x-0 lg:static lg:inset-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <span className="text-xl font-bold text-blue-700">OneCare</span>
          <button className="lg:hidden" onClick={() => setOpen(false)}>
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>
        <nav className="px-4 py-4 space-y-2">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition ${
                  active
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setOpen(false)}>
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm px-4 lg:px-8 h-16 flex items-center justify-between">
          <button className="lg:hidden" onClick={() => setOpen(true)}>
            <Bars3Icon className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={signOut}
              className="px-4 py-2 text-sm rounded-lg border border-gray-300 hover:bg-gray-100">
              Logout
            </button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}
