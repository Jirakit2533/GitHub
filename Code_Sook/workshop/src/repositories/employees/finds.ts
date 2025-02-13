import type { PrismaClient } from "@prisma/client"
import type { EmployeeRepository } from "../../types/repositories/employee.js"
import { EmployeeSchema, EmployeeWithRelationsSchema, Helpers } from "../../schema/index.js"

export function findMany(prismaClient: PrismaClient): EmployeeRepository["findMany"] {
  return async () => {
    const result = await prismaClient.employee.findMany({
      where: {
        deletedAt: null,
      },
    })
    const data = Helpers.fromObjectToSchema(EmployeeSchema.SchemaArray)(result)
    return data
  }
}

export function findManyWithRelations(prismaClient: PrismaClient): EmployeeRepository["findManyWithRelations"] {
  return async () => {
    const result = await prismaClient.employee.findMany({
      include: {
        overtimes: true,
      },
      where: {
        deletedAt: null,
      },
    })
    const data = Helpers.fromObjectToSchema(EmployeeWithRelationsSchema.SchemaArray)(result)
    return data
  }
}

export function findById(prismaClient: PrismaClient): EmployeeRepository["findById"] {
  return async (id) => {
    const result = await prismaClient.employee.findUnique({
      where: {
        deletedAt: null,
        id,
      },
    })
    if (result === null)
      return null
    return Helpers.fromObjectToSchema(EmployeeSchema.Schema)(result)
  }
}

export function findByIdWithRelations(prismaClient: PrismaClient): EmployeeRepository["findByIdWithRelations"] {
  return async (id) => {
    const result = await prismaClient.employee.findUnique({
      include: {
        overtimes: true,
      },
      where: {
        deletedAt: null,
        id,
      },
    })
    if (result === null)
      return null
    return Helpers.fromObjectToSchema(EmployeeWithRelationsSchema.Schema)(result)
  }
}