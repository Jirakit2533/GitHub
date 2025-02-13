import { Hono } from "hono"
import * as EmployeeDeleteRoutes from "./delete.js"
import * as EmployeeGetRoutes from "./get.js"
import * as EmployeePostRoutes from "./post.js"
import * as EmployeePutRoutes from "./put.js"

export function setupEmployeeRoutes() {
  const app = new Hono()

  app.route("/", EmployeePostRoutes.setupEmployeePostRoutes())

  app.route("/", EmployeeGetRoutes.setupEmployeeGetRoutes())

  app.route("/", EmployeePutRoutes.setupEmployeePutRoutes())

  app.route("/", EmployeeDeleteRoutes.setupRoutes())

  return app
}
