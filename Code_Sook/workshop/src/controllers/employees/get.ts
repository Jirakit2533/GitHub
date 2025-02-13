import * as S from "effect/Schema"

import { EmployeeWithRelationsSchema, Helpers } from "../../schema/index.js"
import { resolver } from "hono-openapi/effect"
import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import type { EmployeeService } from "../../types/services/employee.js"

const getManyResponseSchema = S.Array(EmployeeWithRelationsSchema.Schema.omit("deletedAt"))

const getManyDocs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(getManyResponseSchema),
        },
      },
      description: "Get Employees",
    },
  },
  tags: ["Employee"],
})

export function setupEmployeeGetRoutes(employeeService: EmployeeService) {
  const app = new Hono()

  app.get("/", getManyDocs, async (c) => {
    const employees = await employeeService.findMany()
    return c.json(Helpers.fromObjectToSchema(getManyResponseSchema)(employees), 200)
  })

  return app
}