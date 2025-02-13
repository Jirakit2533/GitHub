import type { PrismaClient } from "@prisma/client"
import type { EmployeeRepository } from "../../types/repositories/employee.js"
import { EmployeeSchema, Helpers } from "../../schema/index.js"

export function remove(prismaClient: PrismaClient): EmployeeRepository["remove"] {
  return async (id) => {
    const result = await prismaClient.employee.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id,
      },
    })

    return Helpers.fromObjectToSchema(EmployeeSchema.Schema)(result)
  }
}

export function hardRemoveById(prismaClient: PrismaClient): EmployeeRepository["hardRemove"] {
  return async (id) => {
    const result = await prismaClient.employee.delete({
      where: {
        id,
      },
    })
    return Helpers.fromObjectToSchema(EmployeeSchema.Schema)(result)
  }
}