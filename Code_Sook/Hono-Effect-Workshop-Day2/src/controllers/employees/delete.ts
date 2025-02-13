import { Effect } from "effect"
import * as S from "effect/Schema"
import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import { resolver, validator } from "hono-openapi/effect"
import { ServicesRuntime } from "../../runtimes/index.js"
import { Branded, EmployeeSchema, Helpers } from "../../schema/index.js"
import { EmployeeServiceContext } from "../../services/employee/index.js"

const deleteEmployeResponseSchema = EmployeeSchema.Schema.omit("deletedAt")

const deleteEmployeeDocs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(deleteEmployeResponseSchema),
        },
      },
      description: "Get Employee by EmployeeId",
    },
  },
  tags: ["Employee"],
})

const validateDeleteEmployeeRequest = validator("param", S.Struct({
  employeeId: Branded.EmployeeIdFromString,
}))

export function setupRoutes() {
  const app = new Hono()

  app.delete("/:employeeId", deleteEmployeeDocs, validateDeleteEmployeeRequest, async (c) => {
    const { employeeId } = c.req.valid("param")

    const parseResponse = Helpers.fromObjectToSchemaEffect(deleteEmployeResponseSchema)

    const program = EmployeeServiceContext.pipe(
      Effect.andThen(svc => svc.removeById(employeeId)),
      Effect.andThen(parseResponse),
      Effect.andThen(data => c.json(data, 200)),
      Effect.orElseSucceed(() => c.json({ message: "delete failed" }, 500)),
      Effect.withSpan("DELETE /:employeeId.employee.controller"),
    )

    const result = await ServicesRuntime.runPromise(program)

    return result
  })

  return app
}
