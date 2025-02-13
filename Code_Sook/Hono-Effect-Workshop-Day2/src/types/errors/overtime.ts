import { Data } from "effect"
import { createErrorFactory, type ErrorMsg } from "../error.helpers.js"

export class CreateOvertimeError extends Data.TaggedError("CreateOvertimeError")<ErrorMsg> {
  static new = createErrorFactory(this)
}

export class FindOvertimeByIdError extends Data.TaggedError("FindOvertimeByIdError")<ErrorMsg> {
  static new = createErrorFactory(this)
}

export class FindOvertimeByDepartmentNameError extends Data.TaggedError("FindOvertimeByDepartmentNameError")<ErrorMsg> {
  static new = createErrorFactory(this)
}

export class FindManyOvertimeError extends Data.TaggedError("FindManyOvertimeError")<ErrorMsg> {
  static new = createErrorFactory(this)
}

export class UpdateOvertimeError extends Data.TaggedError("UpdateOvertimeError")<ErrorMsg> {
  static new = createErrorFactory(this)
}

export class RemoveOvertimeByIdError extends Data.TaggedError("RemoveOvertimeByIdError")<ErrorMsg> {
  static new = createErrorFactory(this)
}

export class SummaryByEmployeeIdError extends Data.TaggedError("SummaryByEmployeeIdError")<ErrorMsg> {
  static new = createErrorFactory(this)
}
export class SummaryByDepartmentError extends Data.TaggedError("SummaryByDepartmentError")<ErrorMsg> {
  static new = createErrorFactory(this)
}
