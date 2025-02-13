import S from "effect/Schema";
export const fromObjectToSchema = S.decodeUnknownSync;
export const fromSchemaToObject = S.encodeSync;
