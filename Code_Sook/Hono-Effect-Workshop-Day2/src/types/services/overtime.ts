import type { OvertimeRepository } from "../repositories/overtime.js"

export type OvertimeService = {
  create: OvertimeRepository["create"]
  findById: OvertimeRepository["findByIdWithRelations"]
  findMany: OvertimeRepository["findManyWithRelations"]
  findByDepartmentName: OvertimeRepository["findByDeparmentName"]
  update: OvertimeRepository["update"]
  remove: OvertimeRepository["remove"]
  summaryByEmployeeId: OvertimeRepository["summaryByEmployeeId"]
  summaryByDepartment: OvertimeRepository["summaryByDepartment"]
}
