import * as S from "effect/Schema";
import * as EmployeeSchema from "./employee.js";
import * as OvertimeSchema from "./overtime.js";
export const Schema = S.Struct({
    ...OvertimeSchema.Schema.fields,
    employee: EmployeeSchema.Schema,
});
export const SchemaArray = S.Array(Schema);
