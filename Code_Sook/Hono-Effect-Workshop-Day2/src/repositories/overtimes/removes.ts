import type { PrismaClient } from "@prisma/client"
import type { OvertimeRepository } from "../../types/repositories/overtime.js"
import { Effect } from "effect"
import { Helpers, OvertimeSchema } from "../../schema/index.js"
import * as Errors from "../../types/errors/overtime.js"

export function removeById(prismaClient: PrismaClient): OvertimeRepository["remove"] {
  return id => Effect.tryPromise({
    catch: Errors.RemoveOvertimeByIdError.new(),
    try: () => prismaClient.overtime.update({
      data: {
        deletedAt: new Date(),
      },
      where: {
        id,
      },
    }),
  }).pipe(
    Effect.andThen(Effect.fromNullable),
    Effect.andThen(Helpers.fromObjectToSchemaEffect(OvertimeSchema.Schema)),
    Effect.withSpan("remove.overtime.repository"),
  )
}

export function hardRemoveById(prismaClient: PrismaClient): OvertimeRepository["hardRemove"] {
  return id => Effect.tryPromise({
    catch: Errors.RemoveOvertimeByIdError.new(),
    try: () => prismaClient.overtime.delete({
      where: {
        id,
      },
    }),
  }).pipe(
    Effect.andThen(Effect.fromNullable),
    Effect.andThen(Helpers.fromObjectToSchemaEffect(OvertimeSchema.Schema)),
    Effect.withSpan("hard-remove.overtime.repository"),
  )
}
