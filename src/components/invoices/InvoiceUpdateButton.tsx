import { useRouter } from "next/navigation";
import { useState } from "react";
import { HiOutlineMinus, HiPencil } from "react-icons/hi2";
import { api } from "~/utils/api";
import Modal from "../shared/Modal";
import { InvoiceUpdateForm } from "./InvoiceUpdateForm";

interface InvoiceUpdateButtonProps {
  id: number;
}

export const InvoiceUpdateButton = ({ id }: InvoiceUpdateButtonProps) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const invoice = api.invoices.getById.useQuery({ id });
  console.log(invoice.data)

  return (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="rounded-full bg-primary p-2 text-white"
      >
        <HiPencil size={20}></HiPencil>
      </button>
      <Modal
        width={"60%"}
        className={"flex flex-col gap-8"}
        modalIsOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      >
        <div className="flex flex-col gap-8">
          <div className="border-b-2 border-primary p-3 text-xl font-bold text-primary">
            <h1>Modifier la facture {invoice.data?.id}</h1>
          </div>
          <InvoiceUpdateForm
            onClose={() => setModalIsOpen(false)}
            values={invoice.data}
          ></InvoiceUpdateForm>
        </div>
      </Modal>
    </>
  );
};
