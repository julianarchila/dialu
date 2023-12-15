"use client";
import { TableRow, TableCell } from "@/components/ui/table";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { type RouterOutputs } from "@/trpc/shared";
import { useToast } from "../ui/use-toast";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

interface Props {
  product: RouterOutputs["product"]["list"][number];
}

export default function ProductsTableItem({ product }: Props) {
  const { toast } = useToast();
  const router = useRouter();

  const deleteProduct = api.product.delete.useMutation({
    onSuccess: () => {
      router.refresh();
      toast({
        title: "Producto eliminado",
      });
    },

    onError: () => {
      toast({
        title: "Error al eliminar el producto",
        variant: "destructive",
      });
    },
  });

  return (
    <TableRow>
      <TableCell>
        <Link href="#">{product.name}</Link>
      </TableCell>
      <TableCell>${product.price}</TableCell>
      <TableCell>{product.stock}</TableCell>
      <TableCell className="flex justify-center gap-2">
        <Button variant="outline">Editar</Button>
        <Button
          onClick={() => {
            deleteProduct.mutate({ id: product.id });
          }}
          variant="destructive"
          disabled={deleteProduct.isLoading}
        >
          Eliminar
        </Button>
      </TableCell>
    </TableRow>
  );
}
