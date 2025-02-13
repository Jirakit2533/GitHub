import * as S from "effect/Schema"
import * as EmployeeSchema from "./employee.js"
import * as OvertimeSchema from "./overtime.js"

export const Schema = S.Struct({
  ...OvertimeSchema.Schema.fields,
  employee: EmployeeSchema.Schema,
})

export type OvertimeWithRelations = S.Schema.Type<typeof Schema>
export type OvertimeWithRelationsEncoded = S.Schema.Encoded<typeof Schema>

export const SchemaArray = S.Array(Schema)
export type OvertimeWithRelationsArray = S.Schema.Type<typeof SchemaArray>
export type OvertimeWithRelationsArrayEncoded = S.Schema.Encoded<typeof SchemaArray>