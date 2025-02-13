import { Layer, ManagedRuntime } from "effect"
import { EmployeeRepositoryContext } from "../repositories/employees/index.js"
import { OvertimeRepositoryContext } from "../repositories/overtimes/index.js"
import PrismaClientContext from "../repositories/prisma.js"
import { EmployeeServiceContext } from "../services/employee/index.js"
import { OvertimeServiceContext } from "../services/overtime/index.js"
import { NodeSdkLive } from "../telemetry/node-sdk.js"

const PrismaClientLive = PrismaClientContext.Live
const EmployeeServiceLive = EmployeeServiceContext.Live.pipe(
  Layer.provide(EmployeeRepositoryContext.Live),
  Layer.provide(PrismaClientLive),
)

const OvertimeServiceLive = OvertimeServiceContext.Live.pipe(
  Layer.provide(OvertimeRepositoryContext.Live),
  Layer.provide(PrismaClientLive),
)

export const ServicesLive = Layer.mergeAll(
  //          ^? ManagedRuntime<EmployeeServiceContext | OvertimeServiceContext | Resource, never>
  EmployeeServiceLive,
  OvertimeServiceLive,
  NodeSdkLive,
)

export const ServicesRuntime = ManagedRuntime.make(ServicesLive)
