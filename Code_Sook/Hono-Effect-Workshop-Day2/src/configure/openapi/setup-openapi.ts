import type { Hono } from "hono"
import { openAPISpecs } from "hono-openapi"
import packageJson from "../../../package.json" with { type: "json" }

export function setupOpenApi(app: Hono) {
  app.get("/openapi.json", openAPISpecs(app, {
    documentation: {
      info: {
        description: "API for greeting users",
        title: "Hono",
        version: packageJson.version,
      },
      servers: [
        {
          description: "Local server",
          url: "http://localhost:3000",
        },
        {
          description: "Prod server",
          url: "https://api.app.com",
        },
      ],
    },
  }))
  return app
}
