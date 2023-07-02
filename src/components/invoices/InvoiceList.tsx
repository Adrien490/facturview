import { Invoice } from "@prisma/client";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { jsPDF } from "jspdf";
import React, { useEffect, useState, type Key } from "react";
import { listVariants } from "~/hooks/useAnimation";
import { api } from "~/utils/api";
import { InvoiceDeleteButton } from "./InvoiceDeleteButton";
import { InvoicePDFButton } from "./InvoicePDFButton";
import { InvoiceUpdateButton } from "./InvoiceUpdateButton";
import MarkAsPaidButton from "./MarkAsPaidButton";
import MarkAsUnpaidButton from "./MarkAsUnPaidButton";


export const InvoiceList = () => {
  const {
    data: invoices,
    isLoading,
    refetch,
  } = api.invoices.getAll.useQuery();
  const { mutateAsync, isLoading: isDeleting } =
    api.invoices.deleteById.useMutation();

    const generatePDF = (invoice: Invoice) => {
      const doc = new jsPDF();
      let y = 10;
    
      // Ajoutez les détails de la facture au PDF
      doc.text(`Facture pour ${invoice.customerName}`, 10, y);
      y += 10;
      doc.text(`Date : ${dayjs(invoice.date).format('DD/MM/YYYY')}`, 10, y);
      y += 10;
      doc.text(`Total : ${invoice.total}`, 10, y);
      y += 10;
      doc.text(`Payée : ${invoice.isPaid ? 'Oui' : 'Non'}`, 10, y);
      y += 10;
    
      // Ajoutez la liste des produits au PDF
      doc.text('Produits :', 10, y);
      y += 10;
      invoice.productInvoices.forEach((productInvoice, index) => {
        const { product, quantity } = productInvoice;
        const totalProductPrice = product.price * quantity; // Calculer le prix total pour ce produit
        doc.text(`${index+1}. ${product.name} - Quantité : ${quantity} - Total : ${totalProductPrice}`, 10, y);
        y += 10;
      });
    
      // Ceci téléchargera automatiquement le PDF
      doc.save(`facture_${invoice.id}.pdf`);
    }
    
  

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
              <div className="w-1/5">{invoice.isPaid ? <MarkAsUnpaidButton invoiceId={invoice.id}></MarkAsUnpaidButton>: <MarkAsPaidButton invoiceId={invoice.id}></MarkAsPaidButton>}</div>
              <div className="w-1/5 p-2 flex gap-2 justify-center">
              {invoice.total}
              </div>
              <div className="w-1/5 justify-end p-2 flex gap-2 justify-end">
              <InvoiceDeleteButton handleDelete={handleDelete} id={invoice.id}></InvoiceDeleteButton>
              <InvoicePDFButton invoice={invoice} generatePDF={() => generatePDF(invoice)}></InvoicePDFButton>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
      
    </>
  );
};
