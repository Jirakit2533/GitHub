import type { OvertimeRepository } from "../../types/repositories/overtime.js"
import type { OvertimeService } from "../../types/services/overtime.js"

export function removeById(overtimeRepository: OvertimeRepository): OvertimeService["remove"] {
  return (id) => {
    return overtimeRepository.remove(id)
  }
}
