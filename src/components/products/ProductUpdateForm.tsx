import React from "react";
import { useFormik } from "formik";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { generateReactHelpers } from "@uploadthing/react";
import { type OurFileRouter } from "~/server/uploadthing";
import { type Product } from "@prisma/client";

interface ProductUpdateFormProps {
  values: Product  | null | undefined,
  onClose: () => void;
}

export const ProductUpdateForm = ({ onClose, values }: ProductUpdateFormProps) => {

  const { mutateAsync } = api.products.update.useMutation();
  const { refetch } = api.products.getAll.useQuery();
  const formik = useFormik({
    initialValues: {
      id: values?.id || 0,
      name: values?.name || "",
      stock: values?.stock || "",
      price: values?.price || 0
    },
    onSubmit: async (values) => {

      try {
        await mutateAsync(values)
        await refetch();
        toast.success("Produit modifié avec succès !");
        onClose();
      } catch (error) {
        // Handle error
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="text-center">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">
          Nom :
        </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.name}
          className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="stock" className="block text-gray-700">
          Stock :
        </label>
        <input
          id="stock"
          name="stock"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.stock}
          className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="price" className="block text-gray-700">
          Prix :
        </label>
        <input
          id="price"
          name="price"
          type="number"
          onChange={formik.handleChange}
          value={formik.values.price}
          className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-contrast px-4 py-2 font-semibold text-white hover:bg-primary"
      >
        Modifier le produit
      </button>
    </form>
  );
};
