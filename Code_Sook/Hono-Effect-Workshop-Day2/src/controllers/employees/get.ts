import { Effect } from "effect"
import * as S from "effect/Schema"
import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import { resolver, validator } from "hono-openapi/effect"
import { ServicesRuntime } from "../../runtimes/index.js"
import { Branded, EmployeeWithRelationsSchema, Helpers } from "../../schema/index.js"
import { EmployeeServiceContext } from "../../services/employee/index.js"

const getByIdResponseSchema = EmployeeWithRelationsSchema.Schema.omit("deletedAt")

const getByIdDocs = describeRoute({
  responses: {
    200: {
      content: {
        "application/json": {
          schema: resolver(getByIdResponseSchema),
        },
      },
      description: "Get Employee by EmployeeId",
    },
    404: {
      content: {
        "application/json": {
          schema: resolver(S.Struct({
            message: S.String,
          })),
        },
      },
      description: "Get Employee by EmployeeId not found",
    },
  },
  tags: ["Employee"],
})

const validateGetByIdRequest = validator("param", S.Struct({
  employeeId: Branded.EmployeeIdFromString,
}))

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
    500: {
      content: {
        "application/json": {
          schema: resolver(S.Struct({
            message: S.String,
          })),
        },
      },
      description: "Get Employees Error",
    },
  },
  tags: ["Employee"],
})

export function setupEmployeeGetRoutes() {
  const app = new Hono()

  app.get("/:employeeId", getByIdDocs, validateGetByIdRequest, async (c) => {
    const { employeeId } = c.req.valid("param")

    const parseResponse = Helpers.fromObjectToSchemaEffect(getByIdResponseSchema)

    const program = EmployeeServiceContext.pipe(
      Effect.andThen(svc => svc.findOneById(employeeId)),
      Effect.andThen(parseResponse),
      Effect.andThen(data => c.json(data, 200)),
      Effect.catchTags({
        FindEmployeeByIdError: () => Effect.succeed(c.json({ message: "findOneById error" }, 500)),
        NoSuchElementException: () => Effect.succeed(c.json({ message: "not found employee for id" }, 404)),
        ParseError: () => Effect.succeed(c.json({ message: "findOneById error" }, 500)),
      }),
      Effect.withSpan("GET /:employeeId.employee.controller"),
    )

    const result = await ServicesRuntime.runPromise(program)
    return result
  })

  app.get("/", getManyDocs, async (c) => {
    const parseResponse = Helpers.fromObjectToSchemaEffect(getManyResponseSchema)

    const program = EmployeeServiceContext.pipe(
      //    ^? Effect.Effect<..., never, EmployeeServiceContext>
      Effect.tap(() => Effect.log("start finding many employees")),
      Effect.andThen(svc => svc.findMany()),
      Effect.andThen(parseResponse),
      Effect.andThen(data => c.json(data, 200)),
      Effect.tap(() => Effect.log("test")),
      Effect.catchTags({
        FindManyEmployeeError: () => Effect.succeed(c.json({ message: "find many error" }, 500)),
        ParseError: () => Effect.succeed(c.json({ message: "parse error" }, 500)),
      }),
      Effect.annotateLogs({ key: "annotate" }),
      Effect.withLogSpan("test"),
      Effect.withSpan("GET /.employee.controller /"),
    )

    const result = await ServicesRuntime.runPromise(program)
    return result
  })

  return app
}
