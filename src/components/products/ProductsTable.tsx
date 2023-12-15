import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";

import { api } from "@/trpc/server";
import ProductsTableItem from "./ProductsTableItem";
import { Suspense } from "react";

export default function ProductsTable() {
  return (
    <Table className="w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Nombre del producto</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Cantidad</TableHead>
          <TableHead className="text-center">Acciones</TableHead>
        </TableRow>
      </TableHeader>

      <Suspense fallback={<ProductsTableSkeleton />}>
        <ProductsTableData />
      </Suspense>
    </Table>
  );
}

async function ProductsTableData() {
  const products = await api.product.list.query();

  return (
    <TableBody>
      {products.map((product) => (
        <ProductsTableItem key={product.id} product={product} />
      ))}
    </TableBody>
  );
}

function ProductsTableSkeleton() {
  return (
    <TableBody>
      <TableRow>
        <TableCell colSpan={5} className="text-center">
          Loading...
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
