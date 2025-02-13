import { Effect } from "effect"
import * as S from "effect/Schema"
import { Hono } from "hono"
import { describeRoute } from "hono-openapi"
import { resolver, validator } from "hono-openapi/effect"
import { ServicesRuntime } from "../../runtimes/index.js"
import { Branded, EmployeeSchema, Helpers, OvertimeSchema, OvertimeWithRelationsSchema } from "../../schema/index.js"
import { EmployeeServiceContext } from "../../services/employee/index.js"
import { OvertimeServiceContext } from "../../services/overtime/index.js"

export function setupGet() {
  const app = new Hono()

  const getManyResponseSchema = S.Array(OvertimeWithRelationsSchema.Schema.omit("deletedAt"))

  const getManyDocs = describeRoute({
    responses: {
      200: {
        content: {
          "application/json": {
            schema: resolver(getManyResponseSchema),
          },
        },
        description: "Get Overtimes Ok",
      },
      500: {
        content: {
          "application/json": {
            schema: resolver(S.Struct({
              message: S.String,
            })),
          },
        },
        description: "Get Overtimes error",
      },
    },
    tags: ["Overtime"],
  })

  app.get("/", getManyDocs, async (c) => {
    const parseResponse = Helpers.fromObjectToSchemaEffect(getManyResponseSchema)

    const program = OvertimeServiceContext.pipe(
      Effect.andThen(svc => svc.findMany()),
      Effect.andThen(parseResponse),
      Effect.andThen(data => c.json(data, 200)),
      Effect.orElseSucceed(() => c.json({ message: "find overtime error" }, 500)),
      Effect.withSpan("GET /.get-many.overtime.controller"),
    )

    const result = await ServicesRuntime.runPromise(program)

    return result
  })

  const getByIdResponseSchema = OvertimeWithRelationsSchema.Schema.omit("deletedAt")

  const getByIdDocs = describeRoute({
    responses: {
      200: {
        content: {
          "application/json": {
            schema: resolver(getByIdResponseSchema),
          },
        },
        description: "Get Overtime by OvertimeId",
      },
      404: {
        content: {
          "application/json": {
            schema: resolver(S.Struct({
              message: S.Literal("Not Found").pipe(S.optional, S.withConstructorDefault(() => "Not Found" as const)),
            })),
          },
        },
        description: "Overtime Not Found",
      },
      500: {
        content: {
          "application/json": {
            schema: resolver(S.Struct({
              message: S.String,
            })),
          },
        },
        description: "Get Overtimes by Id error",
      },
    },
    tags: ["Overtime"],
  })

  const validateGetByIdRequest = validator("param", S.Struct({
    overtimeId: Branded.OvertimeIdFromString,
  }))

  app.get("/:overtimeId", getByIdDocs, validateGetByIdRequest, async (c) => {
    const { overtimeId } = c.req.valid("param")

    const parseResponse = Helpers.fromObjectToSchemaEffect(getByIdResponseSchema)

    const program = OvertimeServiceContext.pipe(
      Effect.andThen(svc => svc.findById(overtimeId)),
      Effect.andThen(parseResponse),
      Effect.andThen(data => c.json(data, 200)),
      Effect.catchTags({
        NoSuchElementException: () => Effect.succeed(c.json({ message: "Not Found" }, 404)),
      }),
      Effect.orElseSucceed(() => c.json({ message: "find overtime by id error" }, 500)),
      Effect.withSpan("GET /:overtimeId.overtime.controller"),
    )

    const result = await ServicesRuntime.runPromise(program)
    return result
  })

  const getOvertimeByEmployeeIdResponseSchema = OvertimeSchema.SchemaArray

  const getOvertimeByEmployeeIdDoc = describeRoute({
    responses: {
      200: {
        content: {
          "application/json": {
            schema: resolver(getOvertimeByEmployeeIdResponseSchema),
          },
        },
        description: "Get Overtime by EmployeeId",
      },
      404: {
        content: {
          "application/json": {
            schema: resolver(getOvertimeByEmployeeIdResponseSchema),
          },
        },
        description: "Get Overtime by EmployeeId not found",
      },
      500: {
        content: {
          "application/json": {
            schema: resolver(getOvertimeByEmployeeIdResponseSchema),
          },
        },
        description: "Get Overtime by EmployeeId error",
      },
    },
    tags: ["Overtime"],
  })

  const getOvertimeByEmployeeIdValidateRequest = validator("param", S.Struct({
    employeeId: Branded.EmployeeIdFromString,
  }))

  app.get("/employees/:employeeId", getOvertimeByEmployeeIdDoc, getOvertimeByEmployeeIdValidateRequest, async (c) => {
    const { employeeId } = c.req.valid("param")

    const parseResponse = Helpers.fromObjectToSchemaEffect(getOvertimeByEmployeeIdResponseSchema)

    const program = EmployeeServiceContext.pipe(
      Effect.andThen(svc => svc.findOneById(employeeId)),
      Effect.andThen(data => parseResponse(data.overtimes)),
      Effect.andThen(data => c.json(data, 200)),
      Effect.catchTags({
        NoSuchElementException: () => Effect.succeed(c.json({ message: "not found" }, 404)),
      }),
      Effect.orElseSucceed(() => c.json({ message: "find by employee ID error" }, 500)),
      Effect.withSpan("GET /employees/:employeeId.overtime.controller"),
    )
    const result = await ServicesRuntime.runPromise(program)

    return result
  })

  const getOvertimeByDepartmentNameDoc = describeRoute({
    responses: {
      200: {
        content: {
          "application/json": {
            schema: resolver(getOvertimeByEmployeeIdResponseSchema),
          },
        },
        description: "Get Overtime by Deparment name",
      },
      500: {
        content: {
          "application/json": {
            schema: resolver(getOvertimeByEmployeeIdResponseSchema),
          },
        },
        description: "Get Overtime by deparment name error",
      },
    },
    tags: ["Overtime"],
  })

  const getOvertimeByDepartmentNameValidateRequest = validator("param", S.Struct({
    department: EmployeeSchema.Schema.fields.department,
  }))

  app.get("/department/:department", getOvertimeByDepartmentNameDoc, getOvertimeByDepartmentNameValidateRequest, async (c) => {
    const { department } = c.req.valid("param")

    const parseResponse = Helpers.fromObjectToSchemaEffect(getOvertimeByEmployeeIdResponseSchema)
    const program = OvertimeServiceContext.pipe(
      Effect.andThen(svc => svc.findByDepartmentName(department)),
      Effect.andThen(parseResponse),
      Effect.andThen(data => c.json(data, 200)),
      Effect.orElseSucceed(() => c.json({ message: "find by department name error" }, 500)),
      Effect.withSpan("GET /department/:department.overtime.controller"),
    )
    const result = await ServicesRuntime.runPromise(program)
    return result
  })

  const summaryResponseSchema = S.Struct({
    hoursWorked: S.Number.annotations({ jsonSchema: { example: 8.5, type: "number" } }),
  })

  const overtimeSummaryForEmployeeDoc = describeRoute({
    responses: {
      200: {
        content: {
          "application/json": {
            schema: resolver(summaryResponseSchema),
          },
        },
        description: "Get summary Overtime by EmployeeId",
      },
      500: {
        content: {
          "application/json": {
            schema: resolver(summaryResponseSchema),
          },
        },
        description: "Get summary Overtime by EmployeeId error",
      },
    },
    tags: ["Overtime"],
  })

  const validateOvertimeSummaryByEmployeeIdRequest = {
    param: validator("param", S.Struct({
      employeeId: Branded.EmployeeIdFromString,
    })),
    query: validator("query", S.Struct({
      end: S.Date.annotations({ jsonSchema: { example: "2021-01-02", format: "date", type: "string" } }),
      start: S.Date.annotations({ jsonSchema: { example: "2021-01-01", format: "date", type: "string" } }),
    })),
  }

  app.get("/employees/:employeeId/summary", overtimeSummaryForEmployeeDoc, validateOvertimeSummaryByEmployeeIdRequest.param, validateOvertimeSummaryByEmployeeIdRequest.query, async (c) => {
    const { employeeId } = c.req.valid("param")
    const { end, start } = c.req.valid("query")

    const parseResponse = Helpers.fromObjectToSchemaEffect(summaryResponseSchema)

    const program = OvertimeServiceContext.pipe(
      Effect.andThen(svc => svc.summaryByEmployeeId({ dateRange: { end, start }, employeeId })),
      Effect.andThen(parseResponse),
      Effect.andThen(data => c.json(data, 200)),
      Effect.orElseSucceed(() => c.json({ message: "summary by employeeId error" }, 500)),
      Effect.withSpan("GET /employees/:employeeId/summary.overtime.controller"),
    )
    const result = await ServicesRuntime.runPromise(program)
    return result
  })

  const overtimeSummaryForDepartmentDoc = describeRoute({
    responses: {
      200: {
        content: {
          "application/json": {
            schema: resolver(summaryResponseSchema),
          },
        },
        description: "Get summary Overtime by Department",
      },
      500: {
        content: {
          "application/json": {
            schema: resolver(summaryResponseSchema),
          },
        },
        description: "Get summary Overtime by Department error",
      },
    },
    tags: ["Overtime"],
  })

  const validateOvertimeSummaryByDepartmentRequest = {
    param: validator("param", S.Struct({
      department: EmployeeSchema.Schema.fields.department,
    })),
    query: validator("query", S.Struct({
      end: S.Date.annotations({ jsonSchema: { example: "2021-01-02", format: "date", type: "string" } }),
      start: S.Date.annotations({ jsonSchema: { example: "2021-01-01", format: "date", type: "string" } }),
    })),
  }

  app.get("/department/:department/summary", overtimeSummaryForDepartmentDoc, validateOvertimeSummaryByDepartmentRequest.param, validateOvertimeSummaryByDepartmentRequest.query, async (c) => {
    const { department } = c.req.valid("param")
    const { end, start } = c.req.valid("query")

    const parseResponse = Helpers.fromObjectToSchemaEffect(summaryResponseSchema)

    const program = OvertimeServiceContext.pipe(
      Effect.andThen(svc => svc.summaryByDepartment({
        dateRange: {
          end,
          start,
        },
        department,
      })),
      Effect.andThen(parseResponse),
      Effect.andThen(data => c.json(data, 200)),
      Effect.orElseSucceed(() => c.json({ message: "summary by deparment name error" }, 200)),
      Effect.withSpan("GET /department/:department/summary.overtime.controller"),
    )

    const result = await ServicesRuntime.runPromise(program)
    return result
  })

  return app
}
