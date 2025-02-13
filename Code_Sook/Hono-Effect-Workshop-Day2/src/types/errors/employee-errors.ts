import { Data } from "effect"
import { createErrorFactory, type ErrorMsg } from "../error.helpers.js"

export class CreateEmployeeError extends Data.TaggedError("CreateEmployeeError")<ErrorMsg> {
  static new = (msg?: string) => (error?: unknown) => new CreateEmployeeError({ error, msg })
}
export class FindEmployeeByIdError extends Data.TaggedError("FindEmployeeByIdError")<ErrorMsg> {
  static new = createErrorFactory(this)
}
export class FindManyEmployeeError extends Data.TaggedError("FindManyEmployeeError")<ErrorMsg> {
  static new = createErrorFactory(this)
}
export class UpdateEmployeeError extends Data.TaggedError("UpdateEmployeeError")<ErrorMsg> {
  static new = createErrorFactory(this)
}
export class RemoveEmployeeError extends Data.TaggedError("RemoveEmployeeError")<ErrorMsg> {
  static new = createErrorFactory(this)
}
