import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertScreeningSchema } from "@shared/schema";

export async function registerRoutes(app: Express) {
  app.post("/api/screening", async (req, res) => {
    try {
      const data = insertScreeningSchema.parse(req.body);
      const result = await storage.createScreening(data);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: "Invalid screening data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
