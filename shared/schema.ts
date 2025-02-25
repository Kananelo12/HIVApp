import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const screenings = pgTable("screenings", {
  id: serial("id").primaryKey(),
  symptoms: text("symptoms").array().notNull(),
  riskFactors: text("risk_factors").array().notNull(),
  riskLevel: text("risk_level").notNull(),
  recommendations: text("recommendations").notNull(),
  severityAnalysis: text("severity_analysis").notNull(),
  severityScore: integer("severity_score").notNull(),
});

export const insertScreeningSchema = createInsertSchema(screenings).pick({
  symptoms: true,
  riskFactors: true,
  riskLevel: true,
  recommendations: true,
  severityAnalysis: true,
  severityScore: true,
});

export type InsertScreening = z.infer<typeof insertScreeningSchema>;
export type Screening = typeof screenings.$inferSelect;

export const symptomsList = [
  "Fever",
  "Chills",
  "Rash",
  "Night sweats",
  "Muscle aches",
  "Sore throat",
  "Fatigue",
  "Swollen lymph nodes",
  "Mouth ulcers"
] as const;

export const riskFactorsList = [
  "Unprotected sexual contact",
  "Multiple sexual partners",
  "Shared injection equipment",
  "Recent blood transfusion",
  "Occupational exposure"
] as const;

export type Symptom = typeof symptomsList[number];
export type RiskFactor = typeof riskFactorsList[number];