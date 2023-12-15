import { relations, sql } from "drizzle-orm";
import {
  bigint,
  index,
  mysqlTableCreator,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";

import { createInsertSchema, createSelectSchema } from "drizzle-zod";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const mysqlTable = mysqlTableCreator((name) => `dialu_${name}`);

export const posts = mysqlTable(
  "post",
  {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    createdAt: timestamp("created_at")
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updatedAt").onUpdateNow(),
  },
  (example) => ({
    nameIndex: index("name_idx").on(example.name),
  }),
);

export const insertPostSchema = createInsertSchema(posts);
export const postSchema = createSelectSchema(posts);

// Dialu models

// USER //

export const users = mysqlTable(
  "user",
  {
    id: varchar("id", { length: 256 }).primaryKey(), // matches clerk user id
    email: varchar("email", { length: 256 }),
  },
  (table) => {
    return {
      emailIdx: uniqueIndex("email_idx").on(table.email),
    };
  },
);

export const userRelaations = relations(users, ({ one }) => ({
  store: one(store),
}));

export const insertUserSchema = createInsertSchema(users);
export const userSchema = createSelectSchema(users);

// STORE

export const store = mysqlTable("store", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }).notNull(),

  owner_id: varchar("owner_id", { length: 256 }).notNull(),

  createdAt: timestamp("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const storeRelations = relations(store, ({ one, many }) => ({
  owner: one(users, {
    fields: [store.owner_id],
    references: [users.id],
  }),

  products: many(product),
}));

export const insertStoreSchema = createInsertSchema(store);

// PRODUCT
export const product = mysqlTable("product", {
  id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 256 }),
  store_id: bigint("store_id", { mode: "number" }).notNull(),

  price: bigint("price", { mode: "number" }).notNull(),

  stock: bigint("stock", { mode: "number" }).notNull(),

  image_url: varchar("image_url", { length: 256 }),
});

export const productRelations = relations(product, ({ one }) => ({
  store: one(store, {
    fields: [product.store_id],
    references: [store.id],
  }),
}));

export const insertProductSchema = createInsertSchema(product, {
  image_url: (schema) => schema.image_url.url(),
  store_id: (schema) => schema.store_id.optional(),
  name: (schema) => schema.name.min(3),
  stock: (schema) => schema.stock.min(1),
});

export const productSchema = createSelectSchema(product);
