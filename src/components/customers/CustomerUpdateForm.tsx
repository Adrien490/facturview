import React, { useState } from 'react';
import { useFormik } from 'formik';
import { api } from '~/utils/api';
import { type Customer } from '@prisma/client';
import { toast } from 'react-toastify';

interface CustomerUpdateFormProps {
  values: Customer  | null | undefined,
  onClose: ()=>void
}

export const CustomerUpdateForm = ({ values, onClose }: CustomerUpdateFormProps) => {
  const {mutateAsync, isLoading} = api.customers.update.useMutation();
  const {refetch} = api.customers.getAll.useQuery()
  console.log(onClose)
  
  const formik = useFormik({
    initialValues: {
      id: values?.id || 0,
    firstName: values?.firstName || "",
    lastName: values?.lastName || "",
    email: values?.email || ""
    },
    onSubmit: async (values) => {
      await mutateAsync(values);
      await refetch();
      toast.success("Client modifié avec succès !");
      onClose();
    },
  });

  return (
    <>
    <form onSubmit={formik.handleSubmit} className="">
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
          className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500"
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
          className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500"
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
          className="w-full p-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-contrast text-white font-semibold rounded-lg hover:bg-primary"
      >
        Modifier le client
      </button>
    </form>
    </>
  );
};
