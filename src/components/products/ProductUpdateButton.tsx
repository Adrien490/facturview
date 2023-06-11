import { useState } from "react";
import { HiPencil } from "react-icons/hi2";
import { api } from "~/utils/api";
import Modal from "../shared/Modal";
import { ProductUpdateForm } from "./ProductUpdateForm";

interface ProductUpdateButtonProps {
  id: number;
}

export const ProductUpdateButton = ({ id }: ProductUpdateButtonProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const product = api.products.getById.useQuery({ id });

  return (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="rounded-full bg-primary p-2 text-white"
      >
        <HiPencil size={20}></HiPencil>
      </button>
      <Modal
        width={"40%"}
        className={"flex flex-col gap-8"}
        modalIsOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      >
        <div className="flex flex-col gap-8">
          <div className="border-b-2 border-primary p-3 text-xl font-bold text-primary">
            <h1>Modifier le produit {product.data?.name}</h1>
          </div>
          <ProductUpdateForm
            onClose={() => setModalIsOpen(false)}
            values={product.data}
          ></ProductUpdateForm>
        </div>
      </Modal>
    </>
  );
};
