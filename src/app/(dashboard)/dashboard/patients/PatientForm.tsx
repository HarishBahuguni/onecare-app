"use client";

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {patientSchema, type Patient} from "@/types/patient";
import {createPatient, updatePatient} from "./actions";
import {toast} from "react-hot-toast";
import MicroBar from "@/components/MicroBar";

type Props = {
  patient?: Patient & {id?: string};
  onClose: () => void;
};

export default function PatientForm({patient, onClose}: Props) {
  const {
    register,
    handleSubmit,
    formState: {errors, isSubmitting},
  } = useForm<Patient>({
    resolver: zodResolver(patientSchema),
    defaultValues: patient,
  });

  const onSubmit = async (data: Patient) => {
    try {
      if (patient?.id) await updatePatient(patient.id, data);
      else await createPatient(data);
      toast.success("Patient saved");
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

      <select {...register("gender")} className="input">
        <option value="">Gender</option>
        <option value="M">Male</option>
        <option value="F">Female</option>
        <option value="O">Other</option>
      </select>

      <input {...register("dob")} type="date" className="input" />
      <input {...register("phone")} placeholder="Phone" className="input" />
      <input
        {...register("email")}
        type="email"
        placeholder="Email"
        className="input"
      />
      <textarea
        {...register("address")}
        placeholder="Address"
        className="input"
        rows={2}
      />
      <input
        {...register("emergency_contact")}
        placeholder="Emergency Contact"
        className="input"
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
