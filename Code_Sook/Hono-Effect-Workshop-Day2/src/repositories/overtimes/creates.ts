import type { PrismaClient } from "@prisma/client"
import type { OvertimeRepository } from "../../types/repositories/overtime.js"
import { Effect } from "effect"
import { Helpers, OvertimeSchema } from "../../schema/index.js"
import * as Errors from "../../types/errors/overtime.js"

export function create(prismaClient: PrismaClient): OvertimeRepository["create"] {
  return data => Effect.tryPromise({
    catch: Errors.CreateOvertimeError.new(),
    try: () => prismaClient.overtime.create({
      data,
    }),
  }).pipe(
    Effect.andThen(Helpers.fromObjectToSchema(OvertimeSchema.Schema)),
    Effect.withSpan("create.overtime.repository"),
  )
}
