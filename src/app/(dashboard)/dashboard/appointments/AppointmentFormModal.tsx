"use client";

import {useState} from "react";
import Modal from "@/components/Modal";
import AppointmentForm from "./AppointmentForm";

type Props = {
  patients: {id: string; name: string}[];
  doctors: {id: string; name: string}[];
};

export default function AppointmentFormModal({patients, doctors}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn primary">
        + Add Appointment
      </button>
      <Modal open={open} setOpen={setOpen} title="Add Appointment">
        <AppointmentForm
          patients={patients}
          doctors={doctors}
          onClose={() => setOpen(false)}
        />
      </Modal>
    </>
  );
}
