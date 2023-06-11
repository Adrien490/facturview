import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineMinus, HiPencil } from "react-icons/hi2";
import { api } from "~/utils/api";
import Modal from "../shared/Modal";
import { CustomerUpdateForm } from "./CustomerUpdateForm";

interface CustomerUpdateButtonProps {
  id: number;
}

export const CustomerUpdateButton = ({ id }: CustomerUpdateButtonProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const customer = api.customers.getById.useQuery({ id });

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
            <h1>Modifier le client {customer.data?.lastName}</h1>
          </div>
          <CustomerUpdateForm
            onClose={() => setModalIsOpen(false)}
            values={customer.data}
          ></CustomerUpdateForm>
        </div>
      </Modal>
    </>
  );
};
