import React from 'react';
import { api } from '~/utils/api';
// Remplacez par le chemin de votre fichier api

interface MarkAsPaidButtonProps {
    invoiceId: number;
}

function MarkAsPaidButton({ invoiceId }: MarkAsPaidButtonProps) {
    const {
        refetch
      } = api.invoices.getAll.useQuery();
    const markAsPaidMutation = api.invoices.markAsPaid.useMutation();
    const handleMarkAsPaid = () => {
        const markAsPaid = async () => {
            try {
                await markAsPaidMutation.mutateAsync({ id: invoiceId });
                await refetch();
            } catch (error) {
                console.error(error);
            }
        };
        void markAsPaid()
    }

    return (
        <button onClick={handleMarkAsPaid} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Marquer comme payée
        </button>
    );
}

export default MarkAsPaidButton;
