import { DynamicStructuredTool } from "langchain/tools";

import * as z from "zod";

import { db } from "@/server/db";

export const retrieveProducts = (storeId: number) =>
  new DynamicStructuredTool({
    name: "retrieveProducts",
    description: "Call this tool to retrieve all store products",
    func: async ({ limit }): Promise<string> => {
      const res = await db.query.product.findMany({
        limit: limit,
        where: (t, { eq }) => eq(t.store_id, storeId),
      });
      return JSON.stringify(res);
    },

    schema: z.object({
      limit: z.number().default(10),
    }),
  });
