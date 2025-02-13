import * as S from "effect/Schema"
import * as Branded from "./branded.js"
import * as GeneralSchema from "./general.js"

export const Role = S.Literal("Junior_Developer", "Senior_Developer", "Lead", "C_Level")

export const Department = S.Literal("IT", "Accounting", "HR", "Manager")

export const Schema = S.Struct({
  department: Department,
  id: Branded.EmployeeId,
  name: S.String.annotations({ jsonSchema: { example: "John Doe", title: "name", type: "string" } }),
  role: Role,
  ...GeneralSchema.TimeStampSchema.fields,
  _tag: S.Literal("Employee").pipe(S.optional, S.withDefaults({
    constructor: () => "Employee" as const,
    decoding: () => "Employee" as const,
  })),
})

export type Employee = S.Schema.Type<typeof Schema>
export type EmployeeEncoded = S.Schema.Encoded<typeof Schema>

export const SchemaArray = S.Array(Schema)
export type EmployeeArray = S.Schema.Type<typeof SchemaArray>
export type EmployeeArrayEncoded = S.Schema.Encoded<typeof SchemaArray>

export const CreateSchema = Schema.pick("name", "role", "department")
export type CreateEmployee = S.Schema.Type<typeof CreateSchema>
export type CreateEmployeeEncoded = S.Schema.Encoded<typeof CreateSchema>

export const UpdateSchema = Schema.omit("_tag", "createdAt", "updatedAt", "deletedAt")
export type UpdateEmployee = S.Schema.Type<typeof UpdateSchema>
export type UpdateEmployeeEncoded = S.Schema.Encoded<typeof UpdateSchema>
