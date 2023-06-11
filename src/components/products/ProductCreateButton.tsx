import React, { useState } from "react";
import Modal from "../shared/Modal";
import { ProductCreateForm } from "./ProductCreateForm";

export const ProductCreateButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="rounded-lg bg-primary p-3 text-white"
      >
        Ajouter un produit
      </button>
      <Modal
        width={"40%"}
        className={"flex flex-col gap-8"}
        modalIsOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      >
        <div className="flex flex-col gap-8">
          <div className="text-primary text-center text-xl font-bold border-b-2 border-primary p-3">
            <h1>Ajouter un produit</h1>
          </div>
          <ProductCreateForm onClose={()=>setModalIsOpen(false)}></ProductCreateForm>
        </div>
        
      </Modal>
    </>
  );
};
