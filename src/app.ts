import express from "express";

import { database } from "./config/database.js"

export const app = express();

app.use(express.json());

app.get("/health", (_request, response) => {
  response.status(200).json({ status: "ok" });
});

app.get("/ready", (async(_request, response) => {
  try {
    await database.query("SELECT 1");

    response.status(200).json({
      status: "ready",
      database: "connected",
    });
  } catch(error) {
    console.error("Database readiness check failed", error);

    response.status(503).json({
      status: "not_ready",
      database: "disconnected",
    })
  }
}));
