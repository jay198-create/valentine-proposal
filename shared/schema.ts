import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const proposals = pgTable("proposals", {
  id: text("id").primaryKey(), // 8-char unique ID
  yourName: text("your_name").notNull(),
  partnerName: text("partner_name").notNull(),
  phoneNumber: text("phone_number").notNull(), // WhatsApp number
  customMessage: text("custom_message").notNull(),
  accepted: boolean("accepted").default(false).notNull(),
  acceptedAt: timestamp("accepted_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertProposalSchema = createInsertSchema(proposals).omit({
  id: true,
  createdAt: true,
  accepted: true,
  acceptedAt: true
}).extend({
  phoneNumber: z.string().regex(/^\d{10,15}$/, "Phone number must be between 10 and 15 digits"),
  customMessage: z.string().optional().default("From the moment I met you, I knew you were special. Thank you for saying yes to being my Valentine. I promise to make this Valentine's Week 2026 unforgettable!"),
});

export type Proposal = typeof proposals.$inferSelect;
export type InsertProposal = z.infer<typeof insertProposalSchema>;
