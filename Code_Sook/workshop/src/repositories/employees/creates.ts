import type { PrismaClient } from "@prisma/client"
import type { EmployeeRepository } from "../../types/repositories/employee.js"
import { EmployeeSchema, Helpers } from "../../schema/index.js"

export function create(prismaClient: PrismaClient): EmployeeRepository["create"] {
  return async (data) => {
    const result = await prismaClient.employee.create({
      data,
    })
    return Helpers.fromObjectToSchema(EmployeeSchema.Schema)(result)
  }
}