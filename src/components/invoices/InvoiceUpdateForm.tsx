import React, { useEffect } from "react";
import { useFormik } from "formik";
import { api } from "~/utils/api";
import { toast } from "react-toastify";
import { HiPlus } from "react-icons/hi2";
import Select from "react-select";
import { type Invoice } from "@prisma/client";

interface InvoiceUpdateFormProps {
  onClose: () => void;
  values: Invoice,
}

export const InvoiceUpdateForm = ({ onClose, values: invoiceValues }: InvoiceUpdateFormProps) => {
  const {
    refetch,
  } = api.invoices.getAll.useQuery();
  const customer = api.customers.getById.useQuery({ id: invoiceValues.id });
  const { mutateAsync } = api.invoices.update.useMutation();
  const { data: productsInvoice } = api.productInvoice.getAllByInvoiceId.useQuery({ invoiceId: invoiceValues.id });
  const { mutateAsync: productInvoiceMutateAsync } = api.productInvoice.create.useMutation();
  const { mutateAsync: deleteAllProductsInvoice } = api.productInvoice.deleteAll.useMutation();
  const { data: products } = api.products.getAll.useQuery();
  const { data: customers } = api.customers.getAll.useQuery();
  console.log(productsInvoice)

  const removeProduct = (indexToRemove: number) => {
    const remove = async () => {
      await formik.setValues((currentValues) => {
        const filteredProducts = currentValues.products.filter((_, index) => index !== indexToRemove);
        return {
          ...currentValues,
          products: filteredProducts,
        };
      });
      toast.success("Ligne de produit supprimée avec succès");
    };
    void remove();
  }

  const customerOptions = customers?.map((customer) => ({
    value: customer.id, // Remplacez 'id' par la clé appropriée pour le client
    label: customer.lastName, // Remplacez 'name' par la clé appropriée pour le client
  }));

  

  const productOptions = products?.map((product) => ({
    value: product.id, // Remplacez 'id' par la clé appropriée pour le client
    label: product.name, // Remplacez 'name' par la clé appropriée pour le client
  }));



  const addProduct = () => {
    const add = async () => {
      const newProduct = { productName: "", quantity: 1 };
      await formik.setValues({
        ...formik.values,
        products: [...formik.values.products, newProduct],
      });
      toast.success("Ligne ajoutée avec succès");
    };
    void add();
  }

  const formik = useFormik({
    initialValues: {
      customerName: customer.data?.lastName,
      date: invoiceValues.date,
      isPaid: invoiceValues.isPaid,
      products: productsInvoice ? productsInvoice.map(item => ({ productName: item.productName, quantity: item.quantity })) : [{ productName: "", quantity: 1 }],
    },
    onSubmit: async (values) => {
      try {


        // Créer la facture d'abord
        const updateInvoice = await mutateAsync({
          id: invoiceValues.id,
          customerName: customer.data?.lastName,
          date: new Date(values.date),
          isPaid: invoiceValues.isPaid,
        });

        if (updateInvoice) {
          await deleteAllProductsInvoice();
          const invoiceId = updateInvoice.data && updateInvoice.data.id || 0;
          for (const product of values.products) {
            try {
              const productToSave = {
                invoiceId,
                quantity: product.quantity,
                productName: product.productName,
              };
              await productInvoiceMutateAsync(productToSave);
            } catch (error) {
              console.error('Failed to save product', error);
            }
          }


          await refetch();
          toast.success("Facture modifiée avec succès !");
          onClose();
        }

      } catch (error) {
        // Handle error
      }
    },
  });


  return (
    <form onSubmit={formik.handleSubmit} className="text-center">
      <div style={{ height: "80vh" }} className="relative flex gap-2">
        <div className="flex w-2/5 flex-col gap-6 border-r-2 px-3">
          <div className="flex items-center justify-center rounded-lg bg-secondary p-5 italic text-white">
            Informations générales
          </div>
          <div className="">
            <label htmlFor="customerId" className="block text-gray-700">
              Client :
            </label>
            <Select
              id="customerName"
              name="customerName"
              options={customerOptions}
              
              defaultValue={customerOptions && customerOptions.find((option) => option.label === customer.data?.lastName)}
              className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500"
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onChange={(option) =>
                formik.setFieldValue("customerName", option?.label)
              }
              isSearchable
            />
          </div>
          <div className="">
            <label htmlFor="date" className="block text-gray-700">
              Date :
            </label>
            <input
              id="date"
              name="date"
              type="date"
              onChange={formik.handleChange}
              value={formik.values.date}
              className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="flex w-3/5 flex-col gap-4">
          <div className="flex items-center justify-center rounded-lg bg-secondary p-5 italic text-white">
            Ajouter des produits
          </div>
          <div style={{ height: "80%" }} className="overflow-y-scroll">
            {formik.values.products.map((product, index) => (
              <div key={index} className="mb-4 flex gap-3">
                <div>
                  <Select
                    id={`products[${index}].productName`}
                    name={`products[${index}].productName`}
                    options={productOptions}
                    className="w-full w-80 rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500"
                    defaultValue={productOptions && productOptions.find((option) => option.label === product.productName)}
                    // eslint-disable-next-line @typescript-eslint/no-misused-promises
                    onChange={(option) =>
                      formik.setFieldValue(`products[${index}].productName`, option?.label)
                    }
                    isSearchable
                  />
                </div>
                <div>
                  <input
                    id={`products[${index}].quantity`}
                    name={`products[${index}].quantity`}
                    type="number"
                    placeholder="Quantité"
                    onChange={formik.handleChange}
                    value={product.quantity}
                    className="w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500"
                  />
                </div>
                <div>
                  <button
                    type="button"
                    onClick={() => removeProduct(index)}
                    className="rounded-lg bg-red-500 px-2 py-1 font-semibold text-white"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addProduct}
            className="absolute bottom-0 right-1 mb-4 flex w-24 w-full items-center justify-center rounded-lg bg-primary px-4 py-2 font-semibold text-white"
          >
            <HiPlus></HiPlus>
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-contrast px-4 py-2 font-semibold text-white hover:bg-primary"
      >
        Modifier la facture
      </button>
    </form>
  );
};
