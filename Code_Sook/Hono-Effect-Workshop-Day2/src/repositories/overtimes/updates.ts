import type { PrismaClient } from "@prisma/client"
import type { OvertimeRepository } from "../../types/repositories/overtime.js"
import { Effect } from "effect"
import { Helpers, OvertimeSchema } from "../../schema/index.js"
import * as Errors from "../../types/errors/overtime.js"

export function update(prismaClient: PrismaClient): OvertimeRepository["update"] {
  return (id, data) => Effect.tryPromise({
    catch: Errors.UpdateOvertimeError.new(),
    try: () => prismaClient.overtime.update({
      data,
      where: {
        id,
      },
    }),
  }).pipe(
    Effect.andThen(Helpers.fromObjectToSchemaEffect(OvertimeSchema.Schema)),
    Effect.withSpan("update.overtime.repository"),
  )
}

export function updatePartial(prismaClient: PrismaClient): OvertimeRepository["updatePartial"] {
  return (id, data) => Effect.tryPromise({
    catch: Errors.UpdateOvertimeError.new(),
    try: () => prismaClient.overtime.update({
      data,
      where: {
        id,
      },
    }),
  }).pipe(
    Effect.andThen(Helpers.fromObjectToSchemaEffect(OvertimeSchema.Schema)),
    Effect.withSpan("partial-update.overtime.repository"),
  )
}
