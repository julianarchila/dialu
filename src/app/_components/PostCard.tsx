"use client";
import { useRouter } from "next/navigation";
import { api } from "@/trpc/react";
import { type RouterOutputs } from "@/trpc/shared";

import { Button } from "@/components/ui/button";

export default function PostCard(
  item: RouterOutputs["post"]["getAll"][number],
) {
  const router = useRouter();

  const { mutate, isLoading } = api.post.deleteById.useMutation();

  return (
    <div className="flex items-center gap-3">
      <div>{item.name}</div>
      <Button
        disabled={isLoading}
        variant="destructive"
        onClick={() => {
          mutate({ id: item.id });
          router.refresh();
        }}
      >
        X
      </Button>
    </div>
  );
}
