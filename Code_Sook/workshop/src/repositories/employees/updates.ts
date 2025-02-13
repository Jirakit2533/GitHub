import type { PrismaClient } from "@prisma/client"
import type { EmployeeRepository } from "../../types/repositories/employee.js"
import { EmployeeSchema, Helpers } from "../../schema/index.js"

export function update(prismaClient: PrismaClient): EmployeeRepository["update"] {
  return async (id, data) => {
    const result = await prismaClient.employee.update({
      data,
      where: {
        deletedAt: null,
        id,
      },
    })

    return Helpers.fromObjectToSchema(EmployeeSchema.Schema)(result)
  }
}

export function updatePartial(prismaClient: PrismaClient): EmployeeRepository["updatePartial"] {
  return async (id, data) => {
    const result = await prismaClient.employee.update({
      data,
      where: {
        deletedAt: null,
        id,
      },
    })

    return Helpers.fromObjectToSchema(EmployeeSchema.Schema)(result)
  }
}