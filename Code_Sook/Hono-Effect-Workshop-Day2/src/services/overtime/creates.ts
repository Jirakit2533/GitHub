import type { OvertimeRepository } from "../../types/repositories/overtime.js"
import type { OvertimeService } from "../../types/services/overtime.js"
import { Effect } from "effect"

export function create(overtimeRepository: OvertimeRepository): OvertimeService["create"] {
  return data => overtimeRepository.create(data).pipe(
    Effect.withSpan("overtime.create.service"),
  )
}
