import type { EmployeeRepository } from "../../types/repositories/employee.js"
import type { EmployeeService } from "../../types/services/employee.js"

export function update(employeeRepository: EmployeeRepository): EmployeeService["update"] {
  return async (id, data) => {
    return employeeRepository.update(id, data)
  }
}