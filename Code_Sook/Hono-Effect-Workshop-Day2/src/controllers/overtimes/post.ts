import { Console, Effect } from "effect"
import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import { resolver, validator } from "hono-openapi/effect"
import { ServicesRuntime } from "../../runtimes/index.js"
import { Helpers, OvertimeSchema } from "../../schema/index.js"
import { OvertimeServiceContext } from "../../services/overtime/index.js"

const createOvertimeResponseSchema = OvertimeSchema.Schema.omit("deletedAt")

const createOvertimeDocs = describeRoute({
  responses: {
    201: {
      content: {
        "application/json": {
          schema: resolver(createOvertimeResponseSchema),
        },
      },
      description: "Get Employee by EmployeeId",
    },
  },
  tags: ["Overtime"],
})

const createOvertimeValidateRequest = validator("json", OvertimeSchema.CreateSchema)

export function setupPosts() {
  const app = new Hono()

  app.post("/", createOvertimeDocs, createOvertimeValidateRequest, async (c) => {
    const body = c.req.valid("json")

    const parseResponse = Helpers.fromObjectToSchemaEffect(createOvertimeResponseSchema)

    const program = OvertimeServiceContext.pipe(
      Effect.tap(Effect.log("start create overtime")),
      Effect.andThen(svc => svc.create(body)),
      Effect.andThen(parseResponse),
      Effect.andThen(data => c.json(data, 201)),
      Effect.tapError(Console.log),
      Effect.orElseSucceed(() => c.json({ message: "create overtime error" }, 500)),
      Effect.tap(Effect.log("end create overtime")),
      Effect.withSpan("POST /.create.overtime.controller"),
    )

    const result = await ServicesRuntime.runPromise(program)
    return result
  })

  return app
}
