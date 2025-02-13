import type { Effect } from "effect"

import type { NoSuchElementException } from "effect/Cause"
import type { ParseError } from "effect/ParseResult"
import type { Branded, EmployeeSchema, EmployeeWithRelationsSchema } from "../../schema/index.js"
import type * as Errors from "../errors/employee-errors.js"

type Employee = EmployeeSchema.Employee

export type EmployeeRepository = {
  create: (data: EmployeeSchema.CreateEmployeeEncoded) => Effect.Effect<Employee, Errors.CreateEmployeeError | ParseError>
  findById: (id: Branded.EmployeeId) => Effect.Effect<Employee, Errors.FindEmployeeByIdError | ParseError | NoSuchElementException>
  findByIdWithRelations: (id: Branded.EmployeeId) => Effect.Effect<EmployeeWithRelationsSchema.EmployeeWithRelations, Errors.FindEmployeeByIdError | ParseError | NoSuchElementException>
  findMany: () => Effect.Effect<EmployeeSchema.EmployeeArray, Errors.FindManyEmployeeError>
  findManyWithRelations: () => Effect.Effect<EmployeeWithRelationsSchema.EmployeeWithRelationsArray, Errors.FindManyEmployeeError>
  update: (id: Branded.EmployeeId, data: EmployeeSchema.UpdateEmployeeEncoded) => Effect.Effect<Employee, Errors.UpdateEmployeeError | ParseError>
  updatePartial: (id: Branded.EmployeeId, data: Partial<EmployeeSchema.UpdateEmployeeEncoded>) => Effect.Effect<Employee, Errors.UpdateEmployeeError>
  remove: (id: Branded.EmployeeId) => Effect.Effect<Employee, Errors.RemoveEmployeeError>
  hardRemove: (id: Branded.EmployeeId) => Effect.Effect<Employee, Errors.RemoveEmployeeError>
}
