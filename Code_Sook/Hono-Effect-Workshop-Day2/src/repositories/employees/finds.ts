import type { PrismaClient } from "@prisma/client"
import type { EmployeeRepository } from "../../types/repositories/employee.js"
import { Effect } from "effect"
import { EmployeeSchema, EmployeeWithRelationsSchema, Helpers } from "../../schema/index.js"
import * as Errors from "../../types/errors/employee-errors.js"

export function findMany(prismaClient: PrismaClient): EmployeeRepository["findMany"] {
  return () => Effect.tryPromise({
    catch: Errors.FindManyEmployeeError.new(),
    try: () => prismaClient.employee.findMany({
      where: {
        deletedAt: null,
      },
    }),
  }).pipe(
    Effect.andThen(Helpers.fromObjectToSchema(EmployeeSchema.SchemaArray)),
    Effect.withSpan("find-many.employee.repository"),
  )
}

export function findManyWithRelations(prismaClient: PrismaClient): EmployeeRepository["findManyWithRelations"] {
  return () => Effect.tryPromise({
    catch: Errors.FindManyEmployeeError.new(),
    try: () => prismaClient.employee.findMany({
      include: {
        overtimes: true,
      },
      where: {
        deletedAt: null,
      },
    }),
  }).pipe(
    Effect.andThen(Helpers.fromObjectToSchema(EmployeeWithRelationsSchema.SchemaArray)),
    Effect.withSpan("find-many-with-relations.employee.repository"),
  )
}

export function findById(prismaClient: PrismaClient): EmployeeRepository["findById"] {
  return id => Effect.tryPromise({
    catch: Errors.FindEmployeeByIdError.new(),
    try: () => prismaClient.employee.findUnique({
      where: {
        deletedAt: null,
        id,
      },
    }),
  }).pipe(
    Effect.andThen(Effect.fromNullable),
    Effect.andThen(Helpers.fromObjectToSchema(EmployeeSchema.Schema)),
    Effect.withSpan("find-by-id.employee.repository"),
  )
}

export function findByIdWithRelations(prismaClient: PrismaClient): EmployeeRepository["findByIdWithRelations"] {
  return id => Effect.tryPromise({
    catch: Errors.FindEmployeeByIdError.new(),
    try: () => prismaClient.employee.findUnique({
      include: {
        overtimes: true,
      },
      where: {
        deletedAt: null,
        id,
      },
    }),
  }).pipe(
    Effect.andThen(Effect.fromNullable),
    Effect.andThen(Helpers.fromObjectToSchemaEffect(EmployeeWithRelationsSchema.Schema)),
    Effect.withSpan("find-by-id-with-relations.employee.repository"),
  )
}
