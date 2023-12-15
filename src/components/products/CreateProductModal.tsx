import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateProductForm from "./CreateProductForm";

export default function CreateProductModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Añadir Producto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Añadir Producto</DialogTitle>
          <DialogDescription>
            Añade un nuevo producto a tu inventario
          </DialogDescription>
        </DialogHeader>
        <CreateProductForm />
      </DialogContent>
    </Dialog>
  );
}
