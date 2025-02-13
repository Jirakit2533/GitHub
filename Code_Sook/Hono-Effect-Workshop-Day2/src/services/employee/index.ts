import type { EmployeeService } from "../../types/services/employee.js"
import { Context, Effect, Layer } from "effect"
import { EmployeeRepositoryContext } from "../../repositories/employees/index.js"
import { Branded, EmployeeSchema } from "../../schema/index.js"
import * as Errors from "../../types/errors/employee-errors.js"

// export function initEmployeeService(employeeRepository: EmployeeRepository): EmployeeService {
//   return {
//     create: Creates.create(employeeRepository),
//     findMany: Finds.findMany(employeeRepository),
//     findOneById: Finds.findOneById(employeeRepository),
//     removeById: Removes.removeById(employeeRepository),
//     update: Updates.update(employeeRepository),
//   }
// }

export class EmployeeServiceContext extends Context.Tag("service/Employee")<EmployeeServiceContext, EmployeeService>() {
  static Live = Layer.effect(
    this,
    Effect.all({
      repo: EmployeeRepositoryContext,
    }).pipe(
      Effect.andThen(({ repo }) => {
        return {
          create: data => repo.create(data).pipe(
            Effect.withSpan("create.employee.service"),
          ),
          findMany: () => repo.findManyWithRelations().pipe(
            Effect.withSpan("find-many.employee.service"),
          ),
          findOneById: id => repo.findByIdWithRelations(id).pipe(
            Effect.withSpan("find-by-id.employee.service"),
          ),
          removeById: id => repo.remove(id).pipe(
            Effect.withSpan("remove-by-id.employee.service"),
          ),
          update: (id, data) => repo.update(id, data).pipe(
            Effect.withSpan("update.employee.service"),
          ),
        } satisfies EmployeeService
      }),
    ),
  )

  static Test = Layer.succeed(this, EmployeeServiceContext.of({
    create: (data: EmployeeSchema.CreateEmployeeEncoded) => Effect.succeed(EmployeeSchema.Schema.make({
      ...data,
      _tag: "Employee",
      createdAt: new Date("2024-12-30"),
      deletedAt: null,
      id: Branded.EmployeeId.make(1),
      updatedAt: new Date("2024-12-30"),
    })),
    findMany: () => Effect.succeed([]),
    findOneById: () => Effect.fail(Errors.FindEmployeeByIdError.new()()),
    removeById: () => Effect.fail(Errors.RemoveEmployeeError.new()()),
    update: () => Effect.fail(Errors.UpdateEmployeeError.new()()),
  }))
}
