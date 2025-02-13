import { config } from "@dotenvx/dotenvx"
import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { setupOpenApi } from "./configure/openapi/setup-openapi.js"
import { setupScalarDocs } from "./configure/openapi/setup-scalar-docs.js"
import * as EmployeeControllers from "./controllers/employees/index.js"
import healthzApp from "./controllers/healthz.js"
import * as OvertimeControllers from "./controllers/overtimes/index.js"

config()

const app = new Hono()
setupOpenApi(app)

app.route("/docs", setupScalarDocs())

app.route("/healthz", healthzApp)

app.route("/employees", EmployeeControllers.setupEmployeeRoutes())

app.get("/", (c) => {
  return c.text("Home")
})

app.route("/overtimes", OvertimeControllers.setupOvertimesRoutes())

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port,
})
