import * as S from "effect/Schema"

import * as EmployeeSchema from "./employee.js"
import * as OvertimeSchema from "./overtime.js"

export const Schema = S.Struct({
  ...EmployeeSchema.Schema.fields,
  overtimes: S.Array(OvertimeSchema.Schema),

})

export type EmployeeWithRelations = S.Schema.Type<typeof Schema>
export type EmployeeWithRelationsEncoded = S.Schema.Encoded<typeof Schema>

export const SchemaArray = S.Array(Schema)
export type EmployeeWithRelationsArray = S.Schema.Type<typeof SchemaArray>
export type EmployeeWithRelationsArrayEncoded = S.Schema.Encoded<typeof SchemaArray>
