import type { OvertimeRepository } from "../../types/repositories/overtime.js"
import type { OvertimeService } from "../../types/services/overtime.js"

export function findById(overtimeRepository: OvertimeRepository): OvertimeService["findById"] {
  return async (id) => {
    const overtime = await overtimeRepository.findByIdWithRelations(id)
    return overtime
  }
}

export function findMany(overtimeRepository: OvertimeRepository): OvertimeService["findMany"] {
  return async () => {
    const overtimes = await overtimeRepository.findManyWithRelations()
    return overtimes
  }
}

export function findByDeparmentName(overtimeRepository: OvertimeRepository): OvertimeService["findByDepartmentName"] {
  return async (departmentName) => {
    const overtimes = await overtimeRepository.findByDeparmentName(departmentName)
    return overtimes
  }
}

export function summaryByEmployeeId(overtimeRepository: OvertimeRepository): OvertimeService["summaryByEmployeeId"] {
  return async (employeeId) => {
    const overtimes = await overtimeRepository.summaryByEmployeeId(employeeId)
    return overtimes
  }
}

export function summaryByDepartment(overtimeRepository: OvertimeRepository): OvertimeService["summaryByDepartment"] {
  return async (departmentName) => {
    const overtimes = await overtimeRepository.summaryByDepartment(departmentName)
    return overtimes
  }
}
