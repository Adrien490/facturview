import React from 'react';
import { api } from '~/utils/api';

interface MarkAsUnpaidButtonProps {
    invoiceId: number;
}

function MarkAsUnpaidButton({ invoiceId }: MarkAsUnpaidButtonProps) {
    const {
        refetch
      } = api.invoices.getAll.useQuery();
    const markAsUnpaidMutation = api.invoices.markAsUnpaid.useMutation();
    const handleMarkAsUnpaid = () => {
        const markAsUnpaid = async () => {
            try {
                await markAsUnpaidMutation.mutateAsync({ id: invoiceId });
                await refetch();
            } catch (error) {
                console.error(error);
            }
        };
        void markAsUnpaid()
    }

    return (
        <button onClick={handleMarkAsUnpaid} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Marquer comme non payée
        </button>
    );
}

export default MarkAsUnpaidButton;
