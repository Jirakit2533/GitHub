import { Effect } from "effect"
import * as S from "effect/Schema"
import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import { resolver, validator } from "hono-openapi/effect"
import { ServicesRuntime } from "../../runtimes/index.js"
import { Branded, EmployeeSchema, Helpers } from "../../schema/index.js"
import { EmployeeServiceContext } from "../../services/employee/index.js"

const updateEmployeeResponseSchema = EmployeeSchema.Schema.omit("deletedAt")

const updateEmployeeDocs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(updateEmployeeResponseSchema),
        },
      },
      description: "Update Employees",
    },
    500: {
      content: {
        "application/json": {
          schema: resolver(updateEmployeeResponseSchema),
        },
      },
      description: "Update Employees Error",
    },
  },
  tags: ["Employee"],
})

const validateUpdateEmployeeRequestBody = validator("json", EmployeeSchema.UpdateSchema)
const validateUpdateEmployeeRequestParam = validator("param", S.Struct({
  employeeId: Branded.EmployeeIdFromString,
}))

export function setupEmployeePutRoutes() {
  const app = new Hono()

  app.put("/:employeeId", updateEmployeeDocs, validateUpdateEmployeeRequestBody, validateUpdateEmployeeRequestParam, async (c) => {
    const data = c.req.valid("json")
    const { employeeId } = c.req.valid("param")

    const parseResponse = Helpers.fromSchemaToObjectEffect(updateEmployeeResponseSchema)

    const program = EmployeeServiceContext.pipe(
      Effect.andThen(svc => svc.update(employeeId, data)),
      Effect.andThen(parseResponse),
      Effect.andThen(data => c.json(data, 200)),
      Effect.orElseSucceed(() => c.json({ message: "update failed" }, 500)),
      Effect.withSpan("PUT /.employee.controller"),
    )

    const result = await ServicesRuntime.runPromise(program)

    return result
  })

  return app
}
