import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertScreeningSchema } from "@shared/schema";
import { analyzeSeverity } from "./lib/openai";

export async function registerRoutes(app: Express) {
  app.post("/api/screening", async (req, res) => {
    try {
      const { symptoms, riskFactors, riskLevel, recommendations } = req.body;

      // Get AI-powered severity analysis
      const severityResult = await analyzeSeverity(symptoms, riskFactors);

      const data = insertScreeningSchema.parse({
        symptoms,
        riskFactors,
        riskLevel,
        recommendations,
        severityAnalysis: severityResult.analysis,
        severityScore: severityResult.score
      });

      const result = await storage.createScreening(data);
      res.json(result);
    } catch (error) {
      console.error("Screening error:", error);
      res.status(400).json({ error: "Invalid screening data" });
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const { message } = req.body;

      // For now, we'll implement some basic responses based on keywords
      let response = "";
      const lowerMessage = message.toLowerCase();

      if (lowerMessage.includes("hiv") || lowerMessage.includes("aids")) {
        response = "For HIV-related questions, I recommend taking our screening test and consulting with a healthcare provider. Would you like me to tell you more about HIV transmission, prevention, or testing?";
      } else if (lowerMessage.includes("test") || lowerMessage.includes("testing")) {
        response = "HIV testing is available at many healthcare facilities. You can find the nearest testing center using our Resources page. Would you like me to explain what happens during an HIV test?";
      } else if (lowerMessage.includes("symptom")) {
        response = "Common early HIV symptoms may include fever, chills, rash, night sweats, muscle aches, sore throat, fatigue, swollen lymph nodes, and mouth ulcers. However, these symptoms can be related to many other conditions. Would you like to use our screening tool to assess your risk?";
      } else if (lowerMessage.includes("prevent") || lowerMessage.includes("protection")) {
        response = "HIV prevention methods include using protection during sexual activity, not sharing needles, and considering PrEP (pre-exposure prophylaxis) if you're at high risk. Would you like more specific information about any of these prevention methods?";
      } else {
        response = "I can provide general information about HIV/AIDS, testing, prevention, and symptoms. For specific medical advice, please consult a healthcare provider. How can I help you learn more about these topics?";
      }

      res.json({ response });
    } catch (error) {
      res.status(500).json({ error: "Failed to process chat message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}