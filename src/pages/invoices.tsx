import { InvoiceCreateButton } from "~/components/invoices/InvoiceCreateButton";
import { InvoiceList } from "~/components/invoices/InvoiceList";
import { Navbar } from "~/components/shared/navbar/Navbar";

export default function Invoices(){
    
    return (
        <>
        <Navbar></Navbar>
        <main className="container mx-auto flex flex-col gap-8 py-8">
          <div className="flex gap-3">
            <InvoiceCreateButton></InvoiceCreateButton>
          </div>
          <div className="flex flex-col text-center shadow-xl">
            <div className="flex flex-row border-b border-secondary bg-contrast text-white rounded-lg p-3 font-bold">
              <div className="w-1/5 p-2">Client</div>
              <div className="w-1/5 p-2">Date</div>
              <div className="w-1/5 p-2">Payée</div>
              <div className="w-1/5 p-2">Total (€)</div>
              <div className="w-1/5 p-2"></div>
            </div>
            <InvoiceList></InvoiceList>
          </div>
        </main>
      </>
    )
}