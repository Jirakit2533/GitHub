import { Schema as S } from "effect"
import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import { resolver } from "hono-openapi/effect"

const responseSchema = S.Struct({
  message: S.Literal("Ok"),
})

const doc = describeRoute({
  description: "Are we healthy?",
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(responseSchema),
        },
      },
      description: "Healthy",
    },
  },
})

const healthzApp = new Hono()

healthzApp.get("/", doc, (c) => {
  return c.json({
    message: "Ok",
  }, 200)
})

export default healthzApp
