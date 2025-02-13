import type { EmployeeRepository } from "../../types/repositories/employee.js"
import type { EmployeeService } from "../../types/services/employee.js"

export function findMany(employeeRepository: EmployeeRepository): EmployeeService["findMany"] {
  return async () => {
    return employeeRepository.findManyWithRelations()
  }
}

export function findOneById(employeeRepository: EmployeeRepository): EmployeeService["findOneById"] {
  return async (id) => {
    return employeeRepository.findByIdWithRelations(id)
  }
}