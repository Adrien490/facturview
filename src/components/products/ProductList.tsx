import { AnimatePresence, motion } from "framer-motion";
import React, { type Key } from "react";
import { listVariants } from "~/hooks/useAnimation";
import { api } from "~/utils/api";
import { ProductDeleteButton } from "./ProductDeleteButton";
import { ProductUpdateButton } from "./ProductUpdateButton";

export const ProductList = () => {
  const { data: products, isLoading, refetch } = api.products.getAll.useQuery();
  const { mutateAsync, isLoading: isDeleting } =
    api.products.deleteById.useMutation();

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
        {products !== undefined &&
          products.map((product, index: Key) => (
            <motion.div
              key={product.id}
              variants={listVariants}
              initial="hidden"
              whileInView="visible"
              custom={index}
              exit="hidden"
              className="flex items-center flex-row p-5"
            >
              <div className="w-1/4 p-2">{product.name}</div>
              <div className="w-1/4 p-2">{product.stock}</div>
              <div className="w-1/4 p-2">{product.price}</div>
              
              <div className="flex w-1/4 justify-end gap-2 p-2">
                <ProductUpdateButton id={product.id}></ProductUpdateButton>
                <ProductDeleteButton
                  id={product.id}
                  handleDelete={handleDelete}
                ></ProductDeleteButton>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </>
  );
};
