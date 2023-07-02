import { type Invoice } from "@prisma/client";
import { HiDocument } from "react-icons/hi2";


interface InvoicePDFButtonProps {
  invoice: Invoice;
  generatePDF: (invoice: Invoice) => void;
}

export const InvoicePDFButton = ({
  invoice,
  generatePDF,
}: InvoicePDFButtonProps) => {
  return (
    <button
      onClick={() => generatePDF(invoice)}
      className="rounded-full bg-primary p-2 text-white"
    >
      <HiDocument size={20} />
    </button>
  );
};
