import type { PrismaClient } from "@prisma/client"
import type { OvertimeRepository } from "../../types/repositories/overtime.js"
import { Effect } from "effect"
import { Helpers, OvertimeSchema, OvertimeWithRelationsSchema } from "../../schema/index.js"
import * as Errors from "../../types/errors/overtime.js"

export function findById(prismaClient: PrismaClient): OvertimeRepository["findById"] {
  return id => Effect.tryPromise({
    catch: Errors.FindOvertimeByIdError.new(),
    try: () => prismaClient.overtime.findUnique({
      where: {
        deletedAt: null,
        id,
      },
    }),
  }).pipe(
    Effect.andThen(Effect.fromNullable),
    Effect.andThen(Helpers.fromObjectToSchemaEffect(OvertimeSchema.Schema)),
    Effect.withSpan("find-by-id.overtime.repository"),
  )
}

export function findByIdWithRelations(prismaClient: PrismaClient): OvertimeRepository["findByIdWithRelations"] {
  return id => Effect.tryPromise({

    catch: Errors.FindOvertimeByIdError.new(),
    try: () => prismaClient.overtime.findUnique({
      include: {
        employee: true,
      },
      where: {
        deletedAt: null,
        id,
      },
    }),
  }).pipe(
    Effect.andThen(Effect.fromNullable),
    Effect.andThen(Helpers.fromObjectToSchemaEffect(OvertimeWithRelationsSchema.Schema)),
    Effect.withSpan("find-by-id.overtime.repository"),
  )
}

export function findMany(prismaClient: PrismaClient): OvertimeRepository["findMany"] {
  return () => Effect.tryPromise({
    catch: Errors.FindManyOvertimeError.new(),
    try: () => prismaClient.overtime.findMany({
      where: {
        deletedAt: null,
      },
    }),
  }).pipe(
    Effect.andThen(Helpers.fromObjectToSchemaEffect(OvertimeSchema.SchemaArray)),
    Effect.withSpan("find-many.overtime.repository"),
  )
}

export function findManyWithRelations(prismaClient: PrismaClient): OvertimeRepository["findManyWithRelations"] {
  return () => Effect.tryPromise({
    catch: Errors.FindManyOvertimeError.new(),
    try: () => prismaClient.overtime.findMany({
      include: {
        employee: true,
      },
      where: {
        deletedAt: null,
      },
    }),
  }).pipe(
    Effect.andThen(Helpers.fromObjectToSchemaEffect(OvertimeWithRelationsSchema.SchemaArray)),
    Effect.withSpan("find-many-with-relations.overtime.repository"),
  )
}

export function findByDeparmentName(prismaClient: PrismaClient): OvertimeRepository["findByDeparmentName"] {
  return departmentName => Effect.tryPromise({
    catch: Errors.FindOvertimeByDepartmentNameError.new(),
    try: () => prismaClient.overtime.findMany({
      include: {
        employee: true,
      },
      where: {
        deletedAt: null,
        employee: {
          department: departmentName,
        },
      },
    }),
  }).pipe(
    Effect.andThen(Helpers.fromObjectToSchemaEffect(OvertimeWithRelationsSchema.SchemaArray)),
    Effect.withSpan("find-by-deparment-name.overtime.repository"),
  )
}

export function summaryByEmployeeId(prismaClient: PrismaClient): OvertimeRepository["summaryByEmployeeId"] {
  return filters => Effect.tryPromise({
    catch: Errors.SummaryByEmployeeIdError.new(),
    try: () => prismaClient.overtime.aggregate({
      _sum: {
        hoursWorked: true,
      },
      where: {
        date: {
          gte: filters.dateRange.start,
          lt: filters.dateRange.end,
        },
        employee: {
          id: filters.employeeId,
        },
      },
    }),
  }).pipe(
    Effect.andThen((agg) => {
      if (agg._sum.hoursWorked === null) {
        return {
          hoursWorked: 0,
        }
      }
      return {
        hoursWorked: agg._sum.hoursWorked,
      }
    }),
    Effect.withSpan("summary-by-employee-id.overtime.repository"),
  )
}

export function summaryByDepartment(prismaClient: PrismaClient): OvertimeRepository["summaryByDepartment"] {
  return filters => Effect.tryPromise({
    catch: Errors.SummaryByDepartmentError.new(),
    try: () => prismaClient.overtime.aggregate({
      _sum: {
        hoursWorked: true,
      },
      where: {
        date: {
          gte: filters.dateRange.start,
          lt: filters.dateRange.end,
        },
        employee: {
          department: filters.department,
        },
      },
    }),
  }).pipe(
    Effect.andThen((agg) => {
      if (agg._sum.hoursWorked === null) {
        return {
          hoursWorked: 0,
        }
      }
      return {
        hoursWorked: agg._sum.hoursWorked,
      }
    }),
    Effect.withSpan("summary-by-department-name.overtime.repository"),
  )
}
