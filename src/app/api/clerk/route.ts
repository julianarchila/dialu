import { type WebhookEvent } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import { Webhook } from "svix";

import { env } from "@/env.mjs";

import { db } from "@/server/db";
import { users, store } from "@/server/db/schema";

const webhookSecret = env.CLERK_WEBHOOK_SECRET;

async function validateRequest(request: Request) {
  const payloadString = await request.text();
  const headerPayload = headers();

  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id")!,
    "svix-timestamp": headerPayload.get("svix-timestamp")!,
    "svix-signature": headerPayload.get("svix-signature")!,
  };
  const wh = new Webhook(webhookSecret);
  return wh.verify(payloadString, svixHeaders) as WebhookEvent;
}

export async function POST(request: Request) {
  const payload = await validateRequest(request);
  console.log(payload);

  switch (payload.type) {
    case "user.updated":
      // Handle user updated event
      break;
    case "user.deleted":
      // Handle user deleted event
      console.log("Handling user deleted !!!!!!!!!!!");
      break;
    case "user.created":
      console.log("Handling user created !!!!!!!!!!!");
      console.log(payload.data.email_addresses);
      console.log(payload.data.primary_email_address_id);

      const primaryEmail = payload.data.email_addresses.find(
        (email) => email.id === payload.data.primary_email_address_id,
      );
      console.log(primaryEmail?.email_address);

      // return Response.json({ message: "Received" });

      const userId = payload.data.id;

      // Check if user exists in db
      const dbUser = await db.query.users.findFirst({
        where: (t, { eq }) => eq(t.id, userId),
      });

      // If not create user and store
      // This is temporary
      if (!dbUser) {
        await db
          .insert(users)
          .values({ id: userId, email: primaryEmail?.email_address ?? "" });
        await db.insert(store).values({
          name: `${payload.data.first_name}'s Store`,
          owner_id: userId,
        });
      }

      break;
    default:
      // Handle other events
      break;
  }

  return Response.json({ message: "Received" });
}

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1));
  return Response.json({ message: "Hello World!" });
}
