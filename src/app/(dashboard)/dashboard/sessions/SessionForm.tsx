"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {sessionSchema, type Session} from "@/types/session";
import {createSession, updateSession} from "./actions";
import {toast} from "react-hot-toast";

type Props = {
  session?: Session & {id?: string};
  patients: {id: string; name: string}[];
  doctors: {id: string; name: string}[];
  onClose: () => void;
};

const defaultValues: Session = {
  patient_id: "",
  doctor_id: "",
  session_date: "",
  session_time: "",
  duration_minutes: 30,
  notes: "",
};

export default function SessionForm({
  session,
  patients,
  doctors,
  onClose,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<Session>({
    resolver: zodResolver(sessionSchema) as any,
    defaultValues: session ?? defaultValues,
  });

  const onSubmit = async (data: Session) => {
    try {
      if (session?.id) await updateSession(session.id, data);
      else await createSession(data);
      toast.success("Session saved");
      onClose();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <select {...register("patient_id")} className="input">
        <option value="">Select Patient</option>
        {patients.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
      {errors.patient_id && (
        <p className="text-red-600 text-sm">{errors.patient_id.message}</p>
      )}

      <select {...register("doctor_id")} className="input">
        <option value="">Select Doctor</option>
        {doctors.map((d) => (
          <option key={d.id} value={d.id}>
            {d.name}
          </option>
        ))}
      </select>
      {errors.doctor_id && (
        <p className="text-red-600 text-sm">{errors.doctor_id.message}</p>
      )}

      <input {...register("session_date")} type="date" className="input" />
      {errors.session_date && (
        <p className="text-red-600 text-sm">{errors.session_date.message}</p>
      )}

      <input {...register("session_time")} type="time" className="input" />
      {errors.session_time && (
        <p className="text-red-600 text-sm">{errors.session_time.message}</p>
      )}

      <input
        {...register("duration_minutes")}
        type="number"
        placeholder="Duration (min)"
        className="input"
        min={1}
      />
      {errors.duration_minutes && (
        <p className="text-red-600 text-sm">
          {errors.duration_minutes.message}
        </p>
      )}

      <textarea
        {...register("notes")}
        placeholder="Notes"
        className="input"
        rows={2}
      />

      <div className="flex gap-2">
        <button type="submit" disabled={isSubmitting} className="btn primary">
          {isSubmitting ? "Saving…" : "Save"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded-lg">
          Cancel
        </button>
      </div>
    </form>
  );
}
