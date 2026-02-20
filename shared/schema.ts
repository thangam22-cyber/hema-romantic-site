import { pgTable, text, serial, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const secrets = pgTable("secrets", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(), // e.g., 'main_password', 'birthday_password'
  value: text("value").notNull(),
});

export const insertSecretSchema = createInsertSchema(secrets);
export type InsertSecret = z.infer<typeof insertSecretSchema>;
export type Secret = typeof secrets.$inferSelect;
