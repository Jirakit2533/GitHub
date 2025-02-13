/* eslint-disable ts/no-redeclare */
import * as S from "effect/Schema";
export const EmployeeId = S.Number.pipe(S.brand("EmployeeId")).annotations({ jsonSchema: { type: "number" } });
export const EmployeeIdFromString = S.transform(S.NumberFromString, EmployeeId, {
    decode: id => EmployeeId.make(id),
    encode: id => id,
});
export const OvertimeId = S.Number.pipe(S.brand("OvertimeId")).annotations({ jsonSchema: { type: "number" } });
export const OvertimeIdFromString = S.transform(S.NumberFromString, OvertimeId, {
    decode: id => OvertimeId.make(id),
    encode: id => id,
});
