import React from "react";
import { useFormik } from "formik";
import { api } from "~/utils/api";
import { toast } from "react-toastify";

interface CustomerCreateFormProps {
  onClose: ()=>void
}

export const CustomerCreateForm = ({onClose}: CustomerCreateFormProps) => {
  const { mutateAsync } = api.customers.create.useMutation();
  const {refetch} = api.customers.getAll.useQuery()
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
    onSubmit: async (values) => {
      try {
        const customer = await mutateAsync(values);
        console.log(customer);
        await refetch();
        toast.success("Client ajouté avec succès !")
        onClose();
        
      } catch (error) {
       
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="text-center">
      <div className="mb-4">
        <label htmlFor="firstName" className="block text-gray-700">
          Prénom : 
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="lastName" className="block text-gray-700">
          Nom : 
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.lastName}
          className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email : 
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
          className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-lg bg-contrast px-4 py-2 font-semibold text-white hover:bg-primary"
      >
        Ajouter le client
      </button>
    </form>
  );
};
