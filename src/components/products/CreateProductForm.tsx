"use client";

import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { type RouterInputs } from "@/trpc/shared";
import { useState } from "react";
import { useToast } from "../ui/use-toast";

const defaultForm: RouterInputs["product"]["create"] = {
  name: "",
  price: 0,
  stock: 0,
};

export default function CreateProductForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState(defaultForm);

  const createProduct = api.product.create.useMutation({
    onSuccess: () => {
      setFormData(defaultForm);
      router.refresh();
      toast({
        title: "Producto creado",
      });
    },
  });
  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        createProduct.mutate(formData);
      }}
    >
      <Input
        className="h-10 rounded-lg border-2 border-gray-300 bg-white px-5 text-sm focus:outline-none"
        name="name"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Nombre del producto"
        type="text"
        value={formData.name}
      />

      <Input
        className="h-10 rounded-lg border-2 border-gray-300 bg-white px-5 text-sm focus:outline-none"
        name="price"
        onChange={(e) =>
          setFormData({ ...formData, price: parseInt(e.target.value) })
        }
        placeholder="Precio"
        type="number"
        value={formData.price}
      />
      <Input
        className="h-10 rounded-lg border-2 border-gray-300 bg-white px-5 text-sm focus:outline-none"
        name="stock"
        onChange={(e) =>
          setFormData({ ...formData, stock: parseInt(e.target.value) })
        }
        placeholder="Cantidad"
        type="number"
        value={formData.stock}
      />
      {createProduct.error && (
        <div className="text-sm text-red-500">
          {" "}
          {createProduct.error.message}
        </div>
      )}
      <Button type="submit" disabled={createProduct.isLoading}>
        Crear
      </Button>
    </form>
  );
}
