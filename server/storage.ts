import { db } from "./db";
import { secrets, type InsertSecret, type Secret } from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  // We don't really need dynamic storage for this app, but adhering to the interface pattern
  getSecret(key: string): Promise<Secret | undefined>;
}

export class DatabaseStorage implements IStorage {
  async getSecret(key: string): Promise<Secret | undefined> {
    const [secret] = await db.select().from(secrets).where(eq(secrets.key, key));
    return secret;
  }
}

export const storage = new DatabaseStorage();
