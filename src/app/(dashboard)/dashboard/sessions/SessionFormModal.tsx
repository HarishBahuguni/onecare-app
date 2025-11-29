"use client";

import {useState} from "react";
import Modal from "@/components/Modal";
import SessionForm from "./SessionForm";
import type {Session} from "@/types/session";

type Props = {
  patients: {id: string; name: string}[];
  doctors: {id: string; name: string}[];
};

export default function SessionFormModal({patients, doctors}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button onClick={() => setOpen(true)} className="btn primary">
        + Add Session
      </button>
      <Modal open={open} setOpen={setOpen} title="Add Session">
        <SessionForm
          patients={patients}
          doctors={doctors}
          onClose={() => setOpen(false)}
        />
      </Modal>
    </>
  );
}
