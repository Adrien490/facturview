import { HiOutlineMinus } from "react-icons/hi2";

interface InvoiceDeleteButtonProps {
  id: number;
  handleDelete: (id: number) => void;
}

export const InvoiceDeleteButton = ({
  id,
  handleDelete,
}: InvoiceDeleteButtonProps) => {
  return (
    <button
      onClick={() => handleDelete(id)}
      className="rounded-full bg-red-400 p-2 text-white"
    >
      <HiOutlineMinus size={20} />
    </button>
  );
};
