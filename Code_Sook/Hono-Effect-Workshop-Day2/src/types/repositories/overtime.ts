import type { Effect } from "effect"
import type { NoSuchElementException } from "effect/Cause"
import type { ParseError } from "effect/ParseResult"
import type { Branded, EmployeeSchema, OvertimeSchema, OvertimeWithRelationsSchema } from "../../schema/index.js"
import type * as Errors from "../errors/overtime.ts"

export type OvertimeRepository = {
  create: (data: OvertimeSchema.CreateOvertime) => Effect.Effect<OvertimeSchema.Overtime, ParseError | Errors.CreateOvertimeError>
  findById: (id: Branded.OvertimeId) => Effect.Effect<OvertimeSchema.Overtime, NoSuchElementException | ParseError | Errors.FindOvertimeByIdError>
  findByIdWithRelations: (id: Branded.OvertimeId) => Effect.Effect<OvertimeWithRelationsSchema.OvertimeWithRelations, NoSuchElementException | ParseError | Errors.FindOvertimeByIdError>
  findMany: () => Effect.Effect<OvertimeSchema.OvertimeArray, ParseError | Errors.FindManyOvertimeError>
  findManyWithRelations: () => Effect.Effect<OvertimeWithRelationsSchema.OvertimeWithRelationsArray, | ParseError | Errors.FindManyOvertimeError>
  findByDeparmentName: (departmentName: EmployeeSchema.Employee["department"]) => Effect.Effect<OvertimeWithRelationsSchema.OvertimeWithRelationsArray, ParseError | Errors.FindOvertimeByDepartmentNameError>
  summaryByEmployeeId: (filters: { employeeId: Branded.EmployeeId, dateRange: { start: Date, end: Date } }) => Effect.Effect<{ hoursWorked: number }, Errors.SummaryByEmployeeIdError>
  summaryByDepartment: (filters: { department: EmployeeSchema.Employee["department"], dateRange: { start: Date, end: Date } }) => Effect.Effect<{ hoursWorked: number }, Errors.SummaryByDepartmentError>
  update: (id: Branded.OvertimeId, data: OvertimeSchema.UpdateOvertime) => Effect.Effect<OvertimeSchema.Overtime, Errors.UpdateOvertimeError | ParseError>
  updatePartial: (id: Branded.OvertimeId, data: Partial<OvertimeSchema.UpdateOvertime>) => Effect.Effect<OvertimeSchema.Overtime, Errors.UpdateOvertimeError | ParseError>
  remove: (id: Branded.OvertimeId) => Effect.Effect<OvertimeSchema.Overtime, NoSuchElementException | Errors.RemoveOvertimeByIdError | ParseError>
  hardRemove: (id: Branded.OvertimeId) => Effect.Effect<OvertimeSchema.Overtime, NoSuchElementException | Errors.RemoveOvertimeByIdError | ParseError>
}
