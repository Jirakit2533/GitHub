import { Hono } from "hono"
import * as Gets from "./get.js"
import * as Posts from "./post.js"

export function setupOvertimesRoutes() {
  const app = new Hono()

  app.route("/", Posts.setupPosts())

  app.route("/", Gets.setupGet())

  return app
}
