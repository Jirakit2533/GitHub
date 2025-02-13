import type { Effect } from "effect"
import type { NoSuchElementException } from "effect/Cause"
import type { ParseError } from "effect/ParseResult"
import type { Branded, EmployeeSchema, EmployeeWithRelationsSchema } from "../../schema/index.js"
import type * as Errors from "../errors/employee-errors.js"

export type EmployeeService = {
  create: (data: EmployeeSchema.CreateEmployee) => Effect.Effect<EmployeeSchema.Employee, Errors.CreateEmployeeError | ParseError>
  findOneById: (id: Branded.EmployeeId) => Effect.Effect<EmployeeWithRelationsSchema.EmployeeWithRelations, Errors.FindEmployeeByIdError | ParseError | NoSuchElementException>
  findMany: () => Effect.Effect<EmployeeWithRelationsSchema.EmployeeWithRelationsArray, Errors.FindManyEmployeeError>
  update: (id: Branded.EmployeeId, data: EmployeeSchema.UpdateEmployee) => Effect.Effect<EmployeeSchema.Employee, Errors.UpdateEmployeeError | ParseError>
  removeById: (id: Branded.EmployeeId) => Effect.Effect<EmployeeSchema.Employee, Errors.RemoveEmployeeError>
}
