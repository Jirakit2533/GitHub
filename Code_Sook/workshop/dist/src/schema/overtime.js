import * as S from "effect/Schema";
import * as Branded from "./branded.js";
import * as GeneralSchema from "./general.js";
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
        constructor: () => "Overtime",
        decoding: () => "Overtime",
    })),
});
export const SchemaArray = S.Array(Schema);
export const CreateSchema = Schema.omit("_tag", "id", "createdAt", "updatedAt", "deletedAt");
export const UpdateSchema = Schema.omit("_tag", "createdAt", "updatedAt", "deletedAt");
