"use client";

import {useState} from "react";
import PatientsTable from "./PatientsTable";
import Modal from "@/components/Modal";
import PatientForm from "./PatientForm";

export default function PatientsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Patients</h1>
        <button onClick={() => setOpen(true)} className="btn primary">
          + Add Patient
        </button>
      </div>

      <PatientsTable />

      <Modal open={open} setOpen={setOpen} title="Add Patient">
        <PatientForm onClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
}
