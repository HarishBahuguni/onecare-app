import "server-only";
import {createClient} from "@/lib/supabaseServer";

/* -------  KPI CARDS  ------- */
export async function getKPIs() {
  const sb = await createClient();
  const [pat, doc, apt, ses] = await Promise.all([
    sb.from("patients").select("*", {head: true, count: "exact"}),
    sb.from("doctors").select("*", {head: true, count: "exact"}),
    sb.from("appointments").select("*", {head: true, count: "exact"}),
    sb.from("sessions").select("*", {head: true, count: "exact"}),
  ]);
  return {
    patients: pat.count ?? 0,
    doctors: doc.count ?? 0,
    appointments: apt.count ?? 0,
    sessions: ses.count ?? 0,
  };
}

/* -------  APPOINTMENTS LAST 7 DAYS  ------- */
export async function getAppointmentsLast7Days() {
  const sb = await createClient();
  const {data} = await sb
    .from("appointments")
    .select("appointment_date, status")
    .gte(
      "appointment_date",
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    )
    .order("appointment_date", {ascending: true});

  const map: Record<
    string,
    {scheduled: number; completed: number; cancelled: number}
  > = {};
  data?.forEach((d: any) => {
    const day = d.appointment_date;
    if (!map[day]) map[day] = {scheduled: 0, completed: 0, cancelled: 0};
    map[day][d.status as keyof (typeof map)[typeof day]]++;
  });
  return Object.entries(map).map(([date, counts]) => ({date, ...counts}));
}

/* -------  SESSION MINUTES BY DOCTOR  ------- */
export async function getSessionsByDoctor() {
  const sb = await createClient();
  const {data} = await sb
    .from("sessions")
    .select("doctor_id, doctors(name), duration_minutes");
  const map: Record<string, {name: string; totalMins: number}> = {};
  data?.forEach((d: any) => {
    const key = d.doctor_id;
    if (!map[key]) map[key] = {name: d.doctors.name, totalMins: 0};
    map[key].totalMins += d.duration_minutes ?? 0;
  });
  return Object.values(map);
}
