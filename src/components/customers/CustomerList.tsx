import { AnimatePresence, motion } from "framer-motion";
import React, { type Key } from "react";
import { listVariants } from "~/hooks/useAnimation";
import { api } from "~/utils/api";
import { CustomerDeleteButton } from "./CustomerDeleteButton";
import { CustomerUpdateButton } from "./CustomerUpdateButton";

export const CustomerList = () => {
  const {
    data: customers,
    isLoading,
    refetch,
  } = api.customers.getAll.useQuery();
  const { mutateAsync, isLoading: isDeleting } =
    api.customers.deleteById.useMutation();

  

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
        {customers !== undefined &&
          customers.map((customer, index: Key) => (
            <motion.div
              key={customer.id}
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              custom={index}
              exit="hidden"
              className="flex flex-row p-5"
            >
              <div className="w-1/4 p-2">{customer.firstName}</div>
              <div className="w-1/4 p-2">{customer.lastName}</div>
              <div className="w-1/4 p-2">{customer.email}</div>
              <div className="w-1/4 p-2 flex gap-2 justify-end">
              <CustomerUpdateButton id={customer.id}></CustomerUpdateButton>
              <CustomerDeleteButton
                id={customer.id}
                handleDelete={handleDelete}
              ></CustomerDeleteButton>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
      
    </>
  );
};
