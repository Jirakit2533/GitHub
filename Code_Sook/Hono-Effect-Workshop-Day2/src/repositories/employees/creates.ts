import type { PrismaClient } from "@prisma/client"
import type { ParseError } from "effect/ParseResult"
import type { EmployeeRepository } from "../../types/repositories/employee.js"
import { Effect } from "effect"
import { EmployeeSchema, Helpers } from "../../schema/index.js"
import * as Errors from "../../types/errors/employee-errors.js"
import PrismaClientContext from "../prisma.js"

// export function create(prismaClient: PrismaClient): EmployeeRepository["create"] {
//   return async (data) => {
//     const result = await prismaClient.employee.create({
//       data,
//     })
//     return Helpers.fromObjectToSchema(EmployeeSchema.Schema)(result)
//   }
// }

export function create(prismaClient: PrismaClient): EmployeeRepository["create"] {
  return data => Effect.tryPromise({
    catch: Errors.CreateEmployeeError.new(),
    try: () => prismaClient.employee.create({
      data,
    }),
  }).pipe(
    Effect.andThen(Helpers.fromObjectToSchemaEffect(EmployeeSchema.Schema)),
    Effect.withSpan("create.employee.repository"),
  )
}

export function create2(data: EmployeeSchema.CreateEmployeeEncoded): Effect.Effect<EmployeeSchema.Employee, Errors.CreateEmployeeError | ParseError, PrismaClientContext> {
  return PrismaClientContext.pipe(
    Effect.andThen(prismaClient => Effect.tryPromise({
      catch: Errors.CreateEmployeeError.new(),
      try: () => prismaClient.employee.create({
        data,
      }),
    })),
    Effect.andThen(Helpers.fromObjectToSchemaEffect(EmployeeSchema.Schema)),
    Effect.withSpan("create.employee.repository"),
  )
}
