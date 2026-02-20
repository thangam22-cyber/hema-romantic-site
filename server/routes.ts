import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Passwords hardcoded as per the "romantic website" request to keep it simple and immutable
  const PASSWORDS = {
    main: "22/2k06/11",
    birthday: "03.01.2024"
  };

  app.post(api.verify.path, (req, res) => {
    try {
      const { type, password } = api.verify.input.parse(req.body);
      
      const expected = PASSWORDS[type];
      const success = password === expected;
      
      // Add a small artificial delay for dramatic effect
      setTimeout(() => {
        res.json({ success });
      }, 500);
      
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({ success: false });
        return;
      }
      res.status(500).json({ success: false });
    }
  });

  return httpServer;
}
