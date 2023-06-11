import { ProductCreateButton } from "~/components/products/ProductCreateButton";
import { ProductList } from "~/components/products/ProductList";
import { Navbar } from "~/components/shared/navbar/Navbar";

export default function Products() {
  return (
    <>
      <Navbar></Navbar>
      <main className="container mx-auto flex flex-col gap-8 py-8">
        <div className="flex gap-3">
          <ProductCreateButton></ProductCreateButton>
        </div>
        <div className="flex flex-col text-center shadow-xl">
          <div className="flex flex-row border-b border-secondary bg-contrast text-white rounded-lg p-3 font-bold">
            <div className="w-1/4 p-2">Nom</div>
            <div className="w-1/4 p-2">Stock</div>
            <div className="w-1/4 p-2">Prix</div>
            <div className="w-1/4 p-2"></div>
          </div>
          <ProductList></ProductList>
        </div>
      </main>
    </>
  );
}
