import * as S from "effect/Schema";
import * as Branded from "./branded.js";
import * as GeneralSchema from "./general.js";
export const Role = S.Literal("Junior_Developer", "Senior_Developer", "Lead", "C_Level");
export const Department = S.Literal("IT", "Accounting", "HR", "Manager");
export const Schema = S.Struct({
    department: Department,
    id: Branded.EmployeeId,
    name: S.String.annotations({ jsonSchema: { example: "John Doe", title: "name", type: "string" } }),
    role: Role,
    ...GeneralSchema.TimeStampSchema.fields,
    _tag: S.Literal("Employee").pipe(S.optional, S.withDefaults({
        constructor: () => "Employee",
        decoding: () => "Employee",
    })),
});
export const SchemaArray = S.Array(Schema);
export const CreateSchema = Schema.pick("name", "role", "department");
export const UpdateSchema = Schema.omit("_tag", "createdAt", "updatedAt", "deletedAt");
