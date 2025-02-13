import * as S from "effect/Schema"

export const fromObjectToSchema = S.decodeUnknownSync
export const fromSchemaToObject = S.encodeSync

export const fromObjectToSchemaEffect = S.decode
export const fromSchemaToObjectEffect = S.encode
