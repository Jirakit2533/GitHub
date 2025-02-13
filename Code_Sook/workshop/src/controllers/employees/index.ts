import type { EmployeeService } from "../../types/services/employee.js"
import { Hono } from "hono"
import * as EmployeeGetRoutes from "./get.js"

export function setupEmployeeRoutes(employeeService: EmployeeService) {
  const app = new Hono()

  app.route("/", EmployeeGetRoutes.setupEmployeeGetRoutes(employeeService))

  return app
}