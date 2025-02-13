import type { OvertimeRepository } from "../../types/repositories/overtime.js"
import type { OvertimeService } from "../../types/services/overtime.js"

export function updateById(overtimeRepository: OvertimeRepository): OvertimeService["update"] {
  return async (id, data) => {
    const updatedData = await overtimeRepository.updatePartial(id, data)
    return updatedData
  }
}
