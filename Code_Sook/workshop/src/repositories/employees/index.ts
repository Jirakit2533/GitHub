import type { PrismaClient } from "@prisma/client"
import type * as Types from "../../types/repositories/employee.js"
import * as Creates from "./creates.js"
import * as Finds from "./finds.js"
import * as Removes from "./removes.js"
import * as Updates from "./updates.js"

export default function initEmployeeRepository(prismaClient: PrismaClient): Types.EmployeeRepository {
  return {
    create: Creates.create(prismaClient),
    findById: Finds.findById(prismaClient),
    findByIdWithRelations: Finds.findByIdWithRelations(prismaClient),
    findMany: Finds.findMany(prismaClient),
    findManyWithRelations: Finds.findManyWithRelations(prismaClient),
    hardRemove: Removes.hardRemoveById(prismaClient),
    remove: Removes.remove(prismaClient),
    update: Updates.update(prismaClient),
    updatePartial: Updates.updatePartial(prismaClient),
  }
}