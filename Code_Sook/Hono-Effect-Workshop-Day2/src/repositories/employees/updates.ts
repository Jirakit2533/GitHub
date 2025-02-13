import type { PrismaClient } from "@prisma/client"
import type { EmployeeRepository } from "../../types/repositories/employee.js"
import { Effect } from "effect"
import { EmployeeSchema, Helpers } from "../../schema/index.js"
import * as Errors from "../../types/errors/employee-errors.js"

export function update(prismaClient: PrismaClient): EmployeeRepository["update"] {
  return (id, data) => Effect.tryPromise({
    catch: Errors.UpdateEmployeeError.new(),
    try: () => prismaClient.employee.update({
      data,
      where: {
        deletedAt: null,
        id,
      },
    }),
  }).pipe(
    Effect.andThen(Helpers.fromObjectToSchema(EmployeeSchema.Schema)),
    Effect.withSpan("update.overtime.repository"),
  )
}

export function updatePartial(prismaClient: PrismaClient): EmployeeRepository["updatePartial"] {
  return (id, data) => Effect.tryPromise({
    catch: Errors.UpdateEmployeeError.new(),
    try: () => prismaClient.employee.update({
      data,
      where: {
        deletedAt: null,
        id,
      },
    }),

  }).pipe(
    Effect.andThen(Helpers.fromObjectToSchema(EmployeeSchema.Schema)),
    Effect.withSpan("update-partial.overtime.repository"),
  )
}
