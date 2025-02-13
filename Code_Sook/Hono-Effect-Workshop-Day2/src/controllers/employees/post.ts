import { Duration, Effect, pipe, Schedule } from "effect"
import * as S from "effect/Schema"
import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import { resolver, validator } from "hono-openapi/effect"
import { ServicesRuntime } from "../../runtimes/index.js"
import { EmployeeSchema, Helpers } from "../../schema/index.js"
import { EmployeeServiceContext } from "../../services/employee/index.js"

const responseSchema = EmployeeSchema.Schema.omit("deletedAt")

const docs = describeRoute({
  responses: {
    201: {
      content: {
        "application/json": {
          schema: resolver(responseSchema),
        },
      },
      description: "Created Employee",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(S.Struct({
            message: S.String,
          })),
        },
      },
      description: "Created Employee",
    },
  },
  tags: ["Employee"],
  validateResponse: true,
})

const validateRequestBody = validator("json", EmployeeSchema.CreateSchema)

export function setupEmployeePostRoutes() {
  const app = new Hono()

  app.post("/", docs, validateRequestBody, async (c) => {
    const body = c.req.valid("json")

    const parseResponse = Helpers.fromObjectToSchemaEffect(responseSchema)

    const program = EmployeeServiceContext.pipe(
      Effect.andThen(svc => svc.create(body).pipe(
        Effect.retry(
          pipe(
            Schedule.recurs(3),
            Schedule.addDelay(() => Duration.seconds(10)),
          ),
        ),
      )),
      Effect.andThen(parseResponse),
      Effect.andThen(data => c.json(data, 201)),
      Effect.orElseSucceed(() => c.json({ message: "create failed" }, 500)),
      Effect.withSpan("POST /.employee.controller"),
    )

    const result = await ServicesRuntime.runPromise(program)
    return result
  })

  return app
}
