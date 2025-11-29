"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {appointmentSchema, type Appointment} from "@/types/appointment";
import {createAppointment, updateAppointment} from "./actions";
import {toast} from "react-hot-toast";
import MicroBar from "@/components/MicroBar";

type Props = {
  appointment?: Appointment & {id?: string};
  patients: {id: string; name: string}[];
  doctors: {id: string; name: string}[];
  onClose: () => void;
};

const defaultValues: Appointment = {
  patient_id: "",
  doctor_id: "",
  appointment_date: "",
  appointment_time: "",
  status: "scheduled",
  notes: "",
};

export default function AppointmentForm({
  appointment,
  patients,
  doctors,
  onClose,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<Appointment>({
    resolver: zodResolver(appointmentSchema) as any,
    defaultValues: appointment ?? defaultValues,
  });

  const onSubmit = async (data: Appointment) => {
    try {
      if (appointment?.id) await updateAppointment(appointment.id, data);
      else await createAppointment(data);
      toast.success("Appointment saved");
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

      <input {...register("appointment_date")} type="date" className="input" />
      {errors.appointment_date && (
        <p className="text-red-600 text-sm">
          {errors.appointment_date.message}
        </p>
      )}

      <input {...register("appointment_time")} type="time" className="input" />
      {errors.appointment_time && (
        <p className="text-red-600 text-sm">
          {errors.appointment_time.message}
        </p>
      )}

      <select {...register("status")} className="input">
        <option value="scheduled">Scheduled</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>

      <textarea
        {...register("notes")}
        placeholder="Notes"
        className="input"
        rows={2}
      />

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn primary flex items-center gap-2">
          {isSubmitting ? <MicroBar /> : "Save"}
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
