import * as S from "effect/Schema";
import * as EmployeeSchema from "./employee.js";
import * as OvertimeSchema from "./overtime.js";
export const Schema = S.Struct({
    ...EmployeeSchema.Schema.fields,
    overtimes: S.Array(OvertimeSchema.Schema),
});
export const SchemaArray = S.Array(Schema);
