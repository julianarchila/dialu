import Link from "next/link";
import { db } from "@/server/db";
import { auth } from "@clerk/nextjs";
export default async function BotsPage() {
  const { userId } = auth();

  const store = await db.query.store.findFirst({
    where: (i, { eq }) => eq(i.owner_id, userId!),
  });
  if (!store) return <div>Store not found</div>;

  return <Link href={"/chat/agent/?store=" + store.id}>Chat</Link>;
}
