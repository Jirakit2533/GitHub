import type { PrismaClient } from "@prisma/client"
import type { OvertimeRepository } from "../../types/repositories/overtime.js"
import { Context, Effect, Layer } from "effect"
import PrismaClientContext from "../prisma.js"
import * as Creates from "./creates.js"
import * as Finds from "./finds.js"
import * as Removes from "./removes.js"
import * as Updates from "./updates.js"

export function initOvertimeRepository(prismaClient: PrismaClient): OvertimeRepository {
  return {
    create: Creates.create(prismaClient),
    findByDeparmentName: Finds.findByDeparmentName(prismaClient),
    findById: Finds.findById(prismaClient),
    findByIdWithRelations: Finds.findByIdWithRelations(prismaClient),
    findMany: Finds.findMany(prismaClient),
    findManyWithRelations: Finds.findManyWithRelations(prismaClient),
    hardRemove: Removes.hardRemoveById(prismaClient),
    remove: Removes.removeById(prismaClient),
    summaryByDepartment: Finds.summaryByDepartment(prismaClient),
    summaryByEmployeeId: Finds.summaryByEmployeeId(prismaClient),
    update: Updates.update(prismaClient),
    updatePartial: Updates.updatePartial(prismaClient),
  }
}

export class OvertimeRepositoryContext extends Context.Tag("Repository/OvertimeRepositoryLayer")<OvertimeRepositoryContext, OvertimeRepository>() {
  static Live = Layer.effect(this, Effect.gen(function* (_) {
    const pc = yield * _(PrismaClientContext)
    return initOvertimeRepository(pc)
  }))
}
