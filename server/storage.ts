import { proposals, type Proposal, type InsertProposal } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";

export interface IStorage {
  createProposal(proposal: InsertProposal): Promise<Proposal>;
  getProposal(id: string): Promise<Proposal | undefined>;
  acceptProposal(id: string): Promise<Proposal | undefined>;
}

export class DatabaseStorage implements IStorage {
  async createProposal(insertProposal: InsertProposal): Promise<Proposal> {
    const id = nanoid(8); // Generate 8-char ID
    const [proposal] = await db
      .insert(proposals)
      .values({ ...insertProposal, id })
      .returning();
    return proposal;
  }

  async getProposal(id: string): Promise<Proposal | undefined> {
    const [proposal] = await db.select().from(proposals).where(eq(proposals.id, id));
    return proposal;
  }

  async acceptProposal(id: string): Promise<Proposal | undefined> {
    const [proposal] = await db
      .update(proposals)
      .set({ 
        accepted: true, 
        acceptedAt: new Date() 
      })
      .where(eq(proposals.id, id))
      .returning();
    return proposal;
  }
}

export const storage = new DatabaseStorage();
