import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { config } from '@dotenvx/dotenvx'
import { setupOpenApi } from '../configure/openapi/setup-openapi.js'
import { setupScalarDocs } from '../configure/openapi/setup-scalar-docs.js'
import healthzApp from './controllers/healthz.js'
import * as EmployeeControllers from "./controllers/employees/index.js"
import prismaClient from './repositories/prisma.js'
import initEmployeeRepository from './repositories/employees/index.js'
import { initEmployeeService } from './services/employee/index.js'
config()
const app = new Hono()
setupOpenApi(app)

app.route("/docs", setupScalarDocs())

app.route("/healthz", healthzApp)

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

const employeeRepository = initEmployeeRepository(prismaClient)
const employeeService = initEmployeeService(employeeRepository)
app.route("/employees", EmployeeControllers.setupEmployeeRoutes(employeeService))

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})

