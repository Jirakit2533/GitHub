import type { Branded, EmployeeSchema, EmployeeWithRelationsSchema } from "../../schema/index.js"

type Employee = EmployeeSchema.Employee
type EmployeeArray = EmployeeSchema.EmployeeArray
export type EmployeeWithoutId = Omit<Employee, "id">

export type CreateEmployeeDto = Omit<Employee, "id" | "createdAt" | "updatedAt" | "deletedAt" | "_tag">
export type UpdateEmployeeDto = CreateEmployeeDto & {
  id?: Employee["id"]
}

export type EmployeeRepository = {
  create: (data: CreateEmployeeDto) => Promise<Employee>
  findById: (id: Branded.EmployeeId) => Promise<Employee | null>
  findByIdWithRelations: (id: Branded.EmployeeId) => Promise<EmployeeWithRelationsSchema.EmployeeWithRelations | null>
  findMany: () => Promise<EmployeeArray>
  findManyWithRelations: () => Promise<EmployeeWithRelationsSchema.EmployeeWithRelationsArray>
  update: (id: Branded.EmployeeId, data: UpdateEmployeeDto) => Promise<Employee | null>
  updatePartial: (id: Branded.EmployeeId, data: Partial<UpdateEmployeeDto>) => Promise<Employee | null>
  remove: (id: Branded.EmployeeId) => Promise<Employee | null>
  hardRemove: (id: Branded.EmployeeId) => Promise<Employee | null>
}