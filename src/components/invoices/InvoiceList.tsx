import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import React, { type Key } from "react";
import { listVariants } from "~/hooks/useAnimation";
import { api } from "~/utils/api";


export const InvoiceList = () => {
  const {
    data: invoices,
    isLoading,
    refetch,
  } = api.invoices.getAll.useQuery();
  const { mutateAsync, isLoading: isDeleting } =
    api.invoices.deleteById.useMutation();
  

  const handleDelete = (id: number) => {
    const deleteItem = async (id: number) => {
      try {
        await mutateAsync({ id });
        await refetch();
      } catch (error) {
        console.error("Failed to delete item:", error);
      }
    };
  
    void deleteItem(id);
  };
  return (
    <>

      <AnimatePresence>
        {invoices !== undefined &&
          invoices.map((invoice, index: Key) => (
            <motion.div
              key={invoice.id}
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              custom={index}
              exit="hidden"
              className="flex flex-row p-5"
            >
              <div className="w-1/5 p-2">{invoice.customerName}</div>
              <div className="w-1/5 p-2">{dayjs(invoice.date).format('DD/MM/YYYY')}</div>
              <div className="w-1/5 p-2">{invoice.isPaid}</div>
              <div className="w-1/5 p-2 flex gap-2 justify-end">
              
              </div>
              <div className="w-1/5 justify-end p-2 flex gap-2 justify-end">
              
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
      
    </>
  );
};
