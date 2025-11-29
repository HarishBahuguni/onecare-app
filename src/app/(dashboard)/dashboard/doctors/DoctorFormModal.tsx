"use client";

import {useState} from "react";
import Modal from "@/components/Modal";
import DoctorForm from "./DoctorForm";

export default function DoctorFormModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn primary">
        + Add Doctor
      </button>
      <Modal open={open} setOpen={setOpen} title="Add Doctor">
        <DoctorForm onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
}
