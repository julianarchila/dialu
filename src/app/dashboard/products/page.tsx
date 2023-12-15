import ProductsTable from "@/components/products/ProductsTable";
import CreateProductModal from "@/components/products/CreateProductModal";

export default function Products() {
  return (
    <div className="w-full p-6">
      <h1 className="mb-4 text-2xl font-bold">Manejo de inventario</h1>
      <div className="mb-4 flex items-center justify-end px-20">
        <input
          aria-label="Search Products"
          className="h-10 rounded-lg border-2 border-gray-300 bg-white px-5 text-sm focus:outline-none"
          name="search"
          placeholder="Buscar Productos"
          type="search"
        />
      </div>
      <ProductsTable />

      <CreateProductModal />
      {/* <div className="mt-6">
        <Button variant="default">Añadir Producto</Button>
      </div> */}
    </div>
  );
}
