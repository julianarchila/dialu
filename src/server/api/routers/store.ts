import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { store, insertStoreSchema } from "@/server/db/schema";

export const storeRouter = createTRPCRouter({
  create: protectedProcedure
    .input(insertStoreSchema)
    .mutation(async ({ ctx, input }) => {
      console.log("New Post created by ", ctx.auth.user?.firstName);

      const user = ctx.auth.user!;

      await ctx.db.insert(store).values({
        name: input.name,
        owner_id: user.id,
      });
    }),
});
