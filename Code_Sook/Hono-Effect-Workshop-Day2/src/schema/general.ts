import * as S from "effect/Schema"

export const TimeStampSchema = S.Struct({
  createdAt: S.DateFromSelf.annotations({ jsonSchema: { example: "2021-01-01T00:00:00.000Z", title: "createdAt", type: "string" } }),
  deletedAt: S.DateFromSelf.pipe(S.NullOr).annotations({ jsonSchema: { example: "2021-01-01T00:00:00.000Z", title: "deletedAt", type: "string" } }),
  updatedAt: S.DateFromSelf.annotations({ jsonSchema: { example: "2021-01-01T00:00:00.000Z", title: "updatedAt", type: "string" } }),
})
