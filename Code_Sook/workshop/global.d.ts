interface Env {
    NODE_ENV: "development" | "production" | "test" | "uat"
  }
  
  declare global {
    namespace NodeJS {
      interface ProcessEnv extends Env {}
    }
  }
  
  export { };
  export type IEnv = Env;