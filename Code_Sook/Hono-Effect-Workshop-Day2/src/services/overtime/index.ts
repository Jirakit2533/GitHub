import type { OvertimeRepository } from "../../types/repositories/overtime.js"
import type { OvertimeService } from "../../types/services/overtime.js"
import { Context, Effect, Layer } from "effect"
import { OvertimeRepositoryContext } from "../../repositories/overtimes/index.js"
import * as Creates from "./creates.js"
import * as Finds from "./finds.js"
import * as Removes from "./removes.js"
import * as Updates from "./updates.js"

export function initOvertimeService(overtimeRepository: OvertimeRepository): OvertimeService {
  return {
    create: Creates.create(overtimeRepository),
    findByDepartmentName: Finds.findByDeparmentName(overtimeRepository),
    findById: Finds.findById(overtimeRepository),
    findMany: Finds.findMany(overtimeRepository),
    remove: Removes.removeById(overtimeRepository),
    summaryByDepartment: Finds.summaryByDepartment(overtimeRepository),
    summaryByEmployeeId: Finds.summaryByEmployeeId(overtimeRepository),
    update: Updates.updateById(overtimeRepository),
  }
}

export class OvertimeServiceContext extends Context.Tag("OvertimeServiceContext")<OvertimeServiceContext, OvertimeService>() {
  static Live = Layer.effect(this, Effect.gen(function* () {
    const repo = yield * OvertimeRepositoryContext
    return initOvertimeService(repo)
  }))
}
