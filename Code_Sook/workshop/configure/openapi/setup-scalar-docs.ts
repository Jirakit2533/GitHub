import { apiReference } from "@scalar/hono-api-reference"
import { Hono } from "hono"

export function setupScalarDocs() {
  const app = new Hono()

  app.get("/", apiReference({
    darkMode: true,
    layout: "modern", // "classic" | "modern" (default)
    pageTitle: "Hono Overtime Tracking API Reference",
    spec: {
      url: "/openapi.json",
    },
    theme: "deepSpace",
  }))

  return app
}