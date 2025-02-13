import type { PrismaClient } from "@prisma/client"
import type { EmployeeRepository } from "../../types/repositories/employee.js"
import { Effect } from "effect"
import { EmployeeSchema, Helpers } from "../../schema/index.js"
import * as Errors from "../../types/errors/employee-errors.js"

export function remove(prismaClient: PrismaClient): EmployeeRepository["remove"] {
  return id => Effect.tryPromise({
    catch: Errors.RemoveEmployeeError.new(),
    try: () => prismaClient.employee.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id,
      },
    }),
  }).pipe(
    Effect.andThen(
      Helpers.fromObjectToSchema(EmployeeSchema.Schema),
    ),
    Effect.withSpan("remove.overtime.repository"),
  )
}

export function hardRemoveById(prismaClient: PrismaClient): EmployeeRepository["hardRemove"] {
  return id => Effect.tryPromise({
    catch: Errors.RemoveEmployeeError.new(),
    try: () => prismaClient.employee.delete({
      where: {
        id,
      },
    }),
  }).pipe(
    Effect.andThen(
      Helpers.fromObjectToSchema(EmployeeSchema.Schema),
    ),
    Effect.withSpan("hard-remove.overtime.repository"),
  )
}
