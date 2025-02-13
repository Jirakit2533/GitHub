import type { EmployeeRepository } from "../../types/repositories/employee.js"
import type { EmployeeService } from "../../types/services/employee.js"

export function create(employeeRepository: EmployeeRepository): EmployeeService["create"] {
  return async (data) => {
    const employee = await employeeRepository.create(data)
    return employee
  }
}