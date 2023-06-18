import React, { useState } from "react";
import Modal from "../shared/Modal";
import { InvoiceCreateForm } from "./InvoiceCreateForm";

export const InvoiceCreateButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="rounded-lg bg-primary p-3 text-white"
      >
        Ajouter une facture
      </button>
      <Modal
        width={"65%"}
        className={"flex flex-col gap-8"}
        modalIsOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      >
        <div className="flex flex-col gap-8">
          <div className="text-primary text-center text-xl font-bold border-b-2 border-primary p-3">
            <h1>Ajouter une facture</h1>
          </div>
        </div>
        <InvoiceCreateForm onClose={()=>setModalIsOpen(false)}></InvoiceCreateForm>
      </Modal>
    </>
  );
};
