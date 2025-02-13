import { PrismaClient } from "@prisma/client"
import { Context, Layer } from "effect"

const prismaClient = new PrismaClient()

export class PrismaClientContext extends Context.Tag("Repository/PrismaClientLayer")<PrismaClientContext, PrismaClient>() {
  static Live = Layer.succeed(this, prismaClient)
}

export default PrismaClientContext
