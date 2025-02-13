import type { EmployeeRepository } from "../../types/repositories/employee.js"
import type { EmployeeService } from "../../types/services/employee.js"

export function removeById(employeeRepository: EmployeeRepository): EmployeeService["removeById"] {
  return (id) => {
    return employeeRepository.remove(id)
  }
}