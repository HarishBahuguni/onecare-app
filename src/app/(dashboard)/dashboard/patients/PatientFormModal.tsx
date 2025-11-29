"use client";

import {useState} from "react";
import Modal from "@/components/Modal";
import PatientForm from "./PatientForm";

export default function PatientFormModal() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} className="btn primary">
        + Add Patient
      </button>
      <Modal open={open} setOpen={setOpen} title="Add Patient">
        <PatientForm onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
}
