import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { product, insertProductSchema } from "@/server/db/schema";
import { TRPCError } from "@trpc/server";

import { eq } from "drizzle-orm";

import * as z from "zod";

export const productRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertProductSchema)
    .mutation(async ({ ctx, input }) => {
      console.log("New Post created by ", ctx.auth.user?.firstName);

      // get user store
      const userStore = await ctx.db.query.store.findFirst({
        where: (t, { eq }) => eq(t.owner_id, ctx.auth.userId!),
      });

      if (!userStore) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      try {
        await ctx.db.insert(product).values({
          name: input.name,
          description: input.description,
          store_id: userStore.id,
          price: input.price,
          stock: input.stock,
          image_url: input.image_url,
        });
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),

  list: protectedProcedure.query(async ({ ctx }) => {
    // get user store
    const userStore = await ctx.db.query.store.findFirst({
      where: (t, { eq }) => eq(t.owner_id, ctx.auth.userId!),
    });
    if (!userStore) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    const products = await ctx.db.query.product.findMany({
      where: (t, { eq }) => eq(t.store_id, userStore.id!),
    });
    return products;
  }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.transaction(async (tx) => {
        // get user store
        const userStore = await tx.query.store.findFirst({
          where: (t, { eq }) => eq(t.owner_id, ctx.auth.userId!),
        });

        if (!userStore) {
          tx.rollback();
          throw new TRPCError({ code: "NOT_FOUND" });
        }

        // check if product belongs to user store
        const prd = await tx.query.product.findFirst({
          where: (t, { eq, and }) =>
            and(eq(t.id, input.id), eq(t.store_id, userStore.id!)),
        });

        if (!prd) {
          tx.rollback();
          throw new TRPCError({ code: "NOT_FOUND" });
        }

        // delete product
        await tx.delete(product).where(eq(product.id, prd.id));
      });
    }),
});
