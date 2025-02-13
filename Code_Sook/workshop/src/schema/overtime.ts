import * as S from "effect/Schema"
import * as Branded from "./branded.js"
import * as GeneralSchema from "./general.js"

export const Schema = S.Struct({
  date: S.Union(S.Date, S.DateFromSelf).annotations({
    jsonSchema: {
      description: "Date or ISODate",
      example: "2025-01-01",
      title: "Date or ISODate",
      type: "string",
    },
  }),
  employeeId: Branded.EmployeeId,
  hoursWorked: S.Number,
  id: Branded.OvertimeId,
  reason: S.String,
  ...GeneralSchema.TimeStampSchema.fields,
  _tag: S.Literal("Overtime").pipe(S.optional, S.withDefaults({
    constructor: () => "Overtime" as const,
    decoding: () => "Overtime" as const,
  })),
})

export type Overtime = S.Schema.Type<typeof Schema>
export type OvertimeEncoded = S.Schema.Encoded<typeof Schema>

export const SchemaArray = S.Array(Schema)
export type OvertimeArray = S.Schema.Type<typeof SchemaArray>
export type OvertimeArrayEncoded = S.Schema.Encoded<typeof SchemaArray>

export const CreateSchema = Schema.omit("_tag", "id", "createdAt", "updatedAt", "deletedAt")
export type CreateOvertime = S.Schema.Type<typeof CreateSchema>

export const UpdateSchema = Schema.omit("_tag", "createdAt", "updatedAt", "deletedAt")
export type UpdateOvertime = S.Schema.Type<typeof UpdateSchema>