"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {doctorSchema, type Doctor} from "@/types/doctor";
import {createDoctor, updateDoctor} from "./actions";
import {toast} from "react-hot-toast";

type Props = {
  doctor?: Doctor & {id?: string};
  onClose: () => void;
};

const defaultValues: Doctor = {
  name: "",
  email: "",
  phone: "",
  license_no: "",
  specialization: "",
};

export default function DoctorForm({doctor, onClose}: Props) {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<Doctor>({
    resolver: zodResolver(doctorSchema) as any,
    defaultValues: doctor ?? defaultValues,
  });

  const onSubmit = async (data: Doctor) => {
    try {
      if (doctor?.id) await updateDoctor(doctor.id, data);
      else await createDoctor(data);
      toast.success("Doctor saved");
      onClose();
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register("name")} placeholder="Full Name" className="input" />
      {errors.name && (
        <p className="text-red-600 text-sm">{errors.name.message}</p>
      )}

      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="input"
      />
      {errors.email && (
        <p className="text-red-600 text-sm">{errors.email.message}</p>
      )}

      <input {...register("phone")} placeholder="Phone" className="input" />
      <input
        {...register("license_no")}
        placeholder="License No"
        className="input"
      />
      <input
        {...register("specialization")}
        placeholder="Specialization"
        className="input"
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
